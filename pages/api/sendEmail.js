export default function handler(req, res) {
  let nodemailer = require('nodemailer');
  require('dotenv').config();

  let mailConfig = getMailConfig();
  const transporter = nodemailer.createTransport(mailConfig);
  const fromEmail = process.env.ENVIRONMENT === "production" ? process.env.PROD_USER : process.env.DEV_USER;

  const mailData = getMailData(req.body, fromEmail);

  transporter.sendMail(mailData).then((info) => {
    const previewUrl = process.env.ENVIRONMENT === 'production' ? null : nodemailer.getTestMessageUrl(info);
    return res.status(200).json(
      { 
        status: 200, 
        message: "Email is successfully sent", 
        url: previewUrl 
      }
    );
  }).catch((err) => {
    return res.status(500).json(
      { 
        status: 500, 
        message: "Email send failed. Please try again"
      }
    );
  });
}

const getMailData = (body, fromEmail) => {
  const mailInfo = {
    from: fromEmail,
    to: body.email,
    subject: `User ${body.firstName} ${body.lastName} details`,
    attachments: [],
    html: getEmailTemplate(body, fromEmail)
  }

  body.images.forEach(image => {
    mailInfo.attachments.push({
      // @ts-ignore
      path: `${image}`
    });
  });

  return mailInfo;
}

const getMailConfig = () => {
  if(process.env.ENVIRONMENT === "production") {
    return {
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.PROD_USER,
        pass: process.env.PROD_PASS
      },
      secure: true
    };
  } else {
    return {
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: process.env.DEV_USER,
          pass: process.env.DEV_PASS
      }
    };
  }
}

const getEmailTemplate = (data, from) => {
  return `
    <div>
      <div>
        <span>User: </span><span>${data.firstName} ${data.lastName}</span>
      </div>
      <div>
        <span>Description: </span><span>${data.description}</span>
      </div>
      <div>
        <span>Email: </span><span>${data.email}</span>
      </div>
      <div>
        <span>Sent From: </span><span>${from}</span>
      </div>
    </div>
  `
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}