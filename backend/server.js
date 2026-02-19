import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /words Route liest die JSON-Datei
app.get("/api/words", (req, res) => {
  const group = req.query.group;
  const filePath = path.join(__dirname, "data", `g${group}.json`);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).json({ error: "Datei nicht gefunden" });
    }

    try {
      const words = JSON.parse(data);

      if (!Array.isArray(words)) {
        return res.status(500).json({ error: "JSON ist kein Array" });
      }
      const shuffled = [...words];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const randomWords = shuffled.slice(0, 30);

      res.json(randomWords);

    } catch (parseErr) {
      res.status(500).json({ error: "Ungültiges JSON" });
    }
  });
});
app.get("/api/articles", (req, res) => {
  const group = req.query.group;
  const filePath = path.join(__dirname, "data", `a${group}.json`);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).json({ error: "Datei nicht gefunden" });
    }

    try {
      const words = JSON.parse(data);

      if (!Array.isArray(words)) {
        return res.status(500).json({ error: "JSON ist kein Array" });
      }
      res.json(words);

    } catch (parseErr) {
      res.status(500).json({ error: "Ungültiges JSON" });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
