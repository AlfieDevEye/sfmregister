# SFM Conference 2026 Registration

A responsive conference registration and waitlist platform built with React and Tailwind CSS for managing attendee registration efficiently.

### ✨ Key Features

* Online conference registration
* Waitlist management
* Responsive interface for desktop and mobile
* Google Sheets integration for registration records
* Automated confirmation emails
* Google Apps Script backend integration
* Real-time registration data processing

### 🛠️ Tech Stack

* React
* JavaScript
* Tailwind CSS
* Google Sheets
* Google Apps Script
* Vite

## Run locally

```bash
npm install
npm run dev
```

## Connect Google Sheets and confirmation email

1. Create a Google Sheet. You do not need to create a tab or add headers—the script does this automatically.
2. From that spreadsheet, choose **Extensions → Apps Script**. Replace its `Code.gs` with [google-apps-script/Code.gs](google-apps-script/Code.gs). Do not create a standalone Apps Script project: it must be created from inside the spreadsheet.
3. Select **Deploy → New deployment → Web app**. Set *Execute as* to **Me** and *Who has access* to **Anyone**. Approve the requested spreadsheet and email permissions, then copy the Web App URL.
4. Copy `.env.example` to `.env.local`, then paste the Web App URL as `VITE_APPS_SCRIPT_URL`.
5. Restart the development server, or rebuild and redeploy the site.

### Updating an existing setup

If you update an existing Apps Script deployment, select **Deploy → Manage deployments → Edit**, choose a **New version**, then deploy it. Reusing the old version continues to run the old script.

The website submits an opaque browser request to Apps Script because Google Apps Script does not return browser-readable CORS responses. The registration will be saved and the confirmation email sent by the script. If either does not happen, open **Executions** in Apps Script to view the server error.
