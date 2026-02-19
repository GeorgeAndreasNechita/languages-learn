import json
import re
import os
import deepl # Offizielle Library

os.chdir(os.path.dirname(os.path.abspath(__file__)))

# DEIN API KEY HIER EINTRAGEN
AUTH_KEY = "8f8dc852-9f76-e5aa-7ca4-05c80f51248e:fx" 
translator = deepl.Translator(AUTH_KEY)

def translate_entry(entry):
    """Übersetzt den spanischen Text in alle Zielsprachen."""
    text_to_translate = entry["es"]
    
    # Sprachen: en, de, it, ro
    # Hinweis: DeepL nutzt "EN-US" oder "EN-GB", "RO" für Rumänisch etc.
    target_langs = {
        "en": "EN-US",
        "de": "DE",
        "it": "IT",
        "ro": "RO"
    }

    for key, lang_code in target_langs.items():
        try:
            result = translator.translate_text(text_to_translate, source_lang="ES", target_lang=lang_code)
            entry[key] = result.text
        except Exception as e:
            print(f"Fehler bei Übersetzung ({lang_code}): {e}")
            entry[key] = "ERROR"
    
    return entry

def process_story(input_file):
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            text = f.read()

        # Trennen an Satzzeichen
        segments = [s.strip() for s in re.split(r'[.,:;?!]', text) if s.strip()]

        simple_list = []
        incremental_list = []
        
        id_simple = 1
        id_incr = 1
        group_id = "2"

        print("Starte Übersetzung... das kann einen Moment dauern.")

        for segment in segments:
            # --- Version 1: Einfach ---
            entry_simple = {
                "es": segment,
                "en": "", "de": "", "it": "", "ro": "",
                "group": group_id,
                "id": id_simple
            }
            # Übersetzung aufrufen
            simple_list.append(translate_entry(entry_simple))
            id_simple += 1

            # --- Version 2: Inkrementell ---
            words = segment.split()
            for i in range(1, len(words) + 1):
                phrase = " ".join(words[:i])
                entry_incr = {
                    "es": phrase,
                    "en": "", "de": "", "it": "", "ro": "",
                    "group": group_id,
                    "id": id_incr
                }
                # Übersetzung aufrufen
                incremental_list.append(translate_entry(entry_incr))
                id_incr += 1
                print(f"Fortschritt: {id_incr} Phrasen verarbeitet...", end="\r")

        # Speichern
        with open('story_simple.json', 'w', encoding='utf-8') as f:
            json.dump(simple_list, f, ensure_ascii=False, indent=2)

        with open('story_incremental.json', 'w', encoding='utf-8') as f:
            json.dump(incremental_list, f, ensure_ascii=False, indent=2)

        print(f"\nErfolg!")
        print(f"- Einfache Version: {len(simple_list)} Einträge")
        print(f"- Inkrementelle Version: {len(incremental_list)} Einträge")

    except FileNotFoundError:
        print(f"Datei {input_file} nicht gefunden.")

if __name__ == "__main__":
    process_story('story2.txt')