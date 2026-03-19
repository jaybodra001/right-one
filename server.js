import express from 'express';
import nodemailer from 'nodemailer';
import formidable from 'formidable';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 5001; // Avoid 5000 as it's often used by macOS AirPlay

app.use(cors());

app.post('/api/send-mail', async (req, res) => {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Form parse error:', err);
            return res.status(500).json({ error: 'Form processing error' });
        }

        try {
            const name = fields.name?.[0] || fields.name;
            const email = fields.email?.[0] || fields.email;
            const type = fields.type?.[0] || fields.type;
            const phone = fields.phone?.[0] || fields.phone;
            const company = fields.company?.[0] || fields.company;
            const message = fields.message?.[0] || fields.message || 'No message provided.';
            const file = files.file?.[0] || files.file;

            console.log(`Received ${type} inquiry from ${name}`);

            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || 'smtp.hostinger.com',
                port: parseInt(process.env.SMTP_PORT || '465'),
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            let mailOptions = {
                from: `"Right One" <${process.env.EMAIL_USER}>`,
                to: email,
                cc: process.env.CONTACT_COPY || 'contact@rightonenow.com',
                subject: type === 'client' ? `Business Inquiry: ${company}` : `Candidate Application: ${name}`,
                html: `
                    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
                        <div style="background-color: #4f46e5; padding: 30px; text-align: center;">
                            <img src="https://res.cloudinary.com/dlaykkhkc/image/upload/v1768728865/Rightone_Logo_f9irxr.svg" alt="RightOne" style="height: 50px; width: auto;" />
                            <h1 style="color: #ffffff; margin-top: 20px; font-size: 24px;">New ${type === 'client' ? 'Client Inquiry' : 'Candidate Submission'}</h1>
                        </div>
                        <div style="padding: 40px; color: #1e293b; line-height: 1.6;">
                            <div style="background-color: #f8fafc; padding: 25px; border-radius: 12px; border: 1px solid #f1f5f9;">
                                <p><strong>Name:</strong> ${name}</p>
                                <p><strong>Email:</strong> ${email}</p>
                                ${type === 'client' ? `<p><strong>Phone:</strong> ${phone}</p><p><strong>Company:</strong> ${company}</p>` : ''}
                                <p style="margin-top: 15px;"><strong>Message:</strong></p>
                                <p style="color: #475569; font-style: italic;">${message.replace(/\n/g, '<br/>')}</p>
                            </div>
                            ${type === 'candidate' ? '<p style="margin-top: 20px; color: #4f46e5; font-weight: bold;">The CV/Resume is attached.</p>' : ''}
                            <p style="margin-top: 30px; font-size: 14px; color: #64748b; text-align: center;">
                                Sent from RightOne Local Development Server
                            </p>
                        </div>
                    </div>
                `,
                attachments: []
            };

            if (type === 'candidate' && file) {
                mailOptions.attachments.push({
                    filename: file.originalFilename,
                    path: file.filepath
                });
            }

            await transporter.sendMail(mailOptions);
            res.json({ success: true, message: 'Email sent successfully via local server!' });

        } catch (error) {
            console.error('SMTP error:', error);
            res.status(500).json({ error: 'Failed to send email', details: error.message });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Local API server running at http://localhost:${PORT}`);
});
