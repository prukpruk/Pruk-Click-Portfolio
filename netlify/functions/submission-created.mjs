import nodemailer from 'nodemailer';

export default async (req) => {
  try {
    const { payload } = await req.json();
    const { name, subject, message, timestamp } = payload.data;

    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: 'prukpruk@hotmail.com',
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailBody = [
      `Name: ${name}`,
      ``,
      `Date & Time: ${timestamp || new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' })}`,
      ``,
      `Message:`,
      `${message}`,
    ].join('\n');

    await transporter.sendMail({
      from: `"Portfolio Contact" <prukpruk@hotmail.com>`,
      to: 'prukpruk@hotmail.com',
      subject: subject,
      text: emailBody,
    });

    console.log('Email sent successfully');
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Error processing submission:', error);
    return new Response('Error', { status: 500 });
  }
};
