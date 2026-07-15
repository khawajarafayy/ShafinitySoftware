import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, company, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // Development Fallback: If SMTP credentials are not set up, print to console and return success
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('\n--- DEVELOPMENT MODE: SMTP CREDENTIALS NOT SET ---');
    console.log(`Recipient: shafinity.solutions@gmail.com`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Company: ${company || 'N/A'}`);
    console.log(`Service: ${service || 'N/A'}`);
    console.log(`Message:\n${message}`);
    console.log('---------------------------------------------------\n');

    return res.status(200).json({ 
      success: true, 
      message: 'Submission received! (Running in dev mode: email output logged to server console)' 
    });
  }

  try {
    let transporter;

    if (process.env.SMTP_SERVICE === 'gmail' || process.env.SMTP_USER.includes('gmail.com')) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    } else {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    }

    await transporter.verify();

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: 'shafinity.solutions@gmail.com',
      subject: `New Contact Submission from ${name} (${company || 'No Company'})`,
      text: `
You have received a new contact submission.

Details:
-------------------------------------------
Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Service of Interest: ${service || 'N/A'}

Message:
${message}
-------------------------------------------
      `,
      html: `
        <h3>New Contact Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Service of Interest:</strong> ${service || 'N/A'}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 3px solid #ccc; padding-left: 10px; margin-left: 0;">
          ${message.replace(/\n/g, '<br/>')}
        </blockquote>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send message. Please try again later.',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
