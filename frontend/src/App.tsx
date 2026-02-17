import { useEffect, useState, useMemo } from "react";
import Dexie from "dexie";
import type { Table } from "dexie";
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

class VocabularyDB extends Dexie {
  phrases!: Table<Word>;

  constructor() {
    super("VocabularyDB");
    this.version(1).stores({
      phrases: "id, es, en, de, it, ro, group, read",
    });
  }
}

const db = new VocabularyDB();

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
    localStorage.getItem("vocab-level") || "all",
  );

  // Init DB
  useEffect(() => {
    initDB();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("vocab-theme", theme);
  }, [theme]);

  async function initDB() {
    setLoading(true);

    try {
      const res = await fetch("/words");
      const jsonData: Word[] = await res.json();

      // Alle IDs aus DB holen
      const existingIds = await db.phrases.toCollection().primaryKeys();

      // Nur neue Wörter filtern
      const newWords = jsonData.filter(
        (word) => !existingIds.includes(word.id!),
      );

      if (newWords.length > 0) {
        await db.phrases.bulkAdd(newWords);
        console.log("Neue Wörter hinzugefügt:", newWords.length);
      }
    } catch (e) {
      console.error("Fehler beim Sync", e);
    } finally {
      setLoading(false);
    }

    loadFromDB();
  }

  async function loadFromDB() {
    const data = await db.phrases.toArray();
    setWords(data);
  }

  const filteredWords = useMemo(() => {
    return words.filter((word) => String(word.group) === levelFilter && word.read == false);
  }, [words, levelFilter]);

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

  async function markAsRead(id?: number) {
    if (!id) return;
    await db.phrases.update(id, { read: true });
    await loadFromDB();
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

        <button onClick={swapLanguages}>⇄</button>

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
          value={levelFilter}
          onChange={(e) => {
            setLevelFilter(e.target.value);
            saveSettings(srcLang, targetLang, e.target.value);
          }}
        >
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
          <option value="4">Level 4</option>
        </select>
      </div>

      {loading && <div className="status">Lade Daten...</div>}

      {filteredWords.length === 0 && !loading && (
        <p className="status">Keine Einträge gefunden.</p>
      )}

      {filteredWords.map((item) => (
        <div key={item.id} className="table-row">
          <div className="word-src">{(item as any)[srcLang] || "---"}</div>
          <div className="word-target">
            {(item as any)[targetLang] || "---"}
          </div>
          <button onClick={() => markAsRead(item.id)}>🗑️</button>
        </div>
      ))}
    </div>
  );
}

export default App;
