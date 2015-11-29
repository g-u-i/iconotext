var csv = require('csv'),
    fs = require('fs'),
    config = require('./config.json');
    Imap = require('imap'),
    MailParser = require('mailparser').MailParser,
    _ = require('lodash'),
    mkpath = require('mkpath'),
    nodemailer = require('nodemailer'),
    yaml = require('yamljs'),
    slug = require('slug'),
    crypto = require('crypto'),
    path = require('path'),
    argv = require('yargs').argv,
    gm = require('gm'),
    glob = require("glob")

var queue = '';
var helpMessage = fs.readFileSync(__dirname+'/'+config.helpMessage, 'utf8');
var errorMessage = fs.readFileSync(__dirname+'/'+config.errorMessage, 'utf8');
var init = typeof argv.init !== 'undefined' ?  true : false;
var forever = typeof argv.forever !== 'undefined' ?  true : false;
var reload = typeof argv.reload !== 'undefined' ?  true : false;
var report = typeof argv.report !== 'undefined' ?  true : false;
var exportPic = typeof argv.exportPic !== 'undefined' ?  true : false;

// load CSV
var parser = csv.parse({columns:true, trim:true, skip_empty_lines:true},function(err, data){

  queue = data;

  if(err) console.log(err);

  if(init)      launch();
  if(report)    genReport(queue);
  if(exportPic) exportAll(queue);
  if(reload)    reloadThumbs(queue);

  if(!reload && !exportPic) listenInbox(); // connect mailbox

  updateJSON(); // update public json
});

// mailer
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: config.imap.user, pass: config.imap.password}},
  function(err, data){ console.log(err, data);
});

fs.createReadStream(__dirname+'/'+config.csv).pipe(parser);
process.on('SIGINT', backupAndExit);
process.on('uncaughtException', backupAndExit);

//
// Functions
//

// function init
function launch(){
  _(queue).sortBy('to').map('to').uniq().forEach(function(address, i){
    setTimeout(function(){sendNextMessage(address)}, 5000 * i)
  }).value();
}

// imap SERVER
function listenInbox(){
  var imap = new Imap(config.imap);

  imap.on('ready', function() {
    console.log('imap ready');
    imap.openBox(config.imap.mailbox, false, function() {
      console.log('imap opened \t', config.imap.user, new Date());
    });
  });

  imap.on('mail', function(num) {
    imap.search(['UNSEEN'], function(err, result) {
      if (result.length) {

        var f = imap.fetch(result, {
          markSeen: config.imap.markSeen,
          struct: true,
          bodies: ''
        });

        f.on('message', function(msg, seqNo) {
          msg.on('body', function(stream, info) {
            var buffer = '';

            stream.on('data', function(chunk) {
              buffer += chunk.toString('utf8');
            });

            stream.on('end', function() {
              var mailParser = new MailParser();

              mailParser.on('end', onEmail);
              mailParser.write(buffer);
              mailParser.end();
            });
          });
        });

        f.once('end', function() {
          console.log('Done fetching all messages!');
          if(!forever) imap.end();
          setTimeout(backupCSV, config.backupFreq);
          setTimeout(updateJSON, config.backupFreq);
        });
      }else{
        if(!forever) imap.end();
      }
    });
  });

  imap.on('end', function(err) { console.log('end', new Date());});
  imap.on('error', function(err) { console.log('error', err, new Date());});
  imap.on('close', function(err) {console.log('close', err, new Date());});

  imap.connect();
};

// when new email comming
function onEmail(mailObject) {
  var address = mailObject.from[0].address.toLowerCase();
  var metadata = parseSubject(mailObject.subject);

  // has attachment and metadata
  if(_.isUndefined(mailObject.attachments) || _.isNull(metadata) || (_.filter(queue, {'to':address, 'id':''+metadata.id}).length < 1) ){
    console.log('mail error \t\t', address);
    sendNextMessage(address);
  }else{
    console.log('new mail \t', metadata.id,'\t', address, new Date().toLocaleTimeString(), mailObject.subject);
    // create path
    var path = 'content/'
      +config.keyword+'/'
      +_.padLeft(metadata.id, 4, '0')
      +'/'+hash(address)+'/';

    mkpath(__dirname+'/'+path, function (err) {

      if (err) throw err;

      mailObject.attachments.forEach(function(attachment){

        console.log('attachment \t', metadata.id,'\t', address, new Date().toLocaleTimeString(), attachment.fileName);

        var filePath = __dirname+'/'+path+cleanFilename(attachment.fileName);

        // save files
        fs.writeFile(filePath, attachment.content, function(err){
          if(err) return console.log(err);
          thumb(filePath)
        });
        updateLine(address, metadata.id, 'fileName', cleanFilename(attachment.fileName));

      });
    });

    updateLine(address, metadata.id, 'path', path);
    updateLine(address, metadata.id, 're', Date.now());
    sendNextMessage(address);
  }
};

// find and send the next piece of text
function sendNextMessage(address){
  var next = _(queue)
    .filter('to', address)
    .filter('re', '')
    .sortBy(function(d){return parseInt(d.id)})
    .first();

  if(next){
    var answer = {
      from: config.user,
      to: address,
      subject: '['+config.keyword+'] '+next.id+' : '+ next.text,
      text: helpMessage
    }
  }else{
    var answer = {
      from: config.user,
      to: address,
      subject:'['+config.keyword+'] Erreur pour '+address,
      text: errorMessage
    }
  }
  if(config.imap.sendReplies) transporter.sendMail(answer);
  console.log('mail answer \t\t', address, new Date().toLocaleTimeString(), answer.subject);
}

// mark piece of text as answered
function updateLine(address, id, col, value){
  _.findWhere(queue, {'to':address, 'id':''+id})[col] = value;
}

// write CSV file
function backupCSV(){
  csv.stringify(queue, {header: true}, function(err, output){
    fs.writeFile(__dirname+'/'+config.csv, output, function(err){
      if(err)console.log(err)
      console.log('\tbackupCSV');
    })
  });
}

// generate web version
function thumb(raw){

  var hd = raw;
  var hdExt = path.extname(hd);
  var hdName = path.basename(hd, hdExt);
  var hdDir =  path.dirname(hd).replace(__dirname, "");

  mkpath(__dirname+'/app/'+hdDir, function (err) {-
    gm(hd)
    .autoOrient()
    .resize(config.thumbs[0], config.thumbs[0])
    .noProfile()
    .write(__dirname+'/app/'+hdDir+'/'+hdName+hdExt, function (err) {
      if (!err) console.log("thumb:",hdName);
    });
  })
}

// resize add number and save as jpeg
function pictureExport(raw,i,k){
  var hd = raw;
  var hdExt = path.extname(hd);
  var hdName = path.basename(hd, hdExt);

  var hdDir =  path.dirname(hd).replace(__dirname, "");

  var userid = path.basename(hdDir)
  var txtid = path.basename(path.dirname(hdDir)).substring(1);



  mkpath(__dirname+'/content/export/', function (err) {
    gm(hd)
    .autoOrient()
    .resize(3500,3500)
    .fill("White")
    .stroke("black", 7)
    .drawCircle(200, 180, 260, 260)
    .stroke("black", 2)
    .fontSize(90)
    .fill("black")
    .drawText(125, 215, txtid)
    .write(__dirname+'/content/export/'+txtid+'_'+userid+hdName+'.jpg', function (err) {
      if(err) console.log(err)
      if (!err) console.log("exp: ",i+'/'+k+' ',hdName,txtid);
    });
  })
}

// check all uploaded files
function exportAll(queue){
  glob("content/"+config.keyword+"/**/*.*", function (er, files) {
    var k = files.length;
    _(files).forEach(function(f,i){
      setTimeout(function(){
        pictureExport(f,i,k);
      }, i * 2500)
    }).value();
  })
}

function reloadThumbs(queue){
  _(queue)
    .reject('re','')
    .reject('path','')
    .reject('fileName','')
    .forEach(function(d,i){
      setTimeout(function(){
        thumb(__dirname+'/'+d.path+d.fileName)
      }, i * 350)
    })
    .value()
}

// update public json file
function updateJSON(){

  var q = _.cloneDeep(queue);

  var data = JSON.stringify(
    {data:_(q)
      .reject('text','')
      // .reject('path','')
      // .reject('fileName','')
      .map(function(d){
        d.to = hash(d.to);
        return d;
      })
      .groupBy('id')
      .value()
    }
  );
  // console.log(data);
  fs.writeFile(__dirname+'/'+'app/data/data.json', data, function(err){
    if(err)console.log(err)
    console.log('\tupdateJSON');
  })
}

// wait for backup before exit
function backupAndExit(){
  updateJSON();
  backupCSV();
  console.log( "\n\nGracefully shutting down …\n", new Date());
  setTimeout(process.exit(1), 3000);
}

// string encryption shorthand
function hash(d){
  return crypto.createHash('md5').update(d).digest("hex");
}

// escape filename
function cleanFilename(f){

  var ext = path.extname(f).toLowerCase();
  var name = path.basename(f, ext).toLowerCase();

  return slug(name) + ext;
}

// gen usage statistics
function genReport(queue){

  var report = _(queue)
    .sortBy('re')
    .groupBy('to')
    .map(function(d, i){
      var answers = _.reject(d,'re',''), last;

      if(answers[0]){
        var newDate = new Date();
        newDate.setTime(answers[0].re);
        last = newDate.toUTCString();
      }else{
        last = '?'
      }

      return {
        'mail': i,
        'count':answers.length,
        'last':last
      };
    })
    .sortBy('count')
    .value()

  csv.stringify(report, {header: true}, function(err, output){
    fs.writeFile(__dirname+'/content/report.csv', output, function(err){
      if(err)console.log(err)
      console.log('\tbackupReport');
    })
  });
}

// parse subject to find piece of text id and session keyword
function parseSubject(s){

  var re1='.*?'; // Non-greedy match on filler
  var re2='(\\[)';  // Any Single Character 1
  var re3='((?:[a-z][a-z]+))';  // Word 1
  var re4='(\\])';  // Any Single Character 2
  var re5='(\\s+)'; // White Space 1
  var re6='(\\d+)'; // Integer Number 1
  var re7='(\\s+)'; // White Space 2
  var re8='(:)';  // Any Single Character 3

  var p = new RegExp(re1+re2+re3+re4+re5+re6+re7+re8,['i']);
  var m = p.exec(s);

  return m && { keyword:m[2], id:parseInt(m[5])}
}
