# 💬 QuickChat – Real‑Time Messaging App

QuickChat is a full‑stack MERN (MongoDB, Express, React, Node.js) + Socket.IO application that lets users exchange text and images instantly, just like your favourite chat platforms.

- ⚡ Real‑time 1‑to‑1 messaging with Socket.IO 
- 🔐 JWT‑based authentication & protected routes 
- 🖼️ Image sharing via Cloudinary uploads
- 🟢 Online/offline indicators
- 📱 Responsive UI built with Tailwind CSS
- 🌐 Deployed on Vercel (Frontend & Backend) 

---

## 📸 Demo

👉 [Live App](https://chat-app-roan-three-85.vercel.app)  
Login with the demo credentials or register a new account to try it out.

---

## ⚙️ Tech Stack

| Technology     | Used For               |
|----------------|------------------------|
| MongoDB        | Database               |
| Express.js     | Backend API            |
| React.js       | Frontend UI            |
| Node.js        | Server-side JS         |
| Cloudinary     | Image Uploads          |
| Socket.IO      | Real‑time transport    |
| Vercel         | Frontend Deployment    |
| GitHub         | Version Control        |
| JWT            | Auth                   |

---

## 🧩 Features

### 👤 Authentication
- Register/Login for users
- JWT 
- Protected routes (/check, /update-profile)

### 💬 Chat
- Real‑time text & image messages
- Auto‑scroll to newest message
- Unread badge & last‑seen stamp

### 🗂️ Profile Management
- Upload avatar & update bio/full‑name
- Cloudinary used for image storage


---

## 🚀 Setup Instructions

### 📁 Clone the repo

```bash
git clone https://github.com/your‑username/quickchat.git
cd quickchat
```

### ⚙️ Backend Setup
```
cd server
npm install
```

### Create server/.env file
```
PORT=7000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
NODE_ENV=development
```

### Start server:
```
npm run start
```

### 💻 Frontend Setup
```
cd ../client
npm install
npm run dev
```

### Make sure Axios is configured with:
```
withCredentials: true
```

--- 

### 🧠 Folder Structure
```
chat-app/
│
├── client/               # Frontend (React + Vite)
│   ├── context/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── vercel.json
│   └── vite.config.js
│
├── server/               # Backend (Express + Node)
│   ├── controllers/
│   ├── lib/
│   ├── middlewares/
│   ├── models/
│   ├── node_modules/
│   ├── routes/
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   └── vercel.json
│
└── README.md
```

---

### 🔒 Security Notes
- .env is added to .gitignore
- Make sure not to upload secrets to GitHub
  
```
secure: true
sameSite: "none"
```

--- 


### 📦 Deployment
- Frontend: Vercel
- Backend: Vercel or Any Node.js-supported platform (e.g. Render, Railway)

---

### 🤝 Contributing
Pull requests are welcome! If you find a bug or have a feature request, open an issue first.

---

### 📧 Contact
Made with 💜 by [Anubhav](https://github.com/Anubhav0902) 
