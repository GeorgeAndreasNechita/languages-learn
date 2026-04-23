import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

const topics = [
  {
    id: "numbers",
    title: "Numbers",
    description: "Learning numbers and quantities for everyday life.",
    image: "numbers.png",
  },
  {
    id: "school",
    title: "School",
    description: "Vocabulary for lessons, subjects, and everyday school life.",
    image: "https://via.placeholder.com/360x220.png?text=Schule",
  },
  {
    id: "work",
    title: "Work",
    description: "Work-related topics, the workplace, and conversations at work.",
    image: "https://via.placeholder.com/360x220.png?text=Arbeit",
  },
  {
    id: "family",
    title: "Family",
    description: "Family relationships and personal conversations.",
    image: "https://via.placeholder.com/360x220.png?text=Familie",
  },
  {
    id: "travel",
    title: "Travel",
    description: "Vocabulary for when you're on the go, on the train, at the airport, and at the hotel.",
    image: "https://via.placeholder.com/360x220.png?text=Reisen",
  },
  {
    id: "food",
    title: "Food",
    description: "Dining out, groceries, and favorite dishes.",
    image: "https://via.placeholder.com/360x220.png?text=Essen",
  },
  {
    id: "health",
    title: "Health",
    description: "The Body, Illness, and Medical Terms.",
    image: "https://via.placeholder.com/360x220.png?text=Gesundheit",
  },
  {
    id: "shopping",
    title: "Shopping",
    description: "Stores, prices, and grocery shopping.",
    image: "https://via.placeholder.com/360x220.png?text=Einkaufen",
  },
  {
    id: "hobbys",
    title: "Hobbys",
    description: "Hobbies, sports, and interests.",
    image: "https://via.placeholder.com/360x220.png?text=Hobbys",
  },
  {
    id: "nature",
    title: "Nature",
    description: "Landscapes, weather, and environmental issues.",
    image: "https://via.placeholder.com/360x220.png?text=Natur",
  },
  {
    id: "technology",
    title: "Technology",
    description: "Devices, the Internet, and modern technology.",
    image: "https://via.placeholder.com/360x220.png?text=Technik",
  },
  {
    id: "animals",
    title: "Animals",
    description: "Wildlife, pets, and visits to the zoo.",
    image: "https://via.placeholder.com/360x220.png?text=Tiere",
  },
  {
    id: "at_home",
    title: "At home",
    description: "Home, furniture, and daily routines at home.",
    image: "https://via.placeholder.com/360x220.png?text=Zuhause",
  },
  {
    id: "traffic",
    title: "Traffic",
    description: "Transportmittel, Wegbeschreibungen und Mobilität.",
    image: "https://via.placeholder.com/360x220.png?text=Verkehr",
  },
];

// __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/api/topics", (req, res) => {
  res.json(topics);
});

app.get("/api/topics/:id", (req, res) => {
  const topic = topics.find((item) => item.id === req.params.id);
  if (!topic) {
    return res.status(404).json({ error: "Topic not found" });
  }
  res.json(topic);
});

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

