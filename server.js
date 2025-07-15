const express = require("express");
const multer = require("multer");
const app = express();
const upload = multer();
app.use(express.json());
app.use(express.static("public"));

// Upload CV and role details
app.post("/upload-cv", upload.none(), (req, res) => {
  const cvText = req.body.cvText || "CV text here";
  const desiredRole = req.body.role || "Project Manager";
  const roleLevel = req.body.level || "Mid";

  const skills = ["Leadership", "Communication", "Remote tools"];
  const experience = "2+ years";

  res.json({
    message: "CV processed.",
    role: desiredRole,
    level: roleLevel,
    skills,
    experience
  });
});

// Generate cover letter
app.post("/generate-cover", (req, res) => {
  const { role, level, company } = req.body;
  const letter = `Dear ${company},\n\nI am excited to apply for the ${role} role at the ${level} level. My experience and passion align perfectly with your goals.\n\nSincerely,\nIkponmwosa`;
  res.send(letter);
});

// Track applied jobs
let appliedJobs = [];
app.post("/track", (req, res) => {
  const { jobTitle, company } = req.body;
  appliedJobs.push({ jobTitle, company, date: new Date() });
  res.json({ message: "Application tracked", appliedJobs });
});

// Send application
app.get("/apply", (req, res) => {
  res.send("📩 Application sent!");
});

app.listen(3000, () => {
  console.log("CareerAI MVP running...");
});
