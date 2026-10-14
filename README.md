# 🎓 College Event Registration System
> UIT · Karnavati University · Capstone Project

---

## ⚙️ Tech Stack
| Part | Technology |
|------|-----------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |

---

## 📁 Folder Structure
```
event-registration/
├── public/
│   ├── index.html   → The form (what user sees)
│   ├── style.css    → All styling
│   └── app.js       → Form submit logic
├── server.js        → Backend server
├── package.json     → Dependencies
└── .env             → Your MongoDB URL (secret)
```

---

## 🚀 How to Run

```bash
# 1. Install packages
npm install

# 2. Create .env file and add your MongoDB URL
MONGO_URL=mongodb+srv://milindkateshiya03_db_user:<db_password>@cluster0.p1ftsyj.mongodb.net/?appName=Cluster0&compressors=zlib
PORT=3000

# 3. Start server
node server.js

# 4. Open browser → http://localhost:3000
```

---

## 🔁 Flow
```
User fills form → app.js sends POST → server.js saves → MongoDB stored
```

---

## 🌐 API Endpoints
| Method | URL | What it does |
|--------|-----|-------------|
| GET | /health | Check if server is running |
| POST | /register | Save registration |
| GET | /registrations | View all registrations |

---

**Made by MILIND KATESHIYA · Semester II · UIT Karnavati University**
