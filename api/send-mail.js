import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';

// This is required for Vercel functions to parse multipart data correctly
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  try {
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const type = fields.type?.[0] || fields.type;
    const name = fields.name?.[0] || fields.name;
    const email = fields.email?.[0] || fields.email;
    const phone = fields.phone?.[0] || fields.phone;
    const company = fields.company?.[0] || fields.company;
    const message = fields.message?.[0] || fields.message || 'No message provided.';
    const file = files.file?.[0] || files.file;

    // SMTP Settings
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const SMTP_HOST = process.env.SMTP_HOST || 'smtp.hostinger.com';
    const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465');
    const CONTACT_COPY = process.env.CONTACT_COPY || 'contact@rightonenow.com';

    if (!name || !email || !type) {
      return res.status(400).json({ error: 'Missing required basic fields' });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    let mailOptions = {
        from: `"Right One" <${EMAIL_USER}>`,
        to: email,
        cc: CONTACT_COPY,
        subject: '',
        html: '',
        attachments: [],
    };

    if (type === 'client') {
      mailOptions.subject = `Business Inquiry: ${company} - ${name}`;
      mailOptions.html = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Client Booking Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `;
    } else {
      mailOptions.subject = `Candidate Application: ${name}`;
      mailOptions.html = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Resume Submission Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `;

      if (file) {
        mailOptions.attachments.push({
          filename: file.originalFilename || 'resume',
          path: file.filepath,
        });
      }
    }

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Mail error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
