import { json } from '@sveltejs/kit';
import { Resend } from 'resend';
import type { RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const POST = async ({ request }: RequestEvent) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // Check if API key exists
    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('Missing Resend API key');
      return json(
        { success: false, error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    // Initialize Resend with your API key
    const resend = new Resend(apiKey);

    // Send the email
    const { data, error } = await resend.emails.send({
      from: 'Kent Tran <hello@kentvtran.dev>', // Update with your verified domain
      to: 'hello@kentvtran.dev', // Your email where you want to receive messages
      subject: `Portfolio Contact Form Submission ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return json({ success: false, error: 'Failed to send email' }, { status: 500 });
    }

    return json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Error processing form:', error);
    return json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
};