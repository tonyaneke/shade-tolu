# Quick Start Guide - RSVP System

Follow these steps to get your RSVP system up and running.

## Step 1: Create Environment File

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.local.example .env.local
```

Then edit `.env.local` and add your actual values:

```env
# Your PostgreSQL connection URL
DATABASE_URL=postgres://username:password@host:port/database

# Your Resend API key (get from https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Email to receive RSVP notifications
COUPLE_EMAIL=info@Zentrixapex.com
```

## Step 2: Set Up Database

Run the database setup script to create the RSVP table:

```bash
pnpm db:setup
```

This will:

- ✅ Create the `rsvps` table with proper schema
- ✅ Verify the table structure
- ✅ Show current RSVP count

## Step 3: Configure Resend Email

### For Development (Testing)

You can use Resend's test domain immediately - no setup needed!

### For Production

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add and verify your domain
3. Update the email in `/app/api/rsvp/route.ts`:

```typescript
// Change this line (around line 57):
from: "Shade & Tolu's Wedding <noreply@zentrixapex.com>";

// To your verified domain:
from: "Shade & Tolu's Wedding <noreply@yourdomain.com>";
```

## Step 4: Test the System

1. Start the development server:

```bash
pnpm dev
```

2. Navigate to: `http://localhost:3000/rsvp`

3. Fill out the form with test data

4. After submission, you should:
   - ✅ See a beautiful access card on screen
   - ✅ Receive a confirmation email (at the email you entered)
   - ✅ See a notification email sent to `info@Zentrixapex.com`

## Step 5: Verify Database

Check that your RSVP was saved:

```bash
pnpm db:setup
```

This will show the current count of RSVPs.

## Troubleshooting

### "Module not found: @react-email/render"

✅ **Fixed!** Already installed.

### "Connection refused" or Database errors

- Verify your `DATABASE_URL` is correct
- Make sure your PostgreSQL server is running
- Check firewall settings

### Emails not sending

- Verify `RESEND_API_KEY` is correct
- For production, ensure domain is verified in Resend
- Check server logs for detailed error messages

### Access card not showing

- Check browser console for errors
- Verify API route is returning success response
- Check network tab in browser dev tools

## Environment Variables Checklist

- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `RESEND_API_KEY` - Resend API key
- [ ] `COUPLE_EMAIL` - Email for notifications (already set to info@Zentrixapex.com)

## Testing Checklist

- [ ] Database table created successfully
- [ ] Form accepts name and email
- [ ] Goodwill message has character counter (250 max)
- [ ] Form validates required fields
- [ ] Submission creates database record
- [ ] Access card displays after submission
- [ ] User receives confirmation email
- [ ] Couple receives notification email

## What's Next?

Once everything is working:

1. **Customize Email Templates** - Edit `/lib/email-templates.ts`
2. **Customize Access Card** - Edit `/src/ui/AccessCard.tsx`
3. **Add More Fields** - Modify `/src/ui/RSVPForm.tsx` and database schema
4. **Deploy to Production** - Set environment variables in your hosting platform
5. **Set Up Backups** - Configure PostgreSQL backups

## Need Help?

Check these files for detailed information:

- **Full Setup Guide**: `/RSVP_SETUP_GUIDE.md`
- **Implementation Details**: `/RSVP_IMPLEMENTATION_SUMMARY.md`
- **Database Script**: `/scripts/setup-database.ts`

## Quick Commands Reference

```bash
# Start development server
pnpm dev

# Set up database table
pnpm db:setup

# Build for production
pnpm build

# Start production server
pnpm start
```

---

**🎉 You're all set! Your RSVP system is ready to accept responses.**
