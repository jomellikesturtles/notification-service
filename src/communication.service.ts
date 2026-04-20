import { MessageBody, TYPE } from "./index.js";
import * as nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from "path";

const SMTP_SERVER = "smtp.gmail.com";
const PORT = 587;  // For starttls
const EMAIL = "jommel.s.2020@gmail.com";
const PASSWORD = "vpcj atll aqrk czif";
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

export const sendCommunication = async (message: MessageBody, template: string = 'null') => {
  if (message.type == TYPE.EMAIL) {
    sendEmail(message, template);
  }
  console.log("Sending communication");
  return "send";
};

const sendSMS = async (message: MessageBody) => {
  console.log("Sending SMS to ", message.recipient);

};
const sendEmail = async (message: MessageBody, template: string) => {
  transporter.use('compile', hbs({
    viewEngine: {
      extname: '.hbs',
      partialsDir: path.resolve('./emails'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./emails'),
    extName: '.hbs',
  }));
  const mailOptions = {
    from: EMAIL,
    to: message.recipient,
    subject: TEMPLATE[template],
    template: template,
    context: message.context
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error(err);
    else console.log('Email sent ', info.response);
  });
  console.log("Sending email to ", message.recipient);

};

export const TEMPLATE2 = {
  welcome: 'Welcome to App',
  otp: 'App OTP',
};
const TEMPLATE: Record<string, string> = {
  welcome: "Welcome to App",
  otp: "App OTP"
};