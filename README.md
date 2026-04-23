# Languages Learn

Ein Full-Stack-Anwendung zum Sprachenlernen mit React-Frontend, Node.js-Backend und Python-Datenverarbeitung.

## Struktur

- `backend/` - Node.js-Server mit Express
- `frontend/` - React-Anwendung mit TypeScript und Vite
- `docs/` - Dokumentation
- `config/` - Konfigurationsdateien (z.B. Docker-Compose)

## Entwicklung

### Voraussetzungen

- Node.js
- Python 3.x
- Podman oder Docker

### Setup

1. Repository klonen
2. Abhängigkeiten installieren:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Python-Umgebung aktivieren:
   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   pip install -r requirements.txt  # falls vorhanden
   ```
4. Anwendung starten:
   ```bash
   podman-compose up
   ```

## Features

- Wortschatz-Lernen
- Artikel-Übungen
- Themenbasierte Lektionen
- Einstellungen für Personalisierung