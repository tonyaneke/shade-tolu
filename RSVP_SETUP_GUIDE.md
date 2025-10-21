# RSVP System Setup Guide

This guide will help you set up and configure the RSVP system with PostgreSQL database and Resend email integration.

## Prerequisites

- PostgreSQL database (local or cloud)
- Resend account with API key
- Node.js and pnpm installed

## 1. Environment Variables Setup

Create a `.env.local` file in the root of your project with the following variables:

```env
# PostgreSQL Database Connection
DATABASE_URL=your_postgres_connection_url_here

# Resend Email API Key
RESEND_API_KEY=your_resend_api_key_here

# Email Recipients
COUPLE_EMAIL=info@Zentrixapex.com
```

### Getting Your Database URL

Your PostgreSQL connection URL should be in the format:
```
postgres://username:password@host:port/database
```

Or for services like Vercel Postgres or Neon:
```
postgres://user:password@ep-xxx-xxx.region.aws.neon.tech/dbname
```

### Getting Your Resend API Key

1. Sign up at [Resend](https://resend.com)
2. Verify your domain (or use the test domain for development)
3. Go to API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env.local` file

**Important**: For production, you need to verify your domain in Resend and update the `from` email in `/app/api/rsvp/route.ts`:
```typescript
from: "Shade & Tolu's Wedding <noreply@yourdomain.com>"
```

## 2. Database Setup

The database table will be automatically created when the first RSVP is submitted. However, you can manually create it using the following SQL:

```sql
CREATE TABLE IF NOT EXISTS rsvps (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  goodwill_message TEXT,
  access_code VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 3. Testing the System

### Development Testing

1. Start your development server:
```bash
pnpm dev
```

2. Navigate to `/rsvp` in your browser

3. Fill out the RSVP form with test data

4. After submission, you should:
   - See an access card on screen
   - Receive a confirmation email (to the email you entered)
   - The couple email should receive a notification

### Checking Database Records

You can query your database to see stored RSVPs:

```sql
SELECT * FROM rsvps ORDER BY created_at DESC;
```

## 4. Features

### RSVP Form
- **Name** (required): Guest's full name
- **Email** (required): Guest's email address
- **Goodwill Message** (optional): 250 character limit message to the couple

### After Submission
1. **On-Screen Access Card**: Beautiful card displaying guest name, event details, and unique access code
2. **Email to Guest**: Confirmation email with access card details
3. **Email to Couple**: Notification email with all RSVP details including goodwill message
4. **Database Storage**: All RSVP data is securely stored in PostgreSQL

### Access Code Format
Access codes are generated in the format: `WED-XXXXX-YYYY`
- Unique for each guest
- Automatically generated
- Can be used for event check-in

## 5. Email Templates

The system uses HTML email templates with Tailwind-inspired inline styles:

- **Couple Notification**: Sent to `info@Zentrixapex.com` (or your configured email)
- **User Confirmation**: Sent to the guest's email address

Both emails feature:
- Gradient designs matching the website aesthetic
- Responsive tables for clean data display
- Professional layout suitable for both desktop and mobile

## 6. Customization

### Change Access Code Format
Edit `/lib/db.ts` - `generateAccessCode()` function

### Modify Email Templates
Edit `/lib/email-templates.ts`:
- `getCoupleNotificationEmail()` for couple notifications
- `getUserConfirmationEmail()` for user confirmations

### Update Form Fields
Edit `/src/ui/RSVPForm.tsx` to add or remove fields

### Customize Access Card Design
Edit `/src/ui/AccessCard.tsx` for visual changes

## 7. Production Checklist

- [ ] Set up production PostgreSQL database
- [ ] Verify domain in Resend
- [ ] Update `from` email address in API route
- [ ] Set environment variables in production (Vercel, etc.)
- [ ] Test email delivery in production
- [ ] Set up database backups
- [ ] Monitor error logs

## 8. Troubleshooting

### Emails Not Sending
- Check Resend API key is correct
- Verify domain is verified in Resend (for production)
- Check console logs for error messages
- Ensure `from` email matches verified domain

### Database Connection Errors
- Verify DATABASE_URL is correct
- Check database server is running
- Ensure database user has proper permissions
- Check firewall/network settings

### Access Codes Not Unique
- System automatically retries if duplicate detected
- Check database connection is stable
- Verify `access_code` column has UNIQUE constraint

## 9. Support

For issues or questions:
- Check console logs in browser and server
- Review error messages in the terminal
- Verify all environment variables are set correctly
- Test with a clean database and fresh API keys

## 10. Security Notes

- Never commit `.env.local` to version control
- Keep Resend API key secure
- Use environment variables for all sensitive data
- Implement rate limiting for production (optional)
- Consider adding CAPTCHA for public forms (optional)

