import json
import re
import os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
def process_story(input_file):
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            text = f.read()

        # Trennen an . , : ; ? !
        # re.split mit [] findet jedes dieser Zeichen
        segments = [s.strip() for s in re.split(r'[.,:;?!]', text) if s.strip()]

        simple_list = []
        incremental_list = []
        
        # Counter für IDs
        id_simple = 1
        id_incr = 1
        group_id = "2"

        for segment in segments:
            # --- Version 1: Einfach (Nur der ganze Satz) ---
            simple_list.append({
                "es": segment,
                "en": "", "de": "", "it": "", "ro": "",
                "group": group_id,
                "id": id_simple
            })
            id_simple += 1

            # --- Version 2: Inkrementell (Wort für Wort) ---
            words = segment.split()
            for i in range(1, len(words) + 1):
                phrase = " ".join(words[:i])
                incremental_list.append({
                    "es": phrase,
                    "en": "", "de": "", "it": "", "ro": "",
                    "group": group_id,
                    "id": id_incr
                })
                id_incr += 1

        # Speichern der einfachen Version
        with open('story_simple.json', 'w', encoding='utf-8') as f:
            json.dump(simple_list, f, ensure_ascii=False, indent=2)

        # Speichern der inkrementellen Version
        with open('story_incremental.json', 'w', encoding='utf-8') as f:
            json.dump(incremental_list, f, ensure_ascii=False, indent=2)

        print(f"Erfolg!")
        print(f"- Einfache Version: {len(simple_list)} Einträge")
        print(f"- Inkrementelle Version: {len(incremental_list)} Einträge")

    except FileNotFoundError:
        print("Datei story1.txt nicht gefunden.")

if __name__ == "__main__":
    process_story('story2.txt')