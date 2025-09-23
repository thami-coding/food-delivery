import * as nodemailer from "nodemailer";
import Queue from "bull";
import { IServerConfig } from "./config";

export class NotificationUtil {
  private static transporter;
  private static from: string;

  private static emailQueue = new Queue("emailQueue", "redis://127.0.0.1:6379");

  constructor(config: IServerConfig) {
    if (!config) {
      throw new Error("config not provided");
    }

    if (!NotificationUtil.transporter) {
      NotificationUtil.transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: config.email_config.user,
          pass: config.email_config.password,
        },
      });
    }

    NotificationUtil.from = config.email_config.from;
  }

  public static async sendEmail(to: string, subject: string, body: string) {
  
      const mailOptions = {
        to: to,
        subject: subject,
        html: body,
      };

      return NotificationUtil.transporter.sendMail(mailOptions);
      
  }

  public static async enqueueEmail(to: string, subject: string, body: string) {
    console.log("Enqueuing email task");

    await NotificationUtil.emailQueue.add({
      from: NotificationUtil.from,
      to,
      subject,
      body,
    });
    return true;
  }
}
