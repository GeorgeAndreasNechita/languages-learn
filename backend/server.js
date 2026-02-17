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
app.get("/words", (req, res) => {
  const group = req.query.group;
  const filePath = path.join(__dirname, "data", `${group}.json`);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).json({ error: "Datei nicht gefunden" });
    }

    try {
      const words = JSON.parse(data);
      res.json(words);
    } catch (parseErr) {
      res.status(500).json({ error: "Ungültiges JSON" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
