/**
 * Email template for couple notification
 */
export function getCoupleNotificationEmail(data: {
  name: string;
  email: string;
  goodwillMessage?: string;
  accessCode: string;
  timestamp: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New RSVP Notification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">🎉 New RSVP Received!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 30px;">
                    <p style="margin: 0; color: #78350f; font-size: 18px; font-weight: 600;">Guest Details</p>
                  </td>
                </tr>
                
                <!-- Guest Information Table -->
                <tr>
                  <td>
                    <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden;">
                      <tr>
                        <td style="background-color: #fef3c7; padding: 16px; font-weight: 600; color: #92400e; width: 40%;">Name</td>
                        <td style="padding: 16px; color: #1f2937;">${
                          data.name
                        }</td>
                      </tr>
                      <tr>
                        <td style="background-color: #fef3c7; padding: 16px; font-weight: 600; color: #92400e;">Email</td>
                        <td style="padding: 16px; color: #1f2937;">${
                          data.email
                        }</td>
                      </tr>
                      <tr>
                        <td style="background-color: #fef3c7; padding: 16px; font-weight: 600; color: #92400e;">Access Code</td>
                        <td style="padding: 16px; color: #1f2937; font-family: monospace; font-size: 16px; font-weight: 600;">${
                          data.accessCode
                        }</td>
                      </tr>
                      <tr>
                        <td style="background-color: #fef3c7; padding: 16px; font-weight: 600; color: #92400e;">RSVP Date</td>
                        <td style="padding: 16px; color: #1f2937;">${
                          data.timestamp
                        }</td>
                      </tr>
                      ${
                        data.goodwillMessage
                          ? `
                      <tr>
                        <td style="background-color: #fef3c7; padding: 16px; font-weight: 600; color: #92400e; vertical-align: top;">Goodwill Message</td>
                        <td style="padding: 16px; color: #1f2937; line-height: 1.6;">${data.goodwillMessage}</td>
                      </tr>
                      `
                          : ""
                      }
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); padding: 24px; text-align: center;">
              <p style="margin: 0; color: #ffffff; font-size: 14px;">Shade & Tolu's Wedding RSVP System</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Email template for user confirmation
 */
export function getUserConfirmationEmail(data: {
  name: string;
  accessCode: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RSVP Confirmed</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 50px 40px; text-align: center;">
              <h1 style="margin: 0 0 16px 0; color: #ffffff; font-size: 36px; font-weight: bold;">Thank You! 🎊</h1>
              <p style="margin: 0; color: #fef3c7; font-size: 18px;">Your RSVP has been confirmed</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 30px 0; color: #4b5563; font-size: 16px; line-height: 1.6; text-align: center;">
                We're thrilled you'll be joining us on our special day! Your access card details are below.
              </p>
              
              <!-- Access Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fce7f3 100%); border-radius: 20px; overflow: hidden; margin: 30px 0;">
                <tr>
                  <td style="padding: 40px; text-align: center;">
                    <div style="background-color: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); border-radius: 16px; padding: 32px; margin: 0 auto; max-width: 400px; border: 3px solid rgba(251, 191, 36, 0.3);">
                      <h2 style="margin: 0 0 24px 0; color: #92400e; font-size: 24px; font-weight: bold;">Wedding Access Card</h2>
                      
                      <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 24px;">
                        <tr>
                          <td style="text-align: left; color: #92400e; font-size: 14px; font-weight: 600;">Guest Name</td>
                          <td style="text-align: right; color: #1f2937; font-size: 16px; font-weight: 600;">${data.name}</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding-top: 8px; padding-bottom: 8px;">
                            <div style="height: 1px; background: linear-gradient(90deg, transparent, #f59e0b, transparent);"></div>
                          </td>
                        </tr>
                        <tr>
                          <td style="text-align: left; color: #92400e; font-size: 14px; font-weight: 600;">Event</td>
                          <td style="text-align: right; color: #1f2937; font-size: 14px;">Shade & Tolu's Wedding</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding-top: 8px; padding-bottom: 8px;">
                            <div style="height: 1px; background: linear-gradient(90deg, transparent, #f59e0b, transparent);"></div>
                          </td>
                        </tr>
                        <tr>
                          <td style="text-align: left; color: #92400e; font-size: 14px; font-weight: 600;">Access Code</td>
                          <td style="text-align: right; color: #1f2937; font-family: monospace; font-size: 16px; font-weight: 700; letter-spacing: 1px;">${data.accessCode}</td>
                        </tr>
                      </table>
                      
                      <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #ffffff; padding: 12px 24px; border-radius: 12px; font-size: 13px; font-weight: 600; margin-top: 20px;">
                        ✨ Physical card will be shipped to you
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6; text-align: center;">
                Please save this email for your records. We look forward to celebrating with you!
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); padding: 30px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #ffffff; font-size: 20px; font-weight: 600;">Shade & Tolu</p>
              <p style="margin: 0; color: #f3e8ff; font-size: 14px;">Can't wait to see you there! 💕</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
