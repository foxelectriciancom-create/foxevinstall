function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function onRequestPost(context) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://foxevinstall.com',
  };

  try {
    const formData = await context.request.formData();

    const data = {
      first_name: (formData.get('first_name') || '').trim(),
      last_name: (formData.get('last_name') || '').trim(),
      email: (formData.get('email') || '').trim(),
      message: (formData.get('message') || '').trim(),
    };

    if (!data.first_name || !data.last_name || !data.email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please fill in all required fields.' }),
        { status: 400, headers }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid email address.' }),
        { status: 400, headers }
      );
    }

    const toEmail = context.env.CONTACT_EMAIL || 'info@foxevinstall.com';

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Fox EV Install <noreply@foxevinstall.com>',
        to: [toEmail],
        reply_to: data.email,
        subject: `New Contact Form: ${data.first_name} ${data.last_name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse:collapse;width:100%;max-width:500px">
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Name</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(data.first_name)} ${escapeHtml(data.last_name)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Email</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;vertical-align:top">Message</td><td style="padding:8px">${data.message ? escapeHtml(data.message).replace(/\n/g, '<br>') : '<em>No message</em>'}</td></tr>
          </table>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const err = await emailResponse.text();
      console.error('Resend API error:', err);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to send message. Please try calling us.' }),
        { status: 500, headers }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers }
    );
  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Something went wrong. Please try calling us.' }),
      { status: 500, headers }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': 'https://foxevinstall.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
