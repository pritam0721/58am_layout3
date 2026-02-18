const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data file path
const DATA_FILE = path.join(__dirname, "data.json");

// Helper to read data
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    return { blogs: [], caseStudies: [] };
  }
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

// Helper to write data
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Initial Data Loading (if file doesn't exist, create it with some defaults or empty)
if (!fs.existsSync(DATA_FILE)) {
  const initialData = {
    blogs: [
      {
        id: 1,
        title: "Top 5 Lead Generation Trends Dominating 2026",
        category: "Lead Generation",
        date: "Feb 15, 2026",
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
        content:
          "Discover how AI-powered personalization, conversational marketing, and intent data are reshaping the B2B lead generation landscape this year.",
      },
      {
        id: 2,
        title: "Navigating GDPR: A Complete Guide for UK Businesses",
        category: "Compliance",
        date: "Feb 10, 2026",
        image:
          "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80",
        content:
          "Everything you need to know about data protection regulations when outsourcing your telemarketing operations to ensure full compliance.",
      },
    ],
    caseStudies: [
      {
        id: 1,
        title: "Scaling Sales for a UK Fintech Startup",
        tag: "B2B Lead Gen",
        image:
          "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=600&q=80",
        description:
          "How we helped a London-based Fintech company triple their qualified leads in just 3 months through targeted LinkedIn outreach.",
        stats: [
          { value: "300%", label: "Lead Increase" },
          { value: "£2M+", label: "Pipeline Value" },
        ],
      },
    ],
  };
  writeData(initialData);
}

// Routes
app.get("/api/blogs", (req, res) => {
  const data = readData();
  res.json(data.blogs);
});

app.post("/api/blogs", (req, res) => {
  const data = readData();
  const newBlog = {
    id: Date.now(),
    ...req.body,
  };
  data.blogs.unshift(newBlog); // Add to beginning
  writeData(data);
  res.json(newBlog);
});

app.get("/api/case-studies", (req, res) => {
  const data = readData();
  res.json(data.caseStudies);
});

app.post("/api/case-studies", (req, res) => {
  const data = readData();
  const newCaseStudy = {
    id: Date.now(),
    ...req.body,
  };
  data.caseStudies.unshift(newCaseStudy);
  writeData(data);
  res.json(newCaseStudy);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
