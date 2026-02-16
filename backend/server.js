import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/message", (req, res) => {
  res.json({ message: "Hallo vom Backend!" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
