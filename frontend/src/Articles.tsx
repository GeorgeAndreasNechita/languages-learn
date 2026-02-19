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
  const [articlesLevel, setArticlesLevel] = useState(
    localStorage.getItem("vocab-articles-level") || "1",
  );

  // Fetch when level changes
  useEffect(() => {
    fetchData();
  }, [articlesLevel]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("vocab-theme", theme);
  }, [theme]);

  async function fetchData() {
    try {
      setLoading(true);

      const res = await fetch(`/api/articles?group=${articlesLevel}`);
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
    localStorage.setItem("vocab-articles-level", level);
  }

  function swapLanguages() {
    const newSrc = lang2;
    const newTarget = lang1;
    setLang1(newSrc);
    setLang2(newTarget);
    saveSettings(newSrc, newTarget, articlesLevel);
  }

  function removeWord(id: number) {
    setWords((prev) => {
      const updated = prev.filter((word) => word.id !== id);
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
            saveSettings(e.target.value, lang2, articlesLevel);
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
            saveSettings(lang1, e.target.value, articlesLevel);
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
          value={articlesLevel}
          onChange={(e) => {
            setArticlesLevel(e.target.value);
            saveSettings(lang1, lang2, e.target.value);
          }}
        >
          <option value="1">Article 1</option>
          <option value="2">Article 2</option>
          <option value="3">Article 3</option>
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
