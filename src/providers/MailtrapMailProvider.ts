import { IMailProvider, IMessage } from "@interfaces"
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer"

export class MailtrapMailProvider implements IMailProvider {
  private transporter:Mail

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
  }

  async sendMail(message:IMessage):Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: process.env.EMIAL_NAME,
        address: process.env.EMAIL_USER
      },
      subject: message.subject,
      html: message.body,
    })
  }
}