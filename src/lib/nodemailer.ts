import 'server-only';
import nodemailer from 'nodemailer';

/**
 * Runtime getter for environment variables to prevent webpack from inlining values
 * This ensures secrets are only accessed at runtime, not during build
 */
const getEnvVar = (key: string): string | undefined => {
  if (typeof window !== 'undefined') {
    // This should never happen due to server-only, but adding safety check
    return undefined;
  }
  // Access process.env at runtime using bracket notation to prevent static analysis
  return process.env[key];
};

/**
 * Create and configure nodemailer transporter for Gmail
 * Uses environment variables:
 * - EMAIL: Your Gmail address
 * - APP_PASSWORD: Gmail App Password (not your regular password)
 * 
 * This function is server-only and environment variables are accessed at runtime.
 */
export const createTransporter = () => {
  // Access environment variables at runtime using getter function
  // This prevents webpack from statically analyzing and inlining the values
  const email = getEnvVar("EMAIL");
  const appPassword = getEnvVar("APP_PASSWORD") || getEnvVar("EMAIL_PASSWORD");

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
 * This function is server-only and environment variables are accessed at runtime.
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
  // Access environment variable at runtime using getter function
  // This prevents webpack from statically analyzing and inlining the values
  const email = getEnvVar('EMAIL');

  if (!email) {
    // Don't expose environment variable names in error messages
    throw new Error('Email configuration is missing');
  }

  // Create transporter at runtime to ensure env vars are not inlined
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

