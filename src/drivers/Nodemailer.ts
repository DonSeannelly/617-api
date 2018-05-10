var nodemailer = require('nodemailer');
require('dotenv').config();

export async function sendInvite(email,text){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mailertest343@gmail.com',
      pass: process.env.NODEMAILER_PASS
    }
  });

  var mailOptions = {
    from: 'mailertest343@gmail.com',
    to: email,
    subject: 'You have a new Table invite',
    text
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
