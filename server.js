var csv = require('csv'),
    fs = require('fs'),
    config = require('./config.json');
    Imap = require('imap'),
    MailParser = require('mailparser').MailParser,
    moment = require('moment')
    util = require('util'),
    events = require('events'),
    _ = require('lodash');
    queue = '';
    mkpath = require('mkpath');

var parser = csv.parse({columns:true},function(err, data){
  queue = data;
  listenInbox();
});
fs.createReadStream(config.csv).pipe(parser);

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.imap.user,
        pass: config.imap.password
    }
}, function(err, data){
  console.log(err, data);
});

// imap SERVER
function listenInbox(){
  var imap = new Imap(config.imap);

  imap.on('ready', function() {
    console.log('imap ready');
    imap.openBox(config.imap.mailbox, false, function() {
      console.log('imap opened');
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
      }
    });
  });

  imap.on('end', function() {
    console.log('end');
  });

  imap.on('error', function(err) {
    console.log('error', err);
  });

  imap.on('close', function(hadError) {
    console.log('close', hadError);
  });

  imap.connect();
}

// when new email comming
function onEmail(mailObject) {
  var address = mailObject.from[0].address;

  console.log('new mail', address, mailObject.subject);

  // has attachment
  if(_.isUndefined(mailObject.attachments)){
    sendNextMessage(address);
  }else{
    var metadata = parseSubject(mailObject.subject)
    if(!metadata){
      console.log('>>',metadata);
    }else{
      // save attachment
      var path = 'content/'+config.keyword+'/'+strpad(metadata.id,'000')+'/';
      mkpath.sync(path);

      mailObject.attachments.forEach(function(attachment){
        fs.writeFile(path+attachment.fileName, attachment.content);
      })

      markAsAnswered(address, metadata.id);
      sendNextMessage(address);
    }
  }
};

// find and send the next piece of text
function sendNextMessage(address){

  var next = _(queue)
    .filter('to', address)
    .filter('re', '')
    .sortBy('id')
    .first();

  if(next){
    var options = {
      from: config.user,
      to: address,
      subject: '['+config.keyword+'] '+next.id+' : '+next.text,
      text: config.instruction
    }
  }else{
    var options = {
      from: config.user,
      to: address,
      subject: 'fin des messages',
      text: ''
    }
  }
  transporter.sendMail();
  console.log(address, options.subject);
}

// mark piece of text as answered
function markAsAnswered(address, id){
  var line = _(queue)
    .filter('to', address)
    .filter('id', ''+id)
    .value();

  line.re = Date.now();
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

// add leading 0 on string
function strpad(str, pad){
  str = '' + 1;
  return pad.substring(0, pad.length - str.length) + str;
}

