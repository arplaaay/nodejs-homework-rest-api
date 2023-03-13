const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "artemb0607@gmail.com" };
    await sgMail.send(email);

    return true;
  } catch (err) {
    console.error(err);
  }
};

module.exports = sendEmail;
