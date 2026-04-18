


const SMTP_SERVER = "smtp.gmail.com";
const port = 587;  // For starttls
const EMAIL = "jommel.s.2020@gmail.com";
const PASSWORD = "vpcj atll aqrk czif";
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: EMAIL,
//     pass: PASSWORD
//   }
// });

export const sendCommunication = async () => {
  console.log("Sending communication");
  
  return "send";
};

const sendSMS = async () => {
  console.log("Sending SMS");

};
const sendEmail = async () => {
  console.log("Sending email");

};
