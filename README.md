# 🎬 Custom Subtitles for Netflix

A Chrome extension that allows you to load and display custom subtitle files (.srt) on Netflix videos with advanced timing and formatting controls.

![Version](https://img.shields.io/badge/version-1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Chrome](https://img.shields.io/badge/browser-Chrome-yellow.svg)

## ✨ Features

- 📁 **Load Custom Subtitles** - Support for .srt subtitle files
- ⏱️ **Timing Control** - Adjust subtitle delay/sync in real-time
- 🔤 **Font Customization** - Variable font size (12px - 72px)
- 🌍 **Encoding Support** - Automatic detection of Windows-1251 and UTF-8 encoding
- 🎯 **Smart Positioning** - Automatic overlay positioning on Netflix player
- 💾 **Persistent Settings** - Remembers your preferences across sessions
- 🚀 **Real-time Updates** - Instant application of timing and font changes

## 🚀 Installation

### Prerequisites
- Google Chrome browser (or Chromium-based browser)
- Developer mode enabled in Chrome

### Steps

1. **Download the Extension**
   ```bash
   git clone https://github.com/yourusername/netflix_subtitles_extension.git
   # or download as ZIP and extract
   ```

2. **Enable Developer Mode**
   - Open Chrome and navigate to `chrome://extensions/`
   - Toggle "Developer mode" in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked"
   - Select the `netflix_subtitles_extension` folder
   - The extension icon should appear in your toolbar

4. **Grant Permissions**
   - The extension will request permissions for:
     - Access to Netflix websites
     - Local storage for settings
     - Script injection for subtitle display

## 📖 Usage

### Loading Subtitles

1. **Navigate to Netflix** and start playing any video
2. **Click the extension icon** in your Chrome toolbar
3. **Select a subtitle file** using the file picker (.srt format)
4. **Subtitles will automatically appear** on the video

### Adjusting Settings

#### Timing Control
- Use the **Delay (ms)** input to sync subtitles with audio
- Positive values delay subtitles
- Negative values advance subtitles
- Changes apply instantly

#### Font Size
- Use the **Font Size** slider (12px - 72px)
- Real-time preview of size changes
- Optimized for readability at all sizes

### Example SRT Format
```srt
1
00:00:01,000 --> 00:00:04,000
Hello, this is the first subtitle.

2
00:00:05,500 --> 00:00:08,000
This is the second subtitle line.
```

## 🛠️ Technical Specifications

### Supported Formats
- **Subtitle Files**: .srt (SubRip Subtitle)
- **Encoding**: UTF-8, Windows-1251 (Cyrillic)
- **Browsers**: Chrome 88+, Edge 88+

### Permissions Required
- `scripting` - Inject subtitle display scripts
- `storage` - Save user preferences
- `activeTab` - Access current Netflix tab
- `host_permissions` - Netflix domain access

### Manifest Version
- Uses **Manifest V3** (latest Chrome extension standard)
- Content Security Policy compliant

## 📁 Project Structure

```
netflix_subtitles_extension/
├── manifest.json          # Extension configuration
├── content.js            # Main subtitle logic
├── popup.html           # Extension popup interface
├── popup.js             # Popup functionality
├── icon.png             # Extension icon
└── README.md            # This file
```

### File Descriptions

- **`manifest.json`** - Extension metadata and permissions
- **`content.js`** - Handles subtitle parsing, display, and timing
- **`popup.html`** - User interface for file selection and settings
- **`popup.js`** - Manages popup interactions and Chrome API calls
- **`icon.png`** - Extension icon (16x16, 48x48, 128x128)

## 🔧 Development

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/netflix_subtitles_extension.git
   cd netflix_subtitles_extension
   ```

2. **Load in Chrome**
   - Follow installation steps above
   - Enable "Developer mode"
   - Use "Load unpacked" for development

3. **Making Changes**
   - Edit source files
   - Click "Reload" button in `chrome://extensions/`
   - Test on Netflix

### Code Architecture

- **Content Script** (`content.js`) - Runs on Netflix pages
- **Popup Script** (`popup.js`) - Handles user interface
- **Message Passing** - Communication between popup and content script
- **Storage API** - Persistent user settings

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on Netflix
5. Submit a pull request

## ⚠️ Known Limitations

- **Netflix Only** - Works exclusively on Netflix.com
- **SRT Format** - Only supports SubRip (.srt) subtitle files
- **Chrome Required** - Chrome/Chromium-based browsers only
- **Manual Loading** - Subtitles must be loaded for each video
- **Encoding Detection** - Limited automatic encoding detection

## 🐛 Troubleshooting

### Common Issues

**Subtitles not appearing?**
- Ensure you're on a Netflix video page
- Check that the subtitle file is in .srt format
- Verify the extension has necessary permissions

**Timing issues?**
- Use the delay control to sync with audio
- Check subtitle file timestamps
- Ensure video is playing when loading subtitles

**Font too small/large?**
- Adjust font size slider in popup
- Settings are saved automatically

**Encoding problems?**
- Try saving subtitle file in UTF-8 encoding
- Extension attempts Windows-1251 fallback

### Performance

- Extension uses minimal resources
- Subtitles update via `requestAnimationFrame`
- No impact on Netflix's native functionality

## 📝 File Format Support

### SRT Format Requirements
```srt
[sequence number]
[start time] --> [end time]
[subtitle text]

[blank line]
```

### Timing Format
- Format: `HH:MM:SS,mmm --> HH:MM:SS,mmm`
- Example: `00:01:30,500 --> 00:01:33,200`

## 🔒 Privacy & Security

- **No Data Collection** - Extension doesn't collect user data
- **Local Processing** - All subtitle processing happens locally
- **Minimal Permissions** - Only requests necessary permissions
- **No External Servers** - No communication with external services

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Netflix for their robust video player API
- Chrome Extensions team for Manifest V3 documentation
- SubRip format specification contributors

## 📞 Support

For issues, feature requests, or questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Provide Netflix URL and browser version when reporting bugs

---

**Note**: This extension is not affiliated with Netflix. Netflix is a trademark of Netflix, Inc. 