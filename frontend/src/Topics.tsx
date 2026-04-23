import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface Topic {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function Thematics() {
  const navigate = useNavigate();
  const topics: Topic[] = useMemo(
    () => [
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
              <button type="button" onClick={() => navigate(`/topic/${topic.id}`)}>
                Choose topic
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
