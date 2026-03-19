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
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
          <div style="background-color: #4f46e5; padding: 30px; text-align: center;">
            <img src="https://res.cloudinary.com/dlaykkhkc/image/upload/v1768728865/Rightone_Logo_f9irxr.svg" alt="RightOne" style="height: 50px; width: auto;" />
            <h1 style="color: #ffffff; margin-top: 20px; font-size: 24px;">New Client Booking</h1>
          </div>
          <div style="padding: 40px; color: #1e293b; line-height: 1.6;">
            <p style="font-size: 16px; margin-bottom: 25px;">You have received a new business inquiry from the website:</p>
            <div style="background-color: #f8fafc; padding: 25px; border-radius: 12px; border: 1px solid #f1f5f9;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Company:</strong> ${company}</p>
              <p style="margin-top: 15px;"><strong>Message:</strong></p>
              <p style="color: #475569; font-style: italic;">${message}</p>
            </div>
            <p style="margin-top: 30px; font-size: 14px; color: #64748b; text-align: center;">
              This inquiry was sent from the RightOne Booking System.
            </p>
          </div>
        </div>
      `;
    } else {
      mailOptions.subject = `Candidate Application: ${name}`;
      mailOptions.html = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
          <div style="background-color: #4f46e5; padding: 30px; text-align: center;">
            <img src="https://res.cloudinary.com/dlaykkhkc/image/upload/v1768728865/Rightone_Logo_f9irxr.svg" alt="RightOne" style="height: 50px; width: auto;" />
            <h1 style="color: #ffffff; margin-top: 20px; font-size: 24px;">Resume Submission</h1>
          </div>
          <div style="padding: 40px; color: #1e293b; line-height: 1.6;">
            <p style="font-size: 16px; margin-bottom: 25px;">A new candidate has submitted their resume:</p>
            <div style="background-color: #f8fafc; padding: 25px; border-radius: 12px; border: 1px solid #f1f5f9;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p style="margin-top: 15px;"><strong>Message:</strong></p>
              <p style="color: #475569; font-style: italic;">${message}</p>
            </div>
            <p style="margin-top: 20px; color: #4f46e5; font-weight: bold;">
              The CV/Resume is attached to this email.
            </p>
            <p style="margin-top: 30px; font-size: 14px; color: #64748b; text-align: center;">
              This application was sent from the RightOne Recruitment Portal.
            </p>
          </div>
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
