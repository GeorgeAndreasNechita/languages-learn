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
  const filePath = path.join(__dirname, "data","words", `w${group}.json`);

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
  const filePath = path.join(__dirname, "data","articles", `a${group}.json`);

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

app.get("/api/feedback", (req, res) => {
    // Wir nehmen einfach die erste Datei aus deinem words-Ordner als Test-Target
    const filePath = path.join(__dirname, "feedback.json");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Fehler beim Lesen" });

        try {
            const json = JSON.parse(data);
            
            // Ein neues Test-Objekt hinzufügen
            const newEntry = { 
                id: Date.now(), 
                word: "Test-Eintrag", 
                timestamp: new Date().toISOString() 
            };
            
            json.push(newEntry);

            // Datei überschreiben
            fs.writeFile(filePath, JSON.stringify(json, null, 2), (writeErr) => {
                if (writeErr) return res.status(500).json({ error: "Fehler beim Schreiben" });
                res.json({ message: "Erfolgreich hinzugefügt!", added: newEntry });
            });
        } catch (e) {
            res.status(500).json({ error: "JSON-Format ungültig" });
        }
    });
});


app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

