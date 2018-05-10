var nodemailer = require('nodemailer');
export async function sendInvite(email,url){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mailertest343@gmail.com',
      pass: 'Angad1031'
    }
  });

  var mailOptions = {
    from: 'mailertest343@gmail.com',
    to: email,
    subject: 'Adding New user',
    text: url
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
