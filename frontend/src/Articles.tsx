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
  const [srcLang, setSrcLang] = useState(
    localStorage.getItem("vocab-src") || "es",
  );
  const [targetLang, setTargetLang] = useState(
    localStorage.getItem("vocab-target") || "de",
  );
  const [levelFilter, setLevelFilter] = useState(
    localStorage.getItem("vocab-level") || "1",
  );

  // Fetch when level changes
  useEffect(() => {
    fetchData();
  }, [levelFilter]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("vocab-theme", theme);
  }, [theme]);

  async function fetchData() {
    try {
      setLoading(true);

      const res = await fetch(`/articles?group=${levelFilter}`);
      const data = await res.json();

      setWords(data);
    } catch (err) {
      console.error("Fehler beim Laden:", err);
    } finally {
      setLoading(false);
    }
  }

  function saveSettings(src: string, target: string, level: string) {
    localStorage.setItem("vocab-src", src);
    localStorage.setItem("vocab-target", target);
    localStorage.setItem("vocab-level", level);
  }

  function swapLanguages() {
    const newSrc = targetLang;
    const newTarget = srcLang;
    setSrcLang(newSrc);
    setTargetLang(newTarget);
    saveSettings(newSrc, newTarget, levelFilter);
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
          value={srcLang}
          onChange={(e) => {
            setSrcLang(e.target.value);
            saveSettings(e.target.value, targetLang, levelFilter);
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
          value={targetLang}
          onChange={(e) => {
            setTargetLang(e.target.value);
            saveSettings(srcLang, e.target.value, levelFilter);
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
          value={levelFilter}
          onChange={(e) => {
            setLevelFilter(e.target.value);
            saveSettings(srcLang, targetLang, e.target.value);
          }}
        >
          <option value="1">First Article</option>
        </select>
      </div>

      {loading && <div className="status">Lade Daten...</div>}

      {words.map((item) => (
        <div key={item.id} className="table-row">
          <div className="word-src">{(item as any)[srcLang] || "---"}</div>
          <div className="word-target">
            {(item as any)[targetLang] || "---"}
          </div>
          <button onClick={() => removeWord(item.id)}>🗑️</button>
        </div>
      ))}
    </div>
  );
}

export default App;
