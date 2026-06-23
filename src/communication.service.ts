import { MessageBody, TYPE } from "./index.js";
import * as nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from "path";
import { config } from "./config.js";

const SMTP_SERVER = "smtp.gmail.com";
const PORT = 587;  // For starttls

const EMAIL = config.EMAIL;
const PASSWORD = config.PASSWORD;

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

transporter.use('compile', hbs({
  viewEngine: {
    extname: '.hbs',
    partialsDir: path.resolve('./emails'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./emails'),
  extName: '.hbs',
}));

export const sendCommunication = async (message: MessageBody, template: string = 'null') => {
  console.debug("message.type : ", message.type );
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
  console.debug("Sending email with ", message);
  const mailOptions = {
    from: EMAIL,
    to: message.recipient,
    subject: TEMPLATE[template],
    template: template,
    context: message.context
  };
  console.debug("Sending email to ", message.recipient);
  console.debug("Sending mailOptions to ", mailOptions);
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error(err);
    else console.log('Email sent ', info.response);
  });
};

export const TEMPLATE2 = {
  welcome: 'Welcome to App',
  otp: 'App OTP',
};

const TEMPLATE: Record<string, string> = {
  welcome: "Welcome to App",
  otp: "App OTP"
};