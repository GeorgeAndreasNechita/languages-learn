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
        description: "Learning numbers and quantities for everyday life.",
        image: "vite1.svg",
      },
      {
        id: "schule",
        title: "Schule",
        description: "Vocabulary for lessons, subjects, and everyday school life.",
        image: "https://via.placeholder.com/360x220.png?text=Schule",
      },
      {
        id: "arbeit",
        title: "Arbeit",
        description: "Work-related topics, the workplace, and conversations at work.",
        image: "https://via.placeholder.com/360x220.png?text=Arbeit",
      },
      {
        id: "familie",
        title: "Familie",
        description: "Family relationships and personal conversations.",
        image: "https://via.placeholder.com/360x220.png?text=Familie",
      },
      {
        id: "reisen",
        title: "Reisen",
        description: "Vocabulary for when you're on the go, on the train, at the airport, and at the hotel.",
        image: "https://via.placeholder.com/360x220.png?text=Reisen",
      },
      {
        id: "essen",
        title: "Essen",
        description: "Dining out, groceries, and favorite dishes.",
        image: "https://via.placeholder.com/360x220.png?text=Essen",
      },
      {
        id: "gesundheit",
        title: "Gesundheit",
        description: "The Body, Illness, and Medical Terms.",
        image: "https://via.placeholder.com/360x220.png?text=Gesundheit",
      },
      {
        id: "einkaufen",
        title: "Einkaufen",
        description: "Stores, prices, and grocery shopping.",
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
          <h1>Topics for Language Learning</h1>
          <p>Select a topic to build your vocabulary in a targeted way.</p>
        </div>
      </section>

      <section className="topics-grid">
        {topics.map((topic) => (
          <article key={topic.id} className="topic-card">
            <img className="topic-image" src={topic.image} alt={topic.title} />
            <div className="topic-content">
              <h3>{topic.title}</h3>
              <p className="topic-description">{topic.description}</p>
              <button type="button">Choose topics</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
