let subtitles = [];
let delay = 0;
let subtitleContainer = null;
let intervalId = null;
let customCSS = '';

// Keyboard shortcuts state variables
let subtitlesVisible = true;
let loadedLanguages = [];
let currentLanguageIndex = 0;
let timingStep = 250; // milliseconds
let fontSizeStep = 2; // pixels
let shortcutsEnabled = true;

// Default keyboard shortcuts
const DEFAULT_SHORTCUTS = {
  toggleSubtitles: 'KeyC',
  timingBackward: 'KeyG', 
  timingForward: 'KeyH',
  fontSizeIncrease: 'KeyS',
  fontSizeDecrease: 'ShiftKeyS',
  switchLanguage: 'KeyV',
  resetTiming: 'KeyR',
  cyclePresets: 'KeyP',
  showHelp: 'Slash'
};

let currentShortcuts = { ...DEFAULT_SHORTCUTS };

// Default styling settings - will be updated from popup
let subtitleSettings = {
  fontSize: 32,
  textColor: '#ffffff',
  backgroundColor: '#000000',
  backgroundOpacity: 70,
  fontFamily: 'Arial',
  position: 'bottom-center',
  verticalOffset: 10,
  horizontalOffset: 0,
  textAlign: 'center',
  shadowColor: '#000000',
  shadowBlur: 2
};

// Initialize keyboard shortcuts when content script loads
initializeKeyboardShortcuts();

function initializeKeyboardShortcuts() {
  // Load custom shortcuts from storage
  chrome.storage.local.get(['keyboardShortcuts', 'shortcutsEnabled'], function(result) {
    if (result.keyboardShortcuts) {
      currentShortcuts = { ...DEFAULT_SHORTCUTS, ...result.keyboardShortcuts };
    }
    if (typeof result.shortcutsEnabled !== 'undefined') {
      shortcutsEnabled = result.shortcutsEnabled;
    }
  });

  // Add keyboard event listener
  document.addEventListener('keydown', handleKeyboardEvent, true);
  
  // Prevent conflicts with Netflix shortcuts in fullscreen
  document.addEventListener('fullscreenchange', handleFullscreenChange);
}

function handleKeyboardEvent(event) {
  if (!shortcutsEnabled) return;
  
  // Don't trigger shortcuts when typing in input fields
  if (event.target.tagName === 'INPUT' || 
      event.target.tagName === 'TEXTAREA' || 
      event.target.isContentEditable) {
    return;
  }

  // Create key combination string
  let keyCombo = '';
  if (event.shiftKey) keyCombo += 'Shift';
  if (event.ctrlKey) keyCombo += 'Ctrl';
  if (event.altKey) keyCombo += 'Alt';
  keyCombo += event.code;

  // Handle keyboard shortcuts
  switch(keyCombo) {
    case currentShortcuts.toggleSubtitles:
      event.preventDefault();
      toggleSubtitleVisibility();
      break;
      
    case currentShortcuts.timingBackward:
      event.preventDefault();
      adjustTiming(-timingStep);
      break;
      
    case currentShortcuts.timingForward:
      event.preventDefault();
      adjustTiming(timingStep);
      break;
      
    case currentShortcuts.fontSizeIncrease:
      event.preventDefault();
      adjustFontSize(fontSizeStep);
      break;
      
    case currentShortcuts.fontSizeDecrease:
      event.preventDefault();
      adjustFontSize(-fontSizeStep);
      break;
      
    case currentShortcuts.switchLanguage:
      event.preventDefault();
      switchSubtitleLanguage();
      break;
      
    case currentShortcuts.resetTiming:
      event.preventDefault();
      resetTiming();
      break;
      
    case currentShortcuts.cyclePresets:
      event.preventDefault();
      cyclePresets();
      break;
      
    case currentShortcuts.showHelp:
      if (event.shiftKey) { // Shift + /
        event.preventDefault();
        showShortcutsHelp();
      }
      break;
  }
}

function toggleSubtitleVisibility() {
  subtitlesVisible = !subtitlesVisible;
  
  if (subtitleContainer) {
    subtitleContainer.style.display = subtitlesVisible ? 'block' : 'none';
  }
  
  // Store state
  chrome.storage.local.set({ subtitlesVisible: subtitlesVisible });
  
  // Show notification
  showNotification(
    subtitlesVisible ? 'Subtitles: ON' : 'Subtitles: OFF',
    subtitlesVisible ? 'success' : 'info'
  );
}

