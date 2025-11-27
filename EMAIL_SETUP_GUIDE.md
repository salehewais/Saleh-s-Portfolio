# Email Setup Guide for Portfolio

This guide will help you set up the email functionality for your portfolio using EmailJS.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email
5. **Copy your Service ID** (e.g., `service_xxxxxxx`)

### Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: {{subject}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. **Copy your Template ID** (e.g., `template_xxxxxxx`)

### Step 4: Get Your Public Key

1. Go to **Account** → **General** in your dashboard
2. Find your **Public Key** (e.g., `hfnIvVGl_1KEEjBFj`)
3. Keep this key for the next step

### Step 5: Update Your Portfolio Code

Open `index.html` and find these lines:

```javascript
// Line ~11 - Replace with your Public Key
emailjs.init("YOUR_PUBLIC_KEY");

// Line ~1516 - Replace with your Service ID and Template ID
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
```

Replace:
- `hfnIvVGl_1KEEjBFj` with your Public Key
- `service_r0hiwua` with your Service ID
- `template_wcl50vj` with your Template ID

## ✅ Testing

1. Open your portfolio in a browser
2. Fill out the contact form
3. Click "Send Message"
4. Check your email inbox - you should receive the message!

## 🎯 Current Configuration

The portfolio is currently set up with my test EmailJS account. You need to replace these values:

- **Public Key**: `hfnIvVGl_1KEEjBFj` → Replace with yours
- **Service ID**: `service_r0hiwua` → Replace with yours
- **Template ID**: `template_wcl50vj` → Replace with yours

## 📧 Fallback Option

If EmailJS fails (e.g., rate limit exceeded), the form automatically falls back to opening the user's default email client with a pre-filled message.

## 🔒 Security Note

EmailJS is safe to use on the client side. Your Public Key is meant to be public and included in your HTML. However, you should:

1. Set up **rate limiting** in EmailJS dashboard to prevent abuse
2. Enable **reCAPTCHA** in EmailJS for additional security
3. Configure **allowed domains** to restrict where your form can be used from

## 💡 Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- Standard email templates
- No credit card required

For higher volume, consider upgrading to a paid plan.

## 🆘 Troubleshooting

### Form says "Opening your email client..."
- This means EmailJS configuration needs to be updated
- Check that all IDs (Public Key, Service ID, Template ID) are correct
- Make sure your email service is properly connected in EmailJS dashboard

### Emails not received
- Check your spam folder
- Verify your email service is active in EmailJS
- Test the template in EmailJS dashboard first

### "Failed to send" error
- Check browser console for detailed error messages
- Verify your Public Key is correct
- Make sure you're not exceeding rate limits

## 📞 Need Help?

If you encounter issues:
1. Check the browser console (F12) for error messages
2. Visit [EmailJS Documentation](https://www.emailjs.com/docs/)
3. Contact EmailJS support

---

**Note**: The current placeholder credentials in the code are for demonstration only and may not work. Please set up your own EmailJS account for production use.

