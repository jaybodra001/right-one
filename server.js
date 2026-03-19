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
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                        <h2 style="color: #4f46e5;">New ${type} Submission</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        ${type === 'client' ? `<p><strong>Phone:</strong> ${phone}</p><p><strong>Company:</strong> ${company}</p>` : ''}
                        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
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