function adjustTiming(adjustment) {
  delay += adjustment;
  
  // Store new delay
  chrome.storage.local.set({ delay: delay });
  
  // Show notification
  const sign = adjustment > 0 ? '+' : '';
  showNotification(`Timing: ${sign}${delay}ms`, 'info');
}

function adjustFontSize(adjustment) {
  const newSize = Math.max(12, Math.min(72, subtitleSettings.fontSize + adjustment));
  
  if (newSize !== subtitleSettings.fontSize) {
    subtitleSettings.fontSize = newSize;
    updateSubtitleStyles();
    
    // Store new font size
    chrome.storage.local.set({ fontSize: newSize });
    
    // Show notification
    showNotification(`Font Size: ${newSize}px`, 'info');
  }
}

function switchSubtitleLanguage() {
  if (loadedLanguages.length <= 1) {
    showNotification('No additional languages loaded', 'warning');
    return;
  }
  
  currentLanguageIndex = (currentLanguageIndex + 1) % loadedLanguages.length;
  const currentLang = loadedLanguages[currentLanguageIndex];
  
  // Switch to the selected language subtitles
  subtitles = currentLang.subtitles;
  
  showNotification(`Language: ${currentLang.name}`, 'success');
}

function resetTiming() {
  delay = 0;
  chrome.storage.local.set({ delay: 0 });
  showNotification('Timing Reset', 'success');
}

function cyclePresets() {
  // This will be implemented when we add preset cycling
  showNotification('Cycling presets...', 'info');
  
  // Send message to popup to cycle presets
  chrome.runtime.sendMessage({ 
    type: "CYCLE_PRESET",
    source: "keyboard"
  });
}

function showShortcutsHelp() {
  if (document.getElementById('shortcuts-help-overlay')) {
    hideShortcutsHelp();
    return;
  }
  
  const helpOverlay = document.createElement('div');
  helpOverlay.id = 'shortcuts-help-overlay';
  helpOverlay.innerHTML = `
    <div class="shortcuts-help-content">
      <h3>⌨️ Keyboard Shortcuts</h3>
      <div class="shortcuts-list">
        <div class="shortcut-item"><kbd>C</kbd> Toggle subtitles on/off</div>
        <div class="shortcut-item"><kbd>G</kbd> Timing -250ms</div>
        <div class="shortcut-item"><kbd>H</kbd> Timing +250ms</div>
        <div class="shortcut-item"><kbd>S</kbd> Increase font size</div>
        <div class="shortcut-item"><kbd>Shift+S</kbd> Decrease font size</div>
        <div class="shortcut-item"><kbd>V</kbd> Switch language</div>
        <div class="shortcut-item"><kbd>R</kbd> Reset timing</div>
        <div class="shortcut-item"><kbd>P</kbd> Cycle presets</div>
        <div class="shortcut-item"><kbd>Shift+/</kbd> Show/hide this help</div>
      </div>
      <div class="help-footer">
        <small>Press <kbd>Shift+/</kbd> again to close</small>
      </div>
    </div>
  `;
  
  // Apply styles
  helpOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 999999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Segoe UI', Arial, sans-serif;
  `;
  
  const content = helpOverlay.querySelector('.shortcuts-help-content');
  content.style.cssText = `
    background: #1a1a1a;
    color: white;
    padding: 30px;
    border-radius: 12px;
    max-width: 400px;
    border: 1px solid #333;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  `;
  
  const title = content.querySelector('h3');
  title.style.cssText = `
    margin: 0 0 20px 0;
    text-align: center;
    color: #e50914;
    font-size: 18px;
  `;
  
  const shortcutItems = content.querySelectorAll('.shortcut-item');
  shortcutItems.forEach(item => {
    item.style.cssText = `
      margin: 8px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
    `;
  });
  
  const kbds = content.querySelectorAll('kbd');
  kbds.forEach(kbd => {
    kbd.style.cssText = `
      background: #333;
      color: #fff;
      padding: 4px 8px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 12px;
      border: 1px solid #555;
      margin-right: 10px;
    `;
  });
  
  const footer = content.querySelector('.help-footer');
  footer.style.cssText = `
    text-align: center;
    margin-top: 20px;
    opacity: 0.7;
  `;
  
  document.body.appendChild(helpOverlay);
  
  // Auto-hide after 10 seconds
  setTimeout(() => {
    hideShortcutsHelp();
  }, 10000);
}

function hideShortcutsHelp() {
  const helpOverlay = document.getElementById('shortcuts-help-overlay');
  if (helpOverlay) {
    helpOverlay.remove();
  }
}

function showNotification(message, type = 'info') {
  // Remove existing notification
  const existingNotification = document.getElementById('subtitle-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.id = 'subtitle-notification';
  notification.textContent = message;
  
  // Base styles
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 30px;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    z-index: 999998;
    transition: all 0.3s ease;
    transform: translateX(100%);
    opacity: 0;
    border-left: 4px solid #e50914;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  `;
  
  // Type-specific styling
  switch(type) {
    case 'success':
      notification.style.borderLeftColor = '#28a745';
      break;
    case 'warning':
      notification.style.borderLeftColor = '#ffc107';
      break;
    case 'error':
      notification.style.borderLeftColor = '#dc3545';
      break;
    default:
      notification.style.borderLeftColor = '#17a2b8';
  }
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
    notification.style.opacity = '1';
  }, 10);
  
  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 2500);
}

function handleFullscreenChange() {
  // Re-initialize shortcuts when entering/exiting fullscreen
  // This ensures shortcuts work in all viewing modes
  setTimeout(() => {
    initializeKeyboardShortcuts();
  }, 100);
}

function parseSRT(srtText) {
  try {
    const subtitleBlocks = srtText.trim().split(/\r?\n\r?\n/);
    
    subtitles = subtitleBlocks.map(block => {
      const lines = block.trim().split(/\r?\n/);
      if (lines.length < 3) return null;
      
      // Skip sequence number and validate timecode
      const timecode = lines[1].match(/(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/);
      if (!timecode) return null;
      
      const start = timeToMs(timecode[1]);
      const end = timeToMs(timecode[2]);
      
      // Skip "Untranslated subtitle" entries and validate timestamps
      const text = lines.slice(2).join('\n');
      if (text.includes('Untranslated subtitle') || start >= end || end <= 0) return null;
      
      return { start, end, text };
    }).filter(sub => sub !== null);
    
    console.log(`Parsed ${subtitles.length} valid subtitles`);
    return subtitles;
  } catch (err) {
    console.error('Failed to parse SRT:', err);
    return [];
  }
}

// Helper function to convert timecode to milliseconds
function timeToMs(timeString) {
  const [hours, minutes, seconds] = timeString.split(':');
  const [secs, ms] = seconds.split(',');
  
  return (parseInt(hours) * 3600000) + 
         (parseInt(minutes) * 60000) + 
         (parseInt(secs) * 1000) + 
         parseInt(ms);
}

function displaySubtitles(video) {
  // Find the video container (works in both normal and fullscreen)
  const videoContainer = video.closest('.watch-video') || video.closest('.NFPlayer');
  
  if (!subtitleContainer || !subtitleContainer.isConnected) {
    subtitleContainer = createSubtitleContainer();
    videoContainer.appendChild(subtitleContainer);
  }

  // Apply current visibility state
  subtitleContainer.style.display = subtitlesVisible ? 'block' : 'none';

  if (intervalId) cancelAnimationFrame(intervalId);

  function updateSubtitles() {
    if (!subtitles.length || !video || !subtitlesVisible) {
      if (subtitleContainer) subtitleContainer.innerHTML = '';
      intervalId = requestAnimationFrame(updateSubtitles);
      return;
    }
    
    const currentTime = Math.floor(video.currentTime * 1000) + delay;
    const line = subtitles.find(s => currentTime >= s.start && currentTime <= s.end);
    subtitleContainer.innerHTML = line ? line.text : '';
    intervalId = requestAnimationFrame(updateSubtitles);
  }
  
  updateSubtitles();
}

function createSubtitleContainer() {
  const container = document.createElement('div');
  container.className = 'netflix-custom-subtitles';
  applySubtitleStyles(container);
  return container;
}

function applySubtitleStyles(container) {
  // Base container styles
  container.style.position = 'absolute';
  container.style.zIndex = '9999999';
  container.style.pointerEvents = 'none';
  container.style.width = 'auto';
  container.style.maxWidth = '80%';
  container.style.wordWrap = 'break-word';
  container.style.whiteSpace = 'pre-wrap';
  
  // Apply positioning
  applyPositioning(container);
  
  // Apply text styles
  applyTextStyles(container);
  
  // Apply custom CSS if exists
  applyCustomCSS(container);
}

function applyPositioning(container) {
  const { position, verticalOffset, horizontalOffset } = subtitleSettings;
  
  // Reset all positioning
  container.style.top = 'auto';
  container.style.bottom = 'auto';
  container.style.left = 'auto';
  container.style.right = 'auto';
  container.style.transform = 'none';
  
  // Apply position-specific styles
  switch (position) {
    case 'top-left':
      container.style.top = `${verticalOffset}%`;
      container.style.left = `${horizontalOffset}%`;
      break;
    case 'top-center':
      container.style.top = `${verticalOffset}%`;
      container.style.left = '50%';
      container.style.transform = 'translateX(-50%)';
      break;
    case 'top-right':
      container.style.top = `${verticalOffset}%`;
      container.style.right = `${horizontalOffset}%`;
      break;
    case 'center-left':
      container.style.top = '50%';
      container.style.left = `${horizontalOffset}%`;
      container.style.transform = 'translateY(-50%)';
      break;
    case 'center':
      container.style.top = '50%';
      container.style.left = '50%';
      container.style.transform = 'translate(-50%, -50%)';
      break;
    case 'center-right':
      container.style.top = '50%';
      container.style.right = `${horizontalOffset}%`;
      container.style.transform = 'translateY(-50%)';
      break;
    case 'bottom-left':
      container.style.bottom = `${verticalOffset}%`;
      container.style.left = `${horizontalOffset}%`;
      break;
    case 'bottom-center':
    default:
      container.style.bottom = `${verticalOffset}%`;
      container.style.left = '50%';
      container.style.transform = 'translateX(-50%)';
      break;
    case 'bottom-right':
      container.style.bottom = `${verticalOffset}%`;
      container.style.right = `${horizontalOffset}%`;
      break;
  }
}

function applyTextStyles(container) {
  const { 
    fontSize, 
    textColor, 
    backgroundColor, 
    backgroundOpacity,
    fontFamily, 
    textAlign, 
    shadowColor, 
    shadowBlur 
  } = subtitleSettings;
  
  // Text properties
  container.style.color = textColor;
  container.style.fontSize = `${fontSize}px`;
  container.style.fontFamily = fontFamily;
  container.style.textAlign = textAlign;
  container.style.lineHeight = '1.2';
  container.style.fontWeight = '600';
  
  // Background
  if (backgroundOpacity > 0) {
    const bgOpacity = backgroundOpacity / 100;
    const bgColor = hexToRgba(backgroundColor, bgOpacity);
    container.style.backgroundColor = bgColor;
    container.style.padding = '8px 12px';
    container.style.borderRadius = '6px';
    container.style.backdropFilter = 'blur(2px)';
  } else {
    container.style.backgroundColor = 'transparent';
    container.style.padding = '4px';
    container.style.borderRadius = '0';
    container.style.backdropFilter = 'none';
  }
  
  // Text shadow/outline
  if (shadowBlur > 0) {
    const shadowOffset = Math.max(1, shadowBlur / 2);
    container.style.textShadow = `
      ${shadowColor} 0px 0px ${shadowBlur}px,
      ${shadowColor} ${shadowOffset}px ${shadowOffset}px ${shadowBlur}px,
      ${shadowColor} -${shadowOffset}px -${shadowOffset}px ${shadowBlur}px,
      ${shadowColor} ${shadowOffset}px -${shadowOffset}px ${shadowBlur}px,
      ${shadowColor} -${shadowOffset}px ${shadowOffset}px ${shadowBlur}px
    `;
  } else {
    container.style.textShadow = 'none';
  }
}

function applyCustomCSS(container) {
  if (!customCSS.trim()) return;
  
  try {
    // Create a temporary style element to parse and validate CSS
    const tempStyle = document.createElement('div');
    tempStyle.style.cssText = customCSS;
    
    // Apply each style property individually
    const styles = customCSS.split(';').filter(style => style.trim());
    
    styles.forEach(style => {
      const [property, value] = style.split(':').map(s => s.trim());
      if (property && value) {
        // Convert kebab-case to camelCase for JavaScript style properties
        const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        
        // Apply the style if it's a valid CSS property
        try {
          container.style[camelProperty] = value;
        } catch (e) {
          console.warn(`Invalid CSS property: ${property}:${value}`);
        }
      }
    });
  } catch (error) {
    console.error('Error applying custom CSS:', error);
  }
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function updateSubtitleStyles() {
  if (subtitleContainer) {
    applySubtitleStyles(subtitleContainer);
  }
}

// Message handlers
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "LOAD_SUBTITLES") {
    console.log("Raw subtitle content:", msg.data.substring(0, 200));
    const parsedSubtitles = parseSRT(msg.data);
    console.log("Parsed subtitles:", parsedSubtitles.slice(0, 5));
    
    // Add to loaded languages array
    const languageName = msg.filename ? 
      msg.filename.replace(/\.[^/.]+$/, "") : // Remove file extension
      `Language ${loadedLanguages.length + 1}`;
    
    loadedLanguages.push({
      name: languageName,
      subtitles: parsedSubtitles,
      filename: msg.filename
    });
    
    // Set current subtitles to the newly loaded ones
    subtitles = parsedSubtitles;
    currentLanguageIndex = loadedLanguages.length - 1;
    
    const video = document.querySelector('video');
    if (video) displaySubtitles(video);
    
    // Show notification
    showNotification(`Loaded: ${languageName}`, 'success');
  }
  
  if (msg.type === "SET_DELAY") {
    delay = msg.value;
  }
  
  if (msg.type === "SET_FONT_SIZE") {
    subtitleSettings.fontSize = msg.value;
    updateSubtitleStyles();
  }
  
  if (msg.type === "UPDATE_STYLE") {
    // Update all style-related settings
    Object.assign(subtitleSettings, msg.settings);
    updateSubtitleStyles();
  }
  
  if (msg.type === "UPDATE_POSITION") {
    // Update position-related settings
    subtitleSettings.position = msg.settings.position;
    subtitleSettings.verticalOffset = msg.settings.verticalOffset;
    subtitleSettings.horizontalOffset = msg.settings.horizontalOffset;
    updateSubtitleStyles();
  }
  
  if (msg.type === "APPLY_CUSTOM_CSS") {
    // Update custom CSS and reapply styles
    customCSS = msg.css || '';
    updateSubtitleStyles();
    console.log('Custom CSS applied:', customCSS);
  }
  
  if (msg.type === "TOGGLE_SHORTCUTS") {
    shortcutsEnabled = msg.enabled;
    chrome.storage.local.set({ shortcutsEnabled: shortcutsEnabled });
    showNotification(
      shortcutsEnabled ? 'Shortcuts: ENABLED' : 'Shortcuts: DISABLED',
      shortcutsEnabled ? 'success' : 'warning'
    );
  }
  
  if (msg.type === "UPDATE_SHORTCUTS") {
    currentShortcuts = { ...DEFAULT_SHORTCUTS, ...msg.shortcuts };
    chrome.storage.local.set({ keyboardShortcuts: currentShortcuts });
    showNotification('Shortcuts updated', 'success');
  }
  
  if (msg.type === "SHOW_SHORTCUTS_HELP") {
    showShortcutsHelp();
  }
  
  if (msg.type === "TEST_SHORTCUTS") {
    showNotification('🧪 Shortcuts are working! Try pressing C, G, H, S keys', 'info');
  }
});

function cleanup() {
  if (intervalId) {
    typeof intervalId === 'number' ? clearInterval(intervalId) : cancelAnimationFrame(intervalId);
  }
  if (subtitleContainer && subtitleContainer.parentNode) {
    subtitleContainer.parentNode.removeChild(subtitleContainer);
  }
  subtitles = [];
  delay = 0;
  subtitleContainer = null;
  intervalId = null;
  customCSS = '';
}

// Enhanced cleanup for navigation
window.addEventListener('beforeunload', cleanup);

// Handle Netflix's SPA navigation
let currentUrl = location.href;
new MutationObserver(() => {
  if (location.href !== currentUrl) {
    currentUrl = location.href;
    cleanup();
  }
}).observe(document, { subtree: true, childList: true });

// Load stored settings on content script initialization
chrome.storage.local.get([
  'fontSize', 'textColor', 'backgroundColor', 'backgroundOpacity',
  'fontFamily', 'position', 'verticalOffset', 'horizontalOffset',
  'textAlign', 'shadowColor', 'shadowBlur', 'customCSS',
  'subtitlesVisible', 'keyboardShortcuts', 'shortcutsEnabled', 'delay'
], function(result) {
  Object.assign(subtitleSettings, result);
  
  if (result.customCSS) {
    customCSS = result.customCSS;
  }
  
  if (typeof result.subtitlesVisible !== 'undefined') {
    subtitlesVisible = result.subtitlesVisible;
  }
  
  if (result.keyboardShortcuts) {
    currentShortcuts = { ...DEFAULT_SHORTCUTS, ...result.keyboardShortcuts };
  }
  
  if (typeof result.shortcutsEnabled !== 'undefined') {
    shortcutsEnabled = result.shortcutsEnabled;
  }
  
  if (typeof result.delay !== 'undefined') {
    delay = result.delay;
  }
});
