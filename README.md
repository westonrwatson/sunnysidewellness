# BYU Sunny Side Wellness

A wellness quiz for BYU students based on Organizational Behavior concepts: Locus of Control, SMART Goals, Self-Efficacy, Self-Determination Theory (ABC), and ERG Theory. Students answer 4 short questions and receive personalized recommendations. Responses and contact info are collected for follow-up surveys.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, React Router
- **Backend:** Google Sheets (via Apps Script)
- **Hosting:** GitHub Pages

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Environment Variables

Create a `.env` file (see `.env.example`):

```
VITE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Google Sheets Setup

1. Create a new Google Sheet with columns: `Timestamp`, `Name`, `Email`, `Q1`, `Q2`, `Q3`, `Q4`.

2. Go to **Extensions → Apps Script** and replace the default code with:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.q1 || '',
      data.q2 || '',
      data.q3 || '',
      data.q4 || '',
    ]);
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Deploy: **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**

4. Copy the Web App URL and set it as `VITE_SHEETS_URL` in your `.env`.

## Publish to GitHub

1. Create a new repository on GitHub (e.g. `byu-sunny-side-wellness`).

2. Initialize git and push:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/byu-sunny-side-wellness.git
git push -u origin main
```

3. Add `VITE_SHEETS_URL` as a repository secret (Settings → Secrets and variables → Actions) if you use GitHub Actions for deployment, or set it in your `.env` for local deploys.

## Deployment to GitHub Pages

```bash
npm run deploy
```

This builds the app and publishes to the `gh-pages` branch. Enable GitHub Pages in the repo settings (Source: `gh-pages` branch). The site will be at:

```
https://<username>.github.io/byu-sunny-side-wellness/
```

> **Note:** For production, set `VITE_SHEETS_URL` before running `npm run deploy` (via `.env`) so the built app includes your Google Sheets Web App URL.

## Project Structure

```
src/
├── components/     # Nav, ProgressBar, QuizQuestion, RecommendationCard
├── data/           # questions, recommendations
├── pages/          # Home, Quiz, Results, Tips
├── utils/          # scoring, sheets
└── App.tsx
```

## Course Context

HRM 391 – Organizational Behavior. Concepts from the [Organizational Behavior textbook](https://biz.libretexts.org/Bookshelves/Management/Organizational_Behavior).
