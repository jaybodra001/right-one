import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const type = formData.get('type'); // 'client' or 'candidate'
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message') || 'No message provided.';

    // Shared credentials and settings
    const EMAIL_USER = process.env.EMAIL_USER || 'contact@rightonenow.com';
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const SMTP_HOST = process.env.SMTP_HOST || 'smtp.hostinger.com';
    const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465');
    const CONTACT_COPY = process.env.CONTACT_COPY || 'contact@rightonenow.com';

    if (!name || !email || !type) {
      return NextResponse.json({ error: 'Missing required basic fields (name, email, type)' }, { status: 400 });
    }

    let emailOptions = {
      from: `"Right One" <${EMAIL_USER}>`,
      to: email, // Send to user
      cc: CONTACT_COPY, // Copy to company
      subject: '',
      html: '',
      attachments: [],
    };

    if (type === 'client') {
      const phone = formData.get('phone');
      const company = formData.get('company');

      if (!phone || !company) {
        return NextResponse.json({ error: 'Missing client fields (phone or company)' }, { status: 400 });
      }

      emailOptions.subject = `Business Inquiry: ${company} - ${name}`;
      emailOptions.html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">New Client Booking Inquiry</h2>
          <p>Hi ${name},</p>
          <p>Thank you for reaching out to Right One. We have received your inquiry for <strong>${company}</strong> and our team will get back to you shortly.</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #555;">Submission Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
          </div>
          <p style="font-size: 0.9em; color: #777;">This is an automated confirmation of your booking request. If you have any urgent questions, feel free to reply to this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="text-align: center; color: #aaa; font-size: 0.8em;">&copy; 2026 Right One. All rights reserved.</p>
        </div>
      `;
    } else if (type === 'candidate') {
      const file = formData.get('file');

      if (!file || !(file instanceof File)) {
        return NextResponse.json({ error: 'Missing or invalid resume file' }, { status: 400 });
      }

      emailOptions.subject = `Candidate Application: ${name}`;
      emailOptions.html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">Resume Submission Received</h2>
          <p>Greetings ${name},</p>
          <p>Thank you for submitting your resume to Right One. We have received your application and attached your resume to this correspondence for our records.</p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #555;">Application Overview:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Attachment:</strong> ${file.name}</p>
            <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
          </div>
          <p>A member of our recruitment team will review your profile and reach out if there is a potential match.</p>
          <p style="font-size: 0.9em; color: #777;">Best of luck with your application!</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="text-align: center; color: #aaa; font-size: 0.8em;">&copy; 2026 Right One. All rights reserved.</p>
        </div>
      `;

      // Convert File object to Buffer for attachment
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      emailOptions.attachments.push({
        filename: file.name,
        content: buffer,
      });
    } else {
      return NextResponse.json({ error: 'Invalid form type' }, { status: 400 });
    }

    // Nodemailer Setup
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true, // Use port 465
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false // Helps with some SMTP providers
      }
    });

    await transporter.sendMail(emailOptions);

    return NextResponse.json({ success: true, message: 'Form submitted and email sent successfully!' });

  } catch (error) {
    console.error('Error handling form submission:', error);
    return NextResponse.json({ 
      error: 'An unexpected error occurred', 
      details: error.message 
    }, { status: 500 });
  }
}
