# 📁 Smart File Sharing System with Cloud

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS_S3-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

> A secure, scalable, full-stack web application for uploading, storing, and sharing files via cloud — powered by AWS S3, JWT authentication, and AES-256 encryption.

---

## 📖 Table of Contents

- [Project Description](#-project-description)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [System Design](#-system-design--high-level-flow)
- [Security Considerations](#-security-considerations)
- [Scalability Discussion](#-scalability-discussion)
- [Real-World Use Cases](#-real-world-use-cases)
- [Folder Structure](#-folder-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Usage Guide](#-usage-guide)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📌 Project Description

**Smart File Sharing System with Cloud** is a production-ready full-stack web application that enables users to securely upload, manage, and share files with full control over access. Files are stored in AWS S3 with server-side encryption, links are time-limited and token-protected, and all users are authenticated via JWT.

Whether you're sharing a 2 MB document or a 2 GB media file — this system handles it securely and efficiently.

---

## ✨ Features

- 🔐 **Secure Authentication** — Register/Login with hashed passwords and JWT-based session management
- ☁️ **Cloud File Upload** — Upload files directly to AWS S3 with pre-signed URLs
- 🔒 **File Encryption** — AES-256 encryption applied before cloud storage
- 🔗 **Shareable Links** — Generate expirable, token-protected sharing links
- ⏰ **Link Expiry Control** — Set custom TTL (time-to-live) for each shared link
- 📂 **File Management Dashboard** — View, rename, delete, and organize your uploads
- 👥 **Access Control** — Private files, public files, and password-protected links
- 📊 **Download Analytics** — Track how many times a shared file has been accessed
- 📱 **Responsive UI** — Mobile-friendly interface built with clean HTML/CSS/JS
- 🚫 **Rate Limiting** — Prevents abuse via API request throttling

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla / React) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Cloud Storage** | AWS S3 (or Firebase Storage) |
| **Authentication** | JSON Web Tokens (JWT) + bcrypt |
| **Encryption** | AES-256 (Node.js `crypto` module) |
| **File Handling** | Multer (local buffer), AWS SDK v3 |
| **Environment Config** | dotenv |
| **Rate Limiting** | express-rate-limit |

---

## 🏗 Architecture Overview

The application follows a **3-tier architecture**:

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                    │
│          HTML/CSS/JS or React Frontend                  │
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS REST API
┌────────────────────────▼────────────────────────────────┐
│               BACKEND (Node.js + Express)               │
│  Auth Middleware → Controllers → Services → AWS SDK     │
└──────────────┬──────────────────────────┬───────────────┘
               │                          │
┌──────────────▼──────────┐  ┌────────────▼───────────────┐
│   MongoDB (Metadata)    │  │     AWS S3 (File Blobs)     │
│  Users, Files, Links    │  │  Encrypted file objects     │
└─────────────────────────┘  └────────────────────────────┘
```

**Request Flow:**
1. User authenticates → receives JWT
2. Upload request hits Express server with JWT in header
3. File is encrypted and streamed to AWS S3
4. File metadata (name, size, S3 key, owner, expiry) is saved to MongoDB
5. A shareable token-based link is generated and returned
6. Recipients use the link to download — server validates token, fetches from S3, and streams the file

---

## 🔍 System Design — High-Level Flow

```
[User] ──Upload──▶ [Express API]
                        │
               ┌────────┴────────┐
               │                 │
        [Encrypt File]     [Validate JWT]
               │
        [Stream to S3]
               │
        [Store Metadata in MongoDB]
               │
        [Generate Share Token + Expiry]
               │
        [Return Shareable URL] ──▶ [User Shares Link]
                                           │
                               [Recipient Opens Link]
                                           │
                               [Server Validates Token]
                                           │
                               [Fetch + Decrypt from S3]
                                           │
                               [Stream File to Browser]
```

---

## 🔐 Security Considerations

| Threat | Mitigation |
|---|---|
| **Unauthorized access** | JWT with short expiry + refresh token rotation |
| **Data exposure at rest** | AES-256 server-side encryption before S3 upload |
| **Data exposure in transit** | HTTPS/TLS enforced on all routes |
| **Brute-force attacks** | `express-rate-limit` on auth endpoints |
| **Link hijacking** | Token-signed links with TTL (expires in N hours/days) |
| **Password theft** | bcrypt hashing with salt rounds (≥12) |
| **CORS abuse** | Strict CORS policy allowing only whitelisted origins |
| **Large file abuse** | File size limits enforced via Multer config |
| **S3 bucket exposure** | Bucket is private; files served via pre-signed URLs only |

---

## 📈 Scalability Discussion

This system is designed with horizontal scalability in mind:

- **Stateless API**: JWT-based auth means no server-side sessions — any instance can handle any request. Easily load-balanced behind AWS ALB or Nginx.
- **S3 as Object Store**: AWS S3 scales infinitely. Large files never hit the Node.js server disk — they're streamed directly.
- **MongoDB Atlas**: Supports auto-sharding and replica sets. Indexes on `userId`, `shareToken`, and `expiresAt` keep queries fast at scale.
- **CDN Integration**: S3 can be placed behind CloudFront for low-latency global delivery.
- **Queue for Heavy Jobs**: File processing (e.g., thumbnail generation, virus scanning) can be offloaded to AWS SQS + Lambda workers.
- **Rate Limiting per User**: Prevents any single user from hammering the upload endpoint.

> At 10,000 concurrent users, the bottleneck would be MongoDB writes — solvable via write batching or Redis caching for metadata reads.

---

## 🌍 Real-World Use Cases

- 🏢 **Enterprise Document Sharing** — Securely share contracts, invoices, and reports with expiring links
- 🎓 **Education Platforms** — Professors share lecture materials accessible only for a limited time
- 🏥 **Healthcare** — Share medical records securely with patients or specialists
- 🎨 **Freelancers & Designers** — Deliver high-resolution files to clients via one-time links
- 🧑‍💻 **Dev Teams** — Internal file drops without relying on third-party tools like WeTransfer

---

## 📂 Folder Structure

```
smart-file-sharing-system/
│
├── client/                        # Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── FileCard.jsx
│   │   │   └── ShareModal.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Home.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── package.json
│
├── server/                        # Backend
│   ├── config/
│   │   ├── db.js                  # MongoDB connection
│   │   └── s3.js                  # AWS S3 client config
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── fileController.js
│   │   └── shareController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js      # JWT verification
│   │   ├── rateLimiter.js
│   │   └── uploadMiddleware.js    # Multer config
│   ├── models/
│   │   ├── User.js
│   │   ├── File.js
│   │   └── ShareLink.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── fileRoutes.js
│   │   └── shareRoutes.js
│   ├── services/
│   │   ├── encryptionService.js   # AES-256 logic
│   │   ├── s3Service.js           # S3 upload/download
│   │   └── tokenService.js        # Share token generation
│   ├── utils/
│   │   └── errorHandler.js
│   ├── .env.example
│   ├── app.js
│   └── server.js
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas URI)
- [AWS Account](https://aws.amazon.com/) with an S3 bucket configured
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/smart-file-sharing-system.git
cd smart-file-sharing-system
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

### 4. Configure Environment Variables

```bash
cd ../server
cp .env.example .env
# Fill in your values (see Environment Variables section below)
```

### 5. Start MongoDB (if running locally)

```bash
mongod --dbpath /your/db/path
```

### 6. Run the Backend Server

```bash
cd server
npm run dev
```

### 7. Run the Frontend

```bash
cd client
npm start
```

The app will be available at `http://localhost:3000` and the API at `http://localhost:5000`.

---

## 🔑 Environment Variables

Create a `.env` file in the `/server` directory using the template below:

```env
# ─── App ───────────────────────────────────────────
PORT=5000
NODE_ENV=development

# ─── MongoDB ───────────────────────────────────────
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/smartfiles

# ─── JWT ───────────────────────────────────────────
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# ─── AWS S3 ────────────────────────────────────────
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=smart-file-sharing-bucket

# ─── Encryption ────────────────────────────────────
ENCRYPTION_KEY=32_char_hex_key_here_for_aes256

# ─── Share Links ───────────────────────────────────
SHARE_LINK_BASE_URL=http://localhost:5000
DEFAULT_LINK_EXPIRY_HOURS=24

# ─── Rate Limiting ─────────────────────────────────
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

> ⚠️ **Never commit your `.env` file.** It is included in `.gitignore` by default.

---

## 📖 Usage Guide

### For End Users

1. **Register** an account at `/register`
2. **Login** to receive your JWT session
3. **Upload a file** via the dashboard — drag-and-drop or browse
4. **Set expiry** for the file link (1 hour / 24 hours / 7 days / custom)
5. **Copy the shareable link** and send it to anyone
6. **Track downloads** from your file dashboard
7. **Delete or revoke** any link at any time

### For Developers / API Consumers

Use the base URL `http://localhost:5000/api` and include the JWT in headers:

```http
Authorization: Bearer <your_token>
```

---

## 📡 API Endpoints

### 🔐 Auth

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |
| `POST` | `/api/auth/logout` | Invalidate session |

### 📁 Files

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/files/upload` | Upload a file to S3 |
| `GET` | `/api/files` | List all files for auth user |
| `GET` | `/api/files/:id` | Get metadata for a file |
| `DELETE` | `/api/files/:id` | Delete a file |

### 🔗 Share Links

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/share/:fileId` | Generate a shareable link |
| `GET` | `/api/share/:token` | Access/download a shared file |
| `DELETE` | `/api/share/:token` | Revoke a share link |
| `GET` | `/api/share/:fileId/stats` | Get download stats for a file |

> Full API documentation can be found in [`/docs/API.md`](./docs/API.md) *(or import the Postman collection from `/docs/postman_collection.json`)*.

---

## 📸 Screenshots

> *Replace these placeholders with actual screenshots of your app.*

| Dashboard | Upload Modal | Shared Link Page |
|---|---|---|
| ![Dashboard](https://via.placeholder.com/300x180?text=Dashboard) | ![Upload](https://via.placeholder.com/300x180?text=Upload+Modal) | ![Share](https://via.placeholder.com/300x180?text=Share+Link) |

---

## ☁️ Deployment

### Backend → Render / Railway

```bash
# Set environment variables in your Render/Railway dashboard
# Deploy from GitHub repo, set build command:
npm install && npm start
```

### Frontend → Vercel

```bash
npm install -g vercel
cd client
vercel --prod
```

### Full Stack → AWS (EC2 + S3 + MongoDB Atlas)

1. Launch an EC2 instance (Ubuntu 22.04 LTS)
2. Install Node.js, clone repo, set up PM2
3. Configure Nginx as reverse proxy
4. Point domain to EC2 Elastic IP
5. Enable HTTPS via Let's Encrypt (Certbot)

```bash
sudo apt update && sudo apt install nginx certbot python3-certbot-nginx
pm2 start server.js --name smart-file-api
pm2 save && pm2 startup
```

---

## 🔮 Future Improvements

- [ ] 📧 Email notifications on file access / expiry
- [ ] 🔑 Password-protected share links
- [ ] 🧪 Virus/malware scanning via ClamAV or AWS Macie
- [ ] 🗂 Folder/collection support for organizing files
- [ ] 🔄 Version history — keep previous file versions
- [ ] 🤝 Team/organization accounts with shared storage pools
- [ ] 📲 Mobile app (React Native)
- [ ] 🌐 Multi-cloud support (GCP + Azure alongside AWS)
- [ ] 🧠 AI-powered file tagging and search
- [ ] 📦 Self-hosted option with MinIO as S3 replacement

---

## 🤝 Contributing

Contributions are what make open source great. Any contributions you make are **greatly appreciated**!

1. **Fork** the repository
2. **Create** your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "feat: add AmazingFeature"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request** and describe your changes clearly

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) standard for commit messages.

> Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) for full guidelines, code style, and branch naming conventions.

---

## 📄 License

This project is licensed under the **MIT License** — see the [`LICENSE`](./LICENSE) file for details.

```
MIT License © 2024 Your Name
```

---

<div align="center">

Made with ❤️ by [Your Name](https://github.com/your-username)

⭐ Star this repo if you found it helpful!

</div>
