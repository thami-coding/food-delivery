// import Queue from "bull";
// import { NotificationUtil } from "../utils/notification_util";

// export class QueueWorker {
//   private static emailQueue = new Queue("emailQueue", "redis://127.0.0.1:6379");
//   private static MAX_ATTEMPTS = 4;

//   constructor() {
//     console.log("Initializing QueueWorker");
//   }

//   public beginProcess() {
//     QueueWorker.emailQueue.process(async (job) => {
//       try {
//         console.log(
//           `Got a job to send email to ${job.data.to} with subject ${job.data.subject}`
//         );
//         const { to, subject, body } = job.data;
//         await NotificationUtil.sendEmail(to, subject, body);

//         console.log(`Email sent to ${to}`);
//       } catch (error) {
//         console.error(`failed to send email: ${error.message}`);
//       }
//     });

//     QueueWorker.emailQueue.on("failed", async (job, err) => {
//       if (job.attemptsMade >= QueueWorker.MAX_ATTEMPTS) {
//         console.error(
//           `Job permanently failed for ${job.data.to}: ${err.message}`
//         );
//       } else {
//         console.log(`Retrying job for ${job.data.to}`);
//         await job.retry();
//       }
//     });
//   }
// }
