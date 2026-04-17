# 📁 Smart File Sharing System

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS_S3-FF9900?style=flat-square&logo=amazonaws&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

> Upload. Encrypt. Share. With expirable, token-signed links and zero config chaos.

---

## ✨ Features

- 🔐 JWT authentication with bcrypt password hashing
- ☁️ Encrypted file uploads streamed to AWS S3
- 🔗 Shareable links with custom TTL (1h / 24h / 7d)
- 📊 Per-file download analytics
- 🚫 API rate limiting & file size validation
- 📂 Full file management dashboard (rename, delete, revoke)

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | HTML, CSS, JavaScript (React optional) |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Storage | AWS S3 (or Firebase Storage) |
| Auth | JWT + bcrypt |
| Encryption | AES-256-CBC (Node `crypto`) |
| Upload | Multer |

---

## 🔄 How It Works — 6-Step Workflow

```
01 ── Register & Login
      └─ bcrypt hash → JWT issued (7d TTL)

02 ── Upload File
      └─ Multer buffers → size/type validation

03 ── Encrypt File
      └─ AES-256-CBC → ciphertext only leaves server

04 ── Store in S3
      └─ Private bucket → S3 key saved to MongoDB

05 ── Generate Share Link
      └─ Crypto token + configurable TTL → shareable URL

06 ── Download & Decrypt
      └─ Token validated → S3 fetch → in-memory decrypt → stream
```

> See the **interactive 3D workflow diagram** in the project wiki for a visual breakdown of each step.

---

## 🔐 Security Highlights

| Threat | Defence |
|---|---|
| Unauthorized access | JWT + short expiry |
| Data at rest | AES-256-CBC encryption before S3 |
| Data in transit | HTTPS/TLS enforced |
| Link hijacking | Token-signed links with TTL |
| Brute-force | `express-rate-limit` on auth routes |
| S3 exposure | Private bucket, pre-signed URLs only |

---

## 📂 Folder Structure

```
smart-file-sharing/
├── client/
│   ├── src/
│   │   ├── components/        # Dashboard, FileCard, ShareModal
│   │   ├── pages/             # Login, Register, Home
│   │   └── services/api.js
│   └── package.json
│
└── server/
    ├── config/                # db.js, s3.js
    ├── controllers/           # auth, file, share
    ├── middlewares/           # JWT verify, rate limiter, Multer
    ├── models/                # User, File, ShareLink
    ├── routes/                # auth, file, share
    ├── services/              # encryption, S3, token
    ├── .env.example
    └── server.js
```

---

## 🚀 Setup

### Prerequisites
- Node.js v18+, MongoDB, AWS S3 bucket

```bash
# 1. Clone
git clone https://github.com/your-username/smart-file-sharing.git
cd smart-file-sharing

# 2. Install
cd server && npm install
cd ../client && npm install

# 3. Configure
cd ../server && cp .env.example .env
# Fill in your values

# 4. Run
npm run dev                    # backend → :5000
cd ../client && npm start      # frontend → :3000
```

---

## 🔑 Environment Variables

```env
# App
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/smartfiles

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# AWS S3
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your-bucket

# Encryption
ENCRYPTION_KEY=32_char_hex_key_for_aes256

# Share Links
DEFAULT_LINK_EXPIRY_HOURS=24
```

---

## 📡 API Reference

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register user |
| `POST` | `/api/auth/login` | Login → JWT |

### Files
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/files/upload` | Upload to S3 |
| `GET` | `/api/files` | List user files |
| `DELETE` | `/api/files/:id` | Delete file |

### Share Links
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/share/:fileId` | Generate link |
| `GET` | `/api/share/:token` | Download via link |
| `DELETE` | `/api/share/:token` | Revoke link |
| `GET` | `/api/share/:fileId/stats` | Download stats |

> All protected routes require: `Authorization: Bearer <token>`

---

## 📈 Scalability Notes

- **Stateless API** — JWT means any server instance handles any request. Load-balance freely.
- **S3 scales infinitely** — files never touch the server disk.
- **MongoDB indexes** on `userId`, `shareToken`, `expiresAt` keep queries fast.
- **CloudFront CDN** can front S3 for global low-latency delivery.
- Heavy jobs (virus scan, thumbnail) can offload to AWS SQS + Lambda.

---

## ☁️ Deployment

```bash
# Backend → Render / Railway
# Set env vars in dashboard, then deploy from GitHub.

# Frontend → Vercel
npm i -g vercel && vercel --prod

# Full stack → EC2 + Nginx + PM2
pm2 start server.js --name smart-file-api
pm2 save && pm2 startup
```

---

## 🔮 Future Improvements

- [ ] Password-protected share links
- [ ] Virus scanning via ClamAV or AWS Macie
- [ ] Folder / collection support
- [ ] File version history
- [ ] Team accounts with shared storage
- [ ] Mobile app (React Native)
- [ ] AI-powered file tagging & search
- [ ] Self-hosted option with MinIO

---

## 🌍 Real-World Use Cases

- **Enterprise** — Share contracts and invoices with expiring links
- **Healthcare** — Securely deliver medical records to specialists
- **Education** — Time-locked lecture materials for students
- **Freelancers** — Deliver design assets via one-time download links

---

## 🤝 Contributing

```bash
git checkout -b feature/your-feature
git commit -m "feat: add your feature"
git push origin feature/your-feature
# → Open a Pull Request
```

Follow [Conventional Commits](https://www.conventionalcommits.org/). See `CONTRIBUTING.md` for full guidelines.

---

## 📄 License

MIT © 2024 [Your Name](https://github.com/your-username)

---

<div align="center">
Made with ❤️ — ⭐ Star if this helped!
</div>
