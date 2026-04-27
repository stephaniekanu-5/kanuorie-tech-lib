const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📤 Upload Image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Convert buffer → base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "kanuorieTech",
      transformation: [
        { width: 800, height: 800, crop: "limit" }, // compress
        { quality: "auto" },
      ],
    });

    res.json({
      imageUrl: result.secure_url,
      public_id: result.public_id, // 👈 needed for future delete
    });
  } catch (err) {
    console.error("🔥 Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;