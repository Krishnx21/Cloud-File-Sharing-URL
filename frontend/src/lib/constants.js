export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://cloud-file-sharing-url.onrender.com/api";

export const sampleFiles = [
  {
    id: "demo-1",
    filename: "Krishna_Resume_v2.pdf",
    size: 84282,
    mimetype: "application/pdf",
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 6 * 86400000).toISOString(),
    shareableLink: "https://cloud-file-sharing-url.onrender.com/api/files/demo-1"
  },
  {
    id: "demo-2",
    filename: "project-assets.zip",
    size: 2180000,
    mimetype: "application/zip",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    expiresAt: new Date(Date.now() + 3 * 86400000).toISOString(),
    shareableLink: "https://cloud-file-sharing-url.onrender.com/api/files/demo-2"
  }
];
