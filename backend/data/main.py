import json
import re
import os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
def create_incremental_json(input_file, output_file):
    try:
        # 1. Datei einlesen
        with open(input_file, 'r', encoding='utf-8') as f:
            text = f.read()

        # 2. Text an den Zeichen . , : ; ? ! splitten
        # Wir behalten die Satzzeichen hier nicht im Split, 
        # außer du möchtest sie explizit dabei haben.
        raw_segments = re.split(r'[.,:;?!]', text)
        
        # Leere Segmente entfernen und Leerzeichen trimmen
        segments = [s.strip() for s in raw_segments if s.strip()]

        json_data = []
        current_id = 5  # Start-ID laut deinem Beispiel
        group_id = "2"

        # 3. Den "Incremental"-Strukturaufbau für jedes Segment (Satz) erstellen
        for segment in segments:
            words = segment.split()
            cumulative_phrase = ""
            
            for i in range(len(words)):
                if i == 0:
                    cumulative_phrase = words[i]
                else:
                    cumulative_phrase += " " + words[i]
                
                # Hier setzen wir vorerst Platzhalter für die Übersetzungen
                entry = {
                    "es": cumulative_phrase, # Hier steht aktuell der Originaltext
                    "en": "TODO",
                    "de": "TODO",
                    "it": "TODO",
                    "ro": "TODO",
                    "group": group_id,
                    "id": current_id
                }
                json_data.append(entry)
                current_id += 1

        # 4. Als JSON speichern
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(json_data, f, ensure_ascii=False, indent=2)

        print(f"Erfolgreich! {len(json_data)} Einträge in {output_file} gespeichert.")

    except FileNotFoundError:
        print("Fehler: story1.txt wurde nicht gefunden.")

# Skript ausführen
if __name__ == "__main__":
    create_incremental_json('story1.txt', 'story_incremental.json')