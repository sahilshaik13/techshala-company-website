import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Debug: Check if variables are loaded (Check your terminal when you send)
    console.log("Sending email from:", process.env.SMTP_USER);
    if (!process.env.SMTP_PASSWORD) {
        console.error("ERROR: SMTP_PASSWORD is missing in .env.local");
        return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    // 1. Configure the transporter for Gmail
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD, // Must be the 16-char App Password
      },
    });

    // 2. Define email structure
    const mailOptions = {
      from: `"Techshala Website" <${process.env.SMTP_USER}>`, // Sender address
      to: process.env.MY_EMAIL, // Receiver address
      replyTo: email, // When you click reply, it goes to the user
      subject: subject || `New Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">New Inquiry</h2>
          
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin-top: 20px;">
            <p style="margin: 0; color: #374151;"><strong>Message:</strong></p>
            <p style="margin-top: 8px; white-space: pre-wrap; color: #4b5563;">${message}</p>
          </div>
          
          <p style="font-size: 12px; color: #9ca3af; margin-top: 30px; text-align: center;">
            Sent via Techshala Contact Form
          </p>
        </div>
      `,
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}