import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/words", (req, res) => {
  res.json({"es":"de", "en":"of", "de":"von", "it":"di", "ro":"de", "level": "1", "read": false});
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
