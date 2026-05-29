router.post(
  "/upload",
  verifyJWT,
  upload.single("file"),
  uploadFile
);