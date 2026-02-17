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
  const filePath = path.join(__dirname, "data", "words.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Fehler beim Lesen der Datei:", err);
      return res.status(500).json({ error: "Datei konnte nicht gelesen werden" });
    }
    try {
      const words = JSON.parse(data);
      res.json(words);
    } catch (parseErr) {
      console.error("JSON konnte nicht geparst werden:", parseErr);
      res.status(500).json({ error: "Ungültiges JSON" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
