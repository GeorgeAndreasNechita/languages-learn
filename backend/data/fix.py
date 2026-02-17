import json
import os
os.path.dirname(os.path.abspath(__file__))

# === KONFIGURATION ===
FOLDER_PATH = os.path.dirname(os.path.abspath(__file__))  # Stelle sicher, dass der Pfad stimmt

def process_json_file(filepath):
    print(f"Processing: {filepath}")
    
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        print(f"  ❌ Error reading {filepath}: {e}")
        return

    if not isinstance(data, list):
        print("  ⚠️ Not a list (JSON root must be [ ... ]) → skipped")
        return

    changed = False

    # IDs sammeln und sicherstellen, dass sie Integers sind
    existing_ids = []
    for item in data:
        if isinstance(item, dict) and "id" in item:
            try:
                existing_ids.append(int(item["id"]))
            except (ValueError, TypeError):
                continue

    max_id = max(existing_ids) if existing_ids else 0
    next_id = max_id + 1

    for item in data:
        if not isinstance(item, dict):
            continue

        # ID hinzufügen falls fehlt
        if "id" not in item:
            item["id"] = next_id
            next_id += 1
            changed = True

        # "read" hinzufügen falls fehlt
        if "read" not in item:
            item["read"] = False
            changed = True

    if changed:
        try:
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            print("  ✅ Updated")
        except Exception as e:
            print(f"  ❌ Error writing {filepath}: {e}")
    else:
        print("  ✔ Nothing to change")


def scan_folder(folder):
    # Absoluten Pfad für das Debugging anzeigen
    abs_path = os.path.abspath(folder)
    print(f"🔎 Suche in: {abs_path}")

    if not os.path.exists(abs_path):
        print(f"❌ Pfad existiert nicht!")
        return

    all_files = os.listdir(abs_path)
    print(f"📁 Dateien im Ordner gefunden: {len(all_files)}")
    
    # Filtert sowohl .json als auch .JSON
    json_files = [f for f in all_files if f.lower().endswith(".json")]
    
    if not json_files:
        print("❓ Keine .json Dateien gefunden. Hier sind die ersten 3 Dateien im Ordner:")
        print(all_files[:3])
        return

    for file in json_files:
        full_path = os.path.join(abs_path, file)
        process_json_file(full_path)

if __name__ == "__main__":
    scan_folder(FOLDER_PATH)
    print("--- Done. ---")