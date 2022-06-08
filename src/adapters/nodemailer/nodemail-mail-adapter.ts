import nodemailer from "nodemailer";

import { MailAdapter, SendMailData } from "./../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5babe6569f6aae",
    pass: "e4d831131d1146",
  },
});

export class NodemailMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Washington Alexandre <was.alexandre42@gmail.com>",
      subject: subject,
      html: body,
    });
  }
}
