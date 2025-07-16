# Netflix Custom Subtitles Extension

A Chrome extension that enables loading custom .srt subtitle files on Netflix with advanced timing, styling, and positioning controls.

## 📂 Directory Structure

```
extension/
├── manifest.json                    # Extension manifest
├── content.js                      # Main extension logic  
├── popup.html                      # Extension popup interface
├── popup.js                        # Popup functionality
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
├── ready-for-publishing.md         # Publishing status
└── KEYBOARD_SHORTCUTS.md           # Keyboard shortcuts reference
```

## 🚀 Installation

### Option 1: From GitHub Repository (Recommended)
1. Download this repository:
   - Click "Code" → "Download ZIP" on the main GitHub page
   - Or clone: `git clone https://github.com/spectatora/netflix_subtitles_extension.git`
2. Extract the files (if downloaded as ZIP)
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode" (toggle in top-right corner)
5. Click "Load unpacked" and select the `extension/` folder
6. The extension icon will appear in your Chrome toolbar

### Option 2: Chrome Web Store (Coming Soon)
The extension is currently under review for the Chrome Web Store. Once approved, you'll be able to install it with a single click.

For detailed installation instructions with screenshots, visit our [Installation Guide](https://spectatora.github.io/netflix_subtitles_extension/installation-guide/).

## 💻 Development

### File Structure
- **`content.js`** - Core extension logic, subtitle parsing and display
- **`popup.html/popup.js`** - User interface and settings management
- **`manifest.json`** - Extension configuration and permissions

### Making Changes
1. Edit the relevant files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes on Netflix

### Debug Mode
- Open Chrome DevTools (F12) on Netflix pages to see console logs
- Use the extension popup to test settings changes
- Check the background page console for extension-level debugging

## ✨ Features

### Core Functionality
- Load custom .srt subtitle files
- Real-time timing adjustments (±250ms increments)
- Multiple encoding support (UTF-8, Windows-1251)
- Multi-language subtitle switching

### Visual Customization
- 7 genre-specific style presets (Horror, Comedy, Drama, Action, Sci-Fi, Documentary, Romance)
- Custom colors, fonts, and sizes (12px-72px)
- Background opacity and color controls
- Text shadow and blur effects
- Live preview of all changes

### Advanced Positioning
- 9 preset positions (3×3 grid)
- Fine-tuning with pixel-perfect offset controls
- Text alignment options (left, center, right)
- Fullscreen mode support

### Keyboard Shortcuts
- **`C`** - Toggle subtitles on/off
- **`G/H`** - Adjust timing (±250ms)
- **`S/Shift+S`** - Increase/decrease font size
- **`V`** - Switch between loaded subtitle files
- **`P`** - Cycle through genre presets
- **`R`** - Reset timing to 0ms
- **`Shift+?`** - Show help overlay

## 🛠️ Technical Details

### Permissions Required
- **`storage`** - Save user preferences and settings locally
- **`activeTab`** - Access the current Netflix tab
- **`host_permissions`** - Limited access to Netflix.com domains

### Browser Compatibility
- Chrome 88+ (Manifest V3 compliant)
- Chromium-based browsers (Edge, Brave, etc.)

### File Format Support
- **Subtitle Format**: .srt (SubRip Subtitle)
- **Encoding**: UTF-8, Windows-1251 (automatic detection)
- **Timing Format**: `HH:MM:SS,mmm --> HH:MM:SS,mmm`

## 🔧 Troubleshooting

### Common Issues

**Extension not appearing?**
- Ensure Developer mode is enabled in `chrome://extensions/`
- Check that all required files are present in the folder
- Verify the manifest.json is valid

**Subtitles not showing?**
- Make sure you're on a Netflix video page (not browsing)
- Check that the subtitle file is in .srt format
- Verify the file encoding (try UTF-8 if having issues)

**Timing issues?**
- Use the timing controls (G/H keys) during dialogue scenes
- Adjust delay in the popup interface
- Check subtitle file timestamps for accuracy

**Performance issues?**
- The extension uses minimal resources
- Disable other extensions if conflicts occur
- Refresh the Netflix page if problems persist

## 📋 Publishing Checklist

Before publishing updates:
- [ ] Test on multiple Netflix titles
- [ ] Verify all keyboard shortcuts work
- [ ] Check theme switching functionality
- [ ] Test subtitle file encoding detection
- [ ] Validate manifest.json syntax
- [ ] Update version number
- [ ] Create release notes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes in the `extension/` directory
4. Test thoroughly on Netflix
5. Commit with descriptive messages
6. Submit a pull request

## 📄 License

MIT License - see the main repository LICENSE file for details.

## 🔗 Links

- **Website**: [spectatora.github.io/netflix_subtitles_extension](https://spectatora.github.io/netflix_subtitles_extension)
- **GitHub Repository**: [github.com/spectatora/netflix_subtitles_extension](https://github.com/spectatora/netflix_subtitles_extension)
- **Report Issues**: [GitHub Issues](https://github.com/spectatora/netflix_subtitles_extension/issues)

---

**Note**: This extension is not affiliated with Netflix. Netflix is a trademark of Netflix, Inc. 