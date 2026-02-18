import { useEffect, useState } from "react";
import "./App.css";

interface Word {
  id: number;
  es: string;
  en: string;
  de: string;
  it: string;
  ro: string;
  group: string;
  read: boolean;
}

function App() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState(
    localStorage.getItem("vocab-theme") || "dark",
  );
  const [lang1, setLang1] = useState(
    localStorage.getItem("vocab-lang1") || "es",
  );
  const [lang2, setLang2] = useState(
    localStorage.getItem("vocab-lang2") || "de",
  );
  const [wordsLevel, setWordsLevel] = useState(
    localStorage.getItem("vocab-level") || "1",
  );

  // Fetch when level changes
  useEffect(() => {
    fetchData();
  }, [wordsLevel]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("vocab-theme", theme);
  }, [theme]);

  async function fetchData() {
    try {
      setLoading(true);

      const res = await fetch(`/words?group=${wordsLevel}`);
      const data = await res.json();

      setWords(data);
    } catch (err) {
      console.error("Fehler beim Laden:", err);
    } finally {
      setLoading(false);
    }
  }

  function saveSettings(src: string, lang2: string, level: string) {
    localStorage.setItem("vocab-lang1", src);
    localStorage.setItem("vocab-lang2", lang2);
    localStorage.setItem("vocab-level", level);
  }

  function swapLanguages() {
    const newSrc = lang2;
    const newTarget = lang1;
    setLang1(newSrc);
    setLang2(newTarget);
    saveSettings(newSrc, newTarget, wordsLevel);
  }

  function removeWord(id: number) {
    setWords((prev) => {
      const updated = prev.filter((word) => word.id !== id);

      // Wenn keine Wörter mehr da sind → neu laden
      if (updated.length === 0) {
        fetchData();
      }

      return updated;
    });
  }

  return (
    <div className="container">
      <div className="header-flex">
        <h2>Vocab Trainer</h2>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          🌓
        </button>
      </div>

      <div className="controls">
        <select
          value={lang1}
          onChange={(e) => {
            setLang1(e.target.value);
            saveSettings(e.target.value, lang2, wordsLevel);
          }}
        >
          <option value="es">🇪🇸 Spanish</option>
          <option value="de">🇩🇪 German</option>
          <option value="en">🇬🇧 English</option>
          <option value="it">🇮🇹 Italian</option>
          <option value="ro">🇷🇴 Romanian</option>
        </select>

        <button className="swap-btn" onClick={swapLanguages}>⇄</button>

        <select
          value={lang2}
          onChange={(e) => {
            setLang2(e.target.value);
            saveSettings(lang1, e.target.value, wordsLevel);
          }}
        >
          <option value="es">🇪🇸 Spanish</option>
          <option value="de">🇩🇪 German</option>
          <option value="en">🇬🇧 English</option>
          <option value="it">🇮🇹 Italian</option>
          <option value="ro">🇷🇴 Romanian</option>
        </select>

        <select
        className="words-select"
          value={wordsLevel}
          onChange={(e) => {
            setWordsLevel(e.target.value);
            saveSettings(lang1, lang2, e.target.value);
          }}
        >
          <option value="1">1 Word</option>
          <option value="2">2 Words</option>
          <option value="3">3 Words</option>
          <option value="4">4 Words</option>
          <option value="5">5 Words</option>
          <option value="6">6 Words</option>
        </select>
      </div>

      {loading && <div className="status">Lade Daten...</div>}

      {words.map((item) => (
        <div key={item.id} className="table-row">
          <div className="word-lang1">{(item as any)[lang1] || "---"}</div>
          <div className="word-lang2">
            {(item as any)[lang2] || "---"}
          </div>
          <button onClick={() => removeWord(item.id)}>🗑️</button>
        </div>
      ))}
    </div>
  );
}

export default App;
