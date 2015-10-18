var csv = require('csv'),
    fs = require('fs'),
    config = require('./config.json');
    Imap = require('imap'),
    MailParser = require('mailparser').MailParser,
    moment = require('moment')
    util = require('util'),
    events = require('events'),
    _ = require('lodash'),
    mkpath = require('mkpath'),
    nodemailer = require('nodemailer'),
    yaml = require('yamljs'),
    sanitize = require("sanitize-filename"),
    crypto = require('crypto');

var queue = '';


// CSV
var parser = csv.parse({columns:true},function(err, data){
  queue = data;
  setInterval(backupCsv, config.backupFreq);
  setInterval(renderJson, config.backupFreq);

  // connect mailbox
  listenInbox();
});

// mails
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.imap.user,
        pass: config.imap.password
    }
}, function(err, data){
  console.log(err, data);
});

// START
fs.createReadStream(config.csv).pipe(parser);

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
          markSeen: false,
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

        f.once('error', function(err) {
          console.log('Fetch error: ' + err);
        });

        f.once('end', function() {
          // console.log('Done fetching all messages!');
          // imap.end();
        });
      }
    });
  });

  imap.on('end', function(err) {
    console.log('end', new Date());
  });

  imap.on('error', function(err) {
    console.log('error', err, new Date());
  });

  imap.on('close', function(hadError) {
    console.log('close', hadError, new Date());
  });

  imap.connect();
}

// when new email comming
function onEmail(mailObject) {
  var address = mailObject.from[0].address.toLowerCase();
  var metadata = parseSubject(mailObject.subject);

  // has attachment and metadata
  if(_.isUndefined(mailObject.attachments) || _.isNull(metadata) ){
    console.log('mail error \t\t', address);
    sendNextMessage(address);
  }else{
    console.log('new mail \t', metadata.id,'\t', address, new Date().toLocaleTimeString(), mailObject.subject);
    // create path
    var path = 'content/'
      +config.keyword+'/'
      +_.padLeft(metadata.id, 4, '0')
      +'/'+hash(address)+'/';

    updateLine(address, metadata.id, 'path', path);
    mkpath(path, function (err) {

      if (err) throw err;

      mailObject.attachments.forEach(function(attachment){

        console.log('attachment \t', metadata.id,'\t', address, new Date().toLocaleTimeString(), attachment.fileName);

        // save files
        fs.writeFile(path+sanitize(attachment.fileName), attachment.content);
        updateLine(address, metadata.id, 'fileName', sanitize(attachment.fileName));
      });

      var contrib = _.filter(queue, 'id', ''+metadata.id);
      fs.writeFile(path+"contrib.json", JSON.stringify(contrib));

    });


    updateLine(address, metadata.id, 're', Date.now());
    // updateLine(address, metadata.id, 'body', mailObject.text);

    sendNextMessage(address);
  }
};


function hash(d){
  return crypto.createHash('md5').update(d).digest("hex");
}
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
      text: config.instruction
    }
  }else{
    var answer = {
      from: config.user,
      to: address,
      subject:'['+config.keyword+'] fin du texte',
      text: ''
    }
  }
  transporter.sendMail(answer);
  console.log('mail answer \t\t', address, new Date().toLocaleTimeString(), answer.subject);
}

// mark piece of text as answered
function updateLine(address, id, col, value){
  _.findWhere(queue, {'to':address, 'id':''+id})[col] = value;
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

// write CSV file
function backupCsv(){
  csv.stringify(queue, {header: true}, function(err, output){
    fs.writeFile(config.csv, output, function(err){if(err)console.log(err)})
  });
}

function renderJson(){

  var q = _.cloneDeep(queue);

  var data = JSON.stringify(
    {data:
      _(q)
      .reject('re','')
      .reject('path','')
      .reject('fileName','')
      .map(function(d){
        d.to = hash(d.to);
        return d;
      })
      .groupBy('id')
      .value()
    }
  );
  // console.log(data);
  fs.writeFile('app/data/'+config.keyword+'.json', data, function(err){if(err)console.log(err)})
}



