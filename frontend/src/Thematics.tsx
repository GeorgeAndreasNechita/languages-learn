import { useMemo } from "react";

interface Topic {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function Thematics() {
  const topics: Topic[] = useMemo(
    () => [
      {
        id: "zahlen",
        title: "Zahlen",
        description: "Zahlen und Mengen lernen – ideal für Alltag und Einkaufen.",
        image: "https://via.placeholder.com/360x220.png?text=Zahlen",
      },
      {
        id: "schule",
        title: "Schule",
        description: "Wörter für Unterricht, Fächer und Schulalltag.",
        image: "https://via.placeholder.com/360x220.png?text=Schule",
      },
      {
        id: "arbeit",
        title: "Arbeit",
        description: "Berufliche Themen, Arbeitsplatz und Gespräche im Job.",
        image: "https://via.placeholder.com/360x220.png?text=Arbeit",
      },
      {
        id: "familie",
        title: "Familie",
        description: "Beziehungen im Familienkreis und persönliche Gespräche.",
        image: "https://via.placeholder.com/360x220.png?text=Familie",
      },
      {
        id: "reisen",
        title: "Reisen",
        description: "Vokabeln für unterwegs, im Zug, am Flughafen und im Hotel.",
        image: "https://via.placeholder.com/360x220.png?text=Reisen",
      },
      {
        id: "essen",
        title: "Essen",
        description: "Restaurantbesuche, Lebensmittel und Lieblingsgerichte.",
        image: "https://via.placeholder.com/360x220.png?text=Essen",
      },
      {
        id: "gesundheit",
        title: "Gesundheit",
        description: "Körper, Krankheit und medizinische Begriffe.",
        image: "https://via.placeholder.com/360x220.png?text=Gesundheit",
      },
      {
        id: "einkaufen",
        title: "Einkaufen",
        description: "Läden, Preise und Einkaufen im Supermarkt.",
        image: "https://via.placeholder.com/360x220.png?text=Einkaufen",
      },
      {
        id: "hobbys",
        title: "Hobbys",
        description: "Freizeit, Sport und Interessen sprechen.",
        image: "https://via.placeholder.com/360x220.png?text=Hobbys",
      },
      {
        id: "natur",
        title: "Natur",
        description: "Landschaften, Wetter und Umweltthemen.",
        image: "https://via.placeholder.com/360x220.png?text=Natur",
      },
      {
        id: "technik",
        title: "Technik",
        description: "Geräte, Internet und moderne Technologie.",
        image: "https://via.placeholder.com/360x220.png?text=Technik",
      },
      {
        id: "tiere",
        title: "Tiere",
        description: "Tierwelt, Haustiere und Zoo-Besuche.",
        image: "https://via.placeholder.com/360x220.png?text=Tiere",
      },
      {
        id: "zuhause",
        title: "Zuhause",
        description: "Wohnung, Möbel und tägliche Routinen zuhause.",
        image: "https://via.placeholder.com/360x220.png?text=Zuhause",
      },
      {
        id: "verkehr",
        title: "Verkehr",
        description: "Transportmittel, Wegbeschreibungen und Mobilität.",
        image: "https://via.placeholder.com/360x220.png?text=Verkehr",
      },
    ],
    []
  );

  return (
    <main className="thematics-page">
      <section className="thematics-header">
        <div>
          <h1>Themen für Sprachenlernen</h1>
          <p>Wähle ein Thema aus, um deinen Wortschatz gezielt aufzubauen.</p>
        </div>
      </section>

      <section className="topics-grid">
        {topics.map((topic) => (
          <article key={topic.id} className="topic-card">
            <img className="topic-image" src={topic.image} alt={topic.title} />
            <div className="topic-content">
              <h3>{topic.title}</h3>
              <p className="topic-description">{topic.description}</p>
              <button type="button">Thema wählen</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
