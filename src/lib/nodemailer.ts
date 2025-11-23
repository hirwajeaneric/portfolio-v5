import nodemailer from 'nodemailer';

/**
 * Create and configure nodemailer transporter for Gmail
 * Uses environment variables:
 * - EMAIL: Your Gmail address
 * - APP_PASSWORD: Gmail App Password (not your regular password)
 */
export const createTransporter = () => {
  const email = process.env.EMAIL;
  const appPassword = process.env.APP_PASSWORD;

  if (!email || !appPassword) {
    // Don't expose environment variable names in error messages
    throw new Error('Email configuration is missing');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: appPassword,
    },
  });
};

/**
 * Send email using nodemailer
 */
export const sendEmail = async ({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}) => {
  const email = process.env.EMAIL;

  if (!email) {
    // Don't expose environment variable names in error messages
    throw new Error('Email configuration is missing');
  }

  const transporter = createTransporter();

  const mailOptions = {
    from: `"Portfolio Contact Form" <${email}>`,
    to: Array.isArray(to) ? to.join(', ') : to,
    subject,
    html,
    replyTo: replyTo || email,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

