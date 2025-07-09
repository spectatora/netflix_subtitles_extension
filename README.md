# 🎬 Custom Subtitles for Netflix

A Chrome extension that allows you to load and display custom subtitle files (.srt) on Netflix videos with advanced timing and formatting controls.

![Version](https://img.shields.io/badge/version-1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Chrome](https://img.shields.io/badge/browser-Chrome-yellow.svg)

## ✨ Features

### 📁 **Subtitle Management**
- **Load Custom Subtitles** - Support for .srt subtitle files
- **Encoding Support** - Automatic detection of Windows-1251 and UTF-8 encoding
- **Timing Control** - Adjust subtitle delay/sync in real-time
- **Real-time Updates** - Instant application of all changes

### 🎨 **Visual Customization**
- **Theme Switcher** - Light/Dark mode for the popup interface
- **Genre Presets** - Pre-configured styles for Horror, Comedy, Drama, Action, Sci-Fi, Documentary, Romance
- **Text Styling** - Custom colors, 7 font families, variable font size (12px-72px)
- **Background Control** - Customizable background color and opacity (0-100%)
- **Text Effects** - Adjustable shadow color and blur intensity
- **Live Preview** - Real-time preview of all styling changes

### 📍 **Advanced Positioning**
- **9 Position Presets** - Top/Center/Bottom × Left/Center/Right positioning
- **Fine-tuning** - Precise vertical and horizontal offset controls
- **Text Alignment** - Left, center, or right text alignment

### ⌨️ **Keyboard Shortcuts** *(NEW!)*
- **Toggle Subtitles** - Press `C` to instantly turn subtitles on/off
- **Timing Control** - Use `G` and `H` to adjust timing by ±250ms steps
- **Font Size Control** - `S` and `Shift+S` to increase/decrease font size
- **Language Switching** - Press `V` to cycle through loaded subtitle files
- **Preset Cycling** - `P` to quickly switch between genre style presets
- **Quick Reset** - `R` to reset timing back to 0ms
- **Help Overlay** - `Shift+/` to display all shortcuts on screen
- **Smart Notifications** - Visual feedback for all keyboard actions
- **Fullscreen Support** - All shortcuts work in both normal and fullscreen modes

### ⚡ **Professional Features**
- **Custom CSS** - Advanced styling with custom CSS support
- **Export/Import** - Save and share your subtitle configurations
- **Settings Reset** - One-click reset to default settings
- **Persistent Settings** - Remembers all preferences across sessions
- **Smart Navigation** - Handles Netflix's single-page application navigation
- **Multi-Language Support** - Load and switch between multiple subtitle files

## 🚀 Installation

### Prerequisites
- Google Chrome browser (or Chromium-based browser)
- Developer mode enabled in Chrome

### Steps

1. **Download the Extension**
   ```bash
   git clone https://github.com/spectatora/netflix_subtitles_extension.git
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

### Getting Started

1. **Navigate to Netflix** and start playing any video
2. **Click the extension icon** in your Chrome toolbar
3. **Select a subtitle file** using the file picker (.srt format)
4. **Subtitles will automatically appear** on the video

### Interface Overview

The extension features a modern tabbed interface with five main sections:

#### 📁 **Files Tab**
- **Upload Subtitles**: Select .srt files from your device
- **Timing Sync**: Adjust delay in milliseconds for perfect audio sync
- **File Status**: View currently loaded subtitle file

#### 🎨 **Style Tab**
- **Genre Presets**: One-click styling for different movie genres:
  - 🎃 **Horror**: Dark red text with spooky shadows
  - 😄 **Comedy**: Bright yellow text with playful fonts
  - 🎭 **Drama**: Elegant cream text with subtle styling
  - 💥 **Action**: Cyan text with intense effects
  - 🚀 **Sci-Fi**: Green matrix-style text with glow
  - 📚 **Documentary**: Clean, professional white text
  - 💕 **Romance**: Pink text with romantic styling
- **Text Appearance**: Customize color, size (12px-72px), and font family
- **Background**: Control background color and opacity (0-100%)
- **Text Effects**: Adjust shadow color and blur intensity
- **Live Preview**: See your changes in real-time

#### 📍 **Position Tab**
- **Screen Position**: Choose from 9 preset positions
- **Fine Positioning**: Precise vertical/horizontal offset controls
- **Text Alignment**: Left, center, or right alignment

#### ⌨️ **Shortcuts Tab** *(NEW!)*
- **Enable/Disable**: Toggle keyboard shortcuts on/off
- **Shortcuts Reference**: Complete list of all available shortcuts
- **Quick Actions**: Test shortcuts and show help overlay
- **Language Management**: View loaded subtitle files and active language
- **Conflict Prevention**: Disable if shortcuts interfere with other extensions

#### ⚙️ **Advanced Tab**
- **Custom CSS**: Add advanced styling with custom CSS code
- **Export Settings**: Save your configurations as JSON files
- **Import Settings**: Load previously saved configurations
- **Reset**: Return all settings to defaults

### ⌨️ Keyboard Shortcuts Usage

The extension now includes powerful keyboard shortcuts for hands-free control:

#### **Core Shortcuts**
| Key | Action | Description |
|-----|--------|-------------|
| `C` | Toggle subtitles | Turn subtitles on/off instantly |
| `G` | Timing -250ms | Move subtitles backward in time |
| `H` | Timing +250ms | Move subtitles forward in time |
| `S` | Increase font size | Make subtitles larger (+2px) |
| `Shift+S` | Decrease font size | Make subtitles smaller (-2px) |

#### **Advanced Shortcuts**
| Key | Action | Description |
|-----|--------|-------------|
| `V` | Switch language | Cycle through loaded subtitle files |
| `R` | Reset timing | Reset timing offset back to 0ms |
| `P` | Cycle presets | Switch between genre style presets |
| `Shift+/` | Show help | Display shortcuts overlay on screen |

#### **Pro Tips**
- **Sync Like a Pro**: Use `G`/`H` during quiet scenes to perfectly align subtitles
- **Quick Styling**: Press `P` to cycle through optimized genre presets
- **Multi-Language**: Load multiple files and use `V` to switch languages
- **Need Help?**: Press `Shift+/` to see all shortcuts overlaid on the video

### Theme Switching

Toggle between light and dark themes using the button in the header:
- 🌙 **Dark Mode**: Better for nighttime viewing
- ☀️ **Light Mode**: Clean, bright interface

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
- **Browsers**: Chrome 88+, Edge 88+, Chromium-based browsers
- **Themes**: Light/Dark mode with CSS custom properties
- **Export Format**: JSON configuration files

### Advanced Features
- **CSS Variables**: Dynamic theming system
- **Genre Presets**: 7 predefined styling configurations
- **Custom CSS**: Advanced styling with CSS injection
- **Settings Management**: Export/Import with JSON validation
- **Real-time Preview**: Live subtitle styling preview
- **Position Matrix**: 9-point positioning system with fine-tuning

### Permissions Required
- `scripting` - Inject subtitle display scripts
- `storage` - Save user preferences and settings
- `activeTab` - Access current Netflix tab
- `host_permissions` - Netflix domain access

### Manifest Version
- Uses **Manifest V3** (latest Chrome extension standard)
- Content Security Policy compliant
- Enhanced message passing for real-time updates

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
- **`content.js`** - Subtitle parsing, display, positioning, and custom CSS injection
- **`popup.html`** - Modern tabbed interface with theming and advanced controls
- **`popup.js`** - Complete settings management, genre presets, and theme switching
- **`icon.png`** - Extension icon (16x16, 48x48, 128x128)

### Code Architecture

- **Theme System**: CSS custom properties for light/dark mode switching
- **Genre Presets**: Predefined configurations for different movie types
- **Message Passing**: Enhanced communication between popup and content script
- **Settings Storage**: Comprehensive preference management with export/import
- **Custom CSS Engine**: Safe CSS injection with property validation
- **Position Engine**: 9-point positioning matrix with offset fine-tuning

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