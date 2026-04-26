# ELITE AUTOHAUS WEBSITE
## Plain English Guide — Everything You Need To Know

---

### 📁 YOUR FILES AT A GLANCE

```
eliteautohaus/
│
├── index.html              ← HOME PAGE
├── sell.html               ← SELL YOUR CAR
├── personal-shopper.html   ← PERSONAL SHOPPER
├── service.html            ← SERVICE
├── financing.html          ← FINANCING
├── yacht-sales.html        ← YACHT SALES
├── yacht-inventory.html    ← YACHT INVENTORY
├── contact-us.html         ← CONTACT US
│
├── style.css               ← ALL THE COLOURS & FONTS (don't need to touch this)
├── shared.js               ← MAKES THE MENU & COOKIES WORK (don't touch)
│
├── data/
│   └── content.json        ← ALL YOUR TEXT LIVES HERE
│
├── images/
│   ├── logo.png            ← YOUR LOGO
│   ├── hero.jpg            ← DROP YOUR PHOTOS HERE
│   ├── yacht-hero.jpg
│   ├── gallery1.jpg
│   ├── gallery2.jpg
│   └── gallery3.jpg
│
└── admin/
    ├── index.html          ← ADMIN LOGIN
    └── dashboard.html      ← ADMIN CONTROL PANEL
```

---

### 🚀 HOW TO SEE YOUR SITE LOCALLY (on your own computer)

The site needs a mini web server to run. It's ONE command:

**Mac or Linux:**
1. Open Terminal
2. Type: `cd ` then drag your website folder into the terminal window
3. Hit Enter, then type: `python3 -m http.server 8000`
4. Open your browser → go to: **http://localhost:8000**

**Windows:**
1. Download VS Code (free) from code.visualstudio.com
2. Install the "Live Server" extension
3. Open your website folder in VS Code → click "Go Live" at the bottom

---

### 🔐 ADMIN PANEL

**URL:** http://localhost:8000/admin/

**Username:** admin
**Password:** eliteauto2024

**⚠️ IMPORTANT — Change your password before going live online!**
Open `admin/index.html` in Notepad or any text editor.
Find these two lines and change them:
```
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'eliteauto2024';
```

---

### ✏️ HOW TO EDIT TEXT

**Option A — Use the Admin Panel (easiest):**
1. Go to admin/ and log in
2. Click the page you want to edit on the left
3. Change the text in the boxes
4. Click the Save button
5. A file called `content.json` downloads automatically
6. Replace `data/content.json` with that downloaded file
7. Refresh the website ✅

**Option B — Edit HTML directly:**
Open any .html file in Notepad. The text is all in plain readable sections.
Save the file. Refresh the site. Done.

---

### 🖼 HOW TO CHANGE PHOTOS

1. Copy your photo into the `images/` folder
2. Name it simply — like `hero.jpg` or `my-car.jpg`
3. Go to Admin → Images
4. Type the filename: `images/hero.jpg`
5. Save → replace content.json → refresh

**Recommended photo sizes:**
- Hero banner: 1600 × 600 pixels (wide landscape)
- Gallery images: 800 × 600 pixels
- Yacht photos: 800 × 600 pixels

---

### 🌐 HOW TO PUT YOUR SITE ONLINE

**Option 1 — Netlify (FREE, easiest, takes 2 minutes):**
1. Go to netlify.com → Sign up free
2. Click "Add new site" → "Deploy manually"
3. Drag your entire `eliteautohaus` folder onto the page
4. Done! You get a free URL instantly.
5. You can then connect your domain (eliteautohaus.ca) in their settings.

**Option 2 — GoDaddy cPanel (you already have hosting there):**
1. Log into GoDaddy → My Products → cPanel
2. Click "File Manager"
3. Go into `public_html/`
4. Upload ALL your files there
5. Done! Your site is live at your domain.

**Option 3 — Any shared host (Hostinger, SiteGround, Bluehost):**
Same as GoDaddy — upload everything to `public_html/` or `www/`

---

### 📧 IMPORTANT: MAKE CONTACT FORMS ACTUALLY SEND EMAILS

Right now the forms show a "success" message but don't actually send emails.
To make them send real emails, you have two options:

**Option A — Formspree (free, easiest):**
1. Go to formspree.io → Sign up free
2. Create a form → you get a URL like `https://formspree.io/f/abcxyz`
3. Open each HTML file and find the `<form>` tag
4. Add `action="https://formspree.io/f/YOUR_CODE" method="POST"`
5. Remove the `onsubmit="submitForm(event)"` part

**Option B — Use your web host's built-in email/PHP:**
Ask your hosting provider — most shared hosts support PHP mail.

---

### 📞 NEED HELP?

All the pages are connected and working. If something doesn't look right,
check that you're viewing it through the web server (http://localhost:8000)
and not by double-clicking the HTML file directly.
