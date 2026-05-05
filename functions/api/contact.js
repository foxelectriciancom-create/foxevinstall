export async function onRequest(context) {
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (context.request.method !== "POST") {
    return new Response(JSON.stringify({ success: false, error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  var headers = { "Content-Type": "application/json" };

  try {
    var formData = await context.request.formData();
    var firstName = (formData.get("first_name") || "").trim();
    var lastName = (formData.get("last_name") || "").trim();
    var email = (formData.get("email") || "").trim();
    var message = (formData.get("message") || "").trim();

    if (!firstName || !lastName || !email) {
      return new Response(
        JSON.stringify({ success: false, error: "Please fill in all required fields." }),
        { status: 400, headers: headers }
      );
    }

    var toEmail = context.env.CONTACT_EMAIL || "info@foxevinstall.com";

    var res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + context.env.RESEND_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Fox EV Install <noreply@foxevinstall.com>",
        to: [toEmail],
        reply_to: email,
        subject: "New Contact Form: " + firstName + " " + lastName,
        html: "<h2>New Contact Form Submission</h2><table style='border-collapse:collapse;width:100%;max-width:500px'><tr><td style='padding:8px;font-weight:bold;border-bottom:1px solid #eee'>Name</td><td style='padding:8px;border-bottom:1px solid #eee'>" + firstName + " " + lastName + "</td></tr><tr><td style='padding:8px;font-weight:bold;border-bottom:1px solid #eee'>Email</td><td style='padding:8px;border-bottom:1px solid #eee'>" + email + "</td></tr><tr><td style='padding:8px;font-weight:bold;vertical-align:top'>Message</td><td style='padding:8px'>" + (message || "<em>No message</em>") + "</td></tr></table>",
      }),
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({ success: false, error: "Failed to send message. Please try calling us." }),
        { status: 500, headers: headers }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: headers }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ success: false, error: "Something went wrong. Please try calling us." }),
      { status: 500, headers: headers }
    );
  }
}
