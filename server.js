var csv = require('csv'),
    fs = require('fs'),
    config = require('./config.json');
    Imap = require('imap'),
    MailParser = require('mailparser').MailParser,
    moment = require('moment')
    util = require('util'),
    events = require('events');

var parser = csv.parse({columns:true},function(err, data){
  // console.log(data);
});
fs.createReadStream(config.csv).pipe(parser);

// imap SERVER
var imap = new Imap(config.imap);

imap.on('ready', function() {
  console.log('ready');

  imap.openBox(config.imap.mailbox, false, function() {
    console.log('open');
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

function onEmail(mailObject) {
    console.log('new mail', {
      from: mailObject.from,
      subject: mailObject.subject,
      date: moment(mailObject.date).format('YYYY-MM-DD HH:mm:ss')
    });

    fs.writeFile(
      mailObject.attachments[0].fileName,
      mailObject.attachments[0].content,
      function(err){
        console.log(err)
    })
}
