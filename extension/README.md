# Netflix Custom Subtitles Extension

Този директорий съдържа Chrome extension файловете за Netflix Custom Subtitles.

## Структура

```
extension/
├── manifest.json                    # Extension manifest
├── content.js                      # Main extension logic  
├── popup.html                      # Extension popup interface
├── popup.js                        # Popup functionality
├── netflix-subtitles-extension.zip # Ready-to-install package
├── icons/                          # Extension icons
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
├── assets/
│   └── chrome-store/               # Chrome Web Store assets
│       ├── icons/
│       ├── screenshots/
│       └── promotional/
├── chrome-store-listing.md         # Store listing content
├── packaging-checklist.md          # Publishing checklist
├── chrome-store-assets-guide.md    # Assets guide
└── ready-for-publishing.md         # Publishing status
```

## Инсталиране

### От готовия пакет
1. Изтеглете `netflix-subtitles-extension.zip`
2. Отворете Chrome и отидете на `chrome://extensions/`
3. Включете "Developer mode"
4. Натиснете "Load unpacked" и изберете разархивираната директория

### От сорс кода
1. Клонирайте репозиторието
2. Отворете Chrome и отидете на `chrome://extensions/`
3. Включете "Developer mode"
4. Натиснете "Load unpacked" и изберете `extension/` директорията

## Разработка

Всички промени се правят директно в:
- `content.js` - основна логика
- `popup.html/popup.js` - UI интерфейс
- `manifest.json` - конфигурация

След промени, освежете extension-а от `chrome://extensions/`. 