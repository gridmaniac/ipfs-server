const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.sendMail = async (to, subject, html) => {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM,
      subject,
      html,
    };
    await sgMail.send(msg);
  } catch (e) {
    console.error(e.message);
  }
};
