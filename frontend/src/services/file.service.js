import { apiRequest } from "./api.js";

export async function uploadFile({ file, expiresInDays }) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("expiresInDays", expiresInDays);

  return apiRequest("/files/upload", {
    method: "POST",
    body: formData
  });
}
