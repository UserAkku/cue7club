import { render } from '@react-email/render';

export async function sendEmail(to: string, subject: string, template: React.ReactElement) {
  if (!process.env.BREVO_API_KEY) {
    console.warn("BREVO_API_KEY not set. Email not sent.");
    return false;
  }

  try {
    const htmlContent = await render(template);

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Cue7Club", email: "noreply@cue7club.com" },
        to: [{ email: to }],
        subject: subject,
        htmlContent: htmlContent,
      }),
    });

    if (!response.ok) {
      console.error("Brevo API error:", await response.text());
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Send email error:", error);
    return false;
  }
}
