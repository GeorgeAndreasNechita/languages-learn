import json
import re
import os
import deepl  # Offizielle Library

# Arbeitsverzeichnis auf das Script setzen
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# DEIN API KEY HIER EINTRAGEN
AUTH_KEY = "8f8dc852-9f76-e5aa-7ca4-05c80f51248e:fx"
translator = deepl.Translator(AUTH_KEY)


def translate_entry(entry):
    """Übersetzt den englischen Text in alle Zielsprachen (ES, DE, IT) und entfernt Zeilenumbrüche."""
    # Zeilenumbrüche entfernen und führende/trailing Leerzeichen
    text_to_translate = entry["en"].replace("\n", " ").strip()
    entry["en"] = text_to_translate  # auch im Originaltext bereinigen

    target_langs = {
        "es": "ES",
        "de": "DE",
        "it": "IT"
    }

    for key, lang_code in target_langs.items():
        try:
            result = translator.translate_text(
                text_to_translate,
                source_lang="EN",
                target_lang=lang_code
            )
            # Übersetzungen ebenfalls bereinigen
            entry[key] = result.text.replace("\n", " ").strip()
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
        id_simple = 1
        group_id = "2"

        print("Starte Übersetzung... das kann einen Moment dauern.")

        for segment in segments:
            # Zeilenumbrüche im Originaltext entfernen
            clean_segment = segment.replace("\n", " ").strip()

            entry_simple = {
                "en": clean_segment,  # Input Englisch ohne \n
                "es": "",
                "de": "",
                "it": "",
                "group": group_id,
                "id": id_simple
            }

            simple_list.append(translate_entry(entry_simple))
            print(f"Fortschritt: {id_simple} Sätze verarbeitet...", end="\r")
            id_simple += 1

        # JSON speichern
        with open('story_simple.json', 'w', encoding='utf-8') as f:
            json.dump(simple_list, f, ensure_ascii=False, indent=2)

        print(f"\nErfolg!")
        print(f"- Einfache Version: {len(simple_list)} Einträge")

    except FileNotFoundError:
        print(f"Datei {input_file} nicht gefunden.")


if __name__ == "__main__":
    process_story('story.txt')