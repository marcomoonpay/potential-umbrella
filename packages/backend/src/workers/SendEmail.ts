import nodemailer from "nodemailer";
import { AppDataSource } from "../data-source";
import { Email } from "../entity/Email";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "joelle19@ethereal.email",
    pass: "Xfe7tdRNWX2P1PST1S",
  },
});

export async function sendEmails() {
  const emailsToSend = await AppDataSource.getRepository<Email>(Email).findBy({
    sent: false,
  });

  await Promise.allSettled(
    emailsToSend.map(async (emailToSend) => {
      await transporter.sendMail({
        from: "do_not_reply@northpole.com", // sender address
        to: "santa@northpole.com", // list of receivers
        subject: "New wish request", // Subject line
        text: `Santa! 
          You have a new request coming from ${emailToSend.target} living at ${emailToSend.address}.
          ------------------
  
          ${emailToSend.emailBody}
          
          ------------------
          `, // plain text body
      });

      emailToSend.sent = true;
    })
  );

  await AppDataSource.getRepository<Email>(Email).save(emailsToSend);
}
