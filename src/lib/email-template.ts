/**
 * Generate HTML email template for contact form submissions
 */
export const generateContactEmailHTML = ({
  fullName,
  email,
  message,
}: {
  fullName: string;
  email: string;
  message: string;
}): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <h1 style="color: #2c3e50; margin-top: 0;">New Contact Form Submission</h1>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Contact Details</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #555; display: inline-block; width: 100px;">Name:</strong>
            <span style="color: #333;">${fullName}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #555; display: inline-block; width: 100px;">Email:</strong>
            <a href="mailto:${email}" style="color: #3498db; text-decoration: none;">${email}</a>
          </div>
          
          <div style="margin-top: 20px;">
            <strong style="color: #555; display: block; margin-bottom: 10px;">Message:</strong>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #3498db; border-radius: 3px; white-space: pre-wrap; color: #333;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #ecf0f1; border-radius: 5px; font-size: 12px; color: #7f8c8d;">
          <p style="margin: 0;">This email was sent from your portfolio contact form.</p>
          <p style="margin: 5px 0 0 0;">You can reply directly to this email to respond to ${fullName}.</p>
        </div>
      </body>
    </html>
  `;
};

