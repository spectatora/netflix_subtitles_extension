// Default settings
const DEFAULT_SETTINGS = {
  delay: 0,
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
  shadowBlur: 2,
  filename: null,
  theme: 'light',
  currentPreset: 'custom',
  customCSS: '',
  shortcutsEnabled: true,
  keyboardShortcuts: {},
  loadedLanguages: []
};

// Genre presets with predefined configurations
const GENRE_PRESETS = {
  horror: {
    textColor: '#8B0000',
    backgroundColor: '#1a0000',
    backgroundOpacity: 85,
    fontFamily: 'Georgia',
    fontSize: 36,
    shadowColor: '#FF0000',
    shadowBlur: 6,
    position: 'bottom-center',
    verticalOffset: 15,
    textAlign: 'center'
  },
  comedy: {
    textColor: '#FFD700',
    backgroundColor: '#FF6347',
    backgroundOpacity: 60,
    fontFamily: 'Comic Sans MS',
    fontSize: 34,
    shadowColor: '#000000',
    shadowBlur: 3,
    position: 'center',
    verticalOffset: 10,
    textAlign: 'center'
  },
  drama: {
    textColor: '#F5F5DC',
    backgroundColor: '#2F2F2F',
    backgroundOpacity: 75,
    fontFamily: 'Georgia',
    fontSize: 32,
    shadowColor: '#000000',
    shadowBlur: 2,
    position: 'bottom-center',
    verticalOffset: 12,
    textAlign: 'center'
  },
  action: {
    textColor: '#00FFFF',
    backgroundColor: '#000000',
    backgroundOpacity: 80,
    fontFamily: 'Impact',
    fontSize: 38,
    shadowColor: '#FF0000',
    shadowBlur: 4,
    position: 'bottom-center',
    verticalOffset: 8,
    textAlign: 'center'
  },
  scifi: {
    textColor: '#00FF41',
    backgroundColor: '#001100',
    backgroundOpacity: 85,
    fontFamily: 'Courier New',
    fontSize: 30,
    shadowColor: '#00FF41',
    shadowBlur: 8,
    position: 'bottom-center',
    verticalOffset: 10,
    textAlign: 'center'
  },
  documentary: {
    textColor: '#FFFFFF',
    backgroundColor: '#000000',
    backgroundOpacity: 70,
    fontFamily: 'Arial',
    fontSize: 28,
    shadowColor: '#000000',
    shadowBlur: 1,
    position: 'bottom-center',
    verticalOffset: 10,
    textAlign: 'center'
  },
  romance: {
    textColor: '#FFB6C1',
    backgroundColor: '#4B0026',
    backgroundOpacity: 70,
    fontFamily: 'Times New Roman',
    fontSize: 32,
    shadowColor: '#8B0000',
    shadowBlur: 3,
    position: 'bottom-center',
    verticalOffset: 15,
    textAlign: 'center'
  }
};

let currentSettings = { ...DEFAULT_SETTINGS };
let activePreset = 'custom';

document.addEventListener('DOMContentLoaded', function() {
  initializeTabs();
  initializeTheme();
  loadSettings();
  initializeEventListeners();
  updatePreview();
  
  // Listen for messages from content script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "CYCLE_PRESET" && message.source === "keyboard") {
      cycleToNextPreset();
    }
  });
});

// Theme functionality
function initializeTheme() {
  const savedTheme = localStorage.getItem('subtitles-theme') || 'light';
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  currentSettings.theme = theme;
  document.body.setAttribute('data-theme', theme);
  
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  
  if (theme === 'dark') {
    themeIcon.textContent = '○';
    themeIcon.style.color = '#ffd700';
    themeText.textContent = 'Light';
  } else {
    themeIcon.textContent = '●';
    themeIcon.style.color = '#4169E1';
    themeText.textContent = 'Dark';
  }
  
  localStorage.setItem('subtitles-theme', theme);
}

function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

// Tab functionality
function initializeTabs() {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;
      
      // Remove active class from all tabs and panels
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding panel
      tab.classList.add('active');
      document.getElementById(targetTab + '-panel').classList.add('active');
    });
  });
}

// Load saved settings
function loadSettings() {
  chrome.storage.local.get(Object.keys(DEFAULT_SETTINGS), function(result) {
    currentSettings = { ...DEFAULT_SETTINGS, ...result };
    activePreset = currentSettings.currentPreset || 'custom';
    updateUIFromSettings();
    updatePreview();
    updateActivePreset();
  });
}

// Update UI elements from current settings
function updateUIFromSettings() {
  // Files tab
  document.getElementById('delayInput').value = currentSettings.delay;
  if (currentSettings.filename) {
    const fileElement = document.getElementById('currentFile');
    fileElement.textContent = `📁 ${currentSettings.filename}`;
    fileElement.style.display = 'block';
  }
  
  // Style tab
  document.getElementById('textColor').value = currentSettings.textColor;
  document.getElementById('fontSizeSlider').value = currentSettings.fontSize;
  document.getElementById('fontSizeValue').textContent = `${currentSettings.fontSize}px`;
  document.getElementById('fontFamily').value = currentSettings.fontFamily;
  document.getElementById('backgroundColor').value = currentSettings.backgroundColor;
  document.getElementById('backgroundOpacity').value = currentSettings.backgroundOpacity;
  document.getElementById('opacityValue').textContent = `${currentSettings.backgroundOpacity}%`;
  document.getElementById('shadowColor').value = currentSettings.shadowColor;
  document.getElementById('shadowBlur').value = currentSettings.shadowBlur;
  document.getElementById('shadowBlurValue').textContent = `${currentSettings.shadowBlur}px`;
  
  // Position tab
  document.getElementById('verticalOffset').value = currentSettings.verticalOffset;
  document.getElementById('verticalValue').textContent = `${currentSettings.verticalOffset}%`;
  document.getElementById('horizontalOffset').value = currentSettings.horizontalOffset;
  document.getElementById('horizontalValue').textContent = `${currentSettings.horizontalOffset}%`;
  
  // Set active position button
  document.querySelectorAll('.position-btn[data-position]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.position === currentSettings.position);
  });
  
  // Set active alignment button
  document.querySelectorAll('.position-btn[data-align]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.align === currentSettings.textAlign);
  });
  
  // Shortcuts tab
  document.getElementById('shortcutsEnabled').checked = currentSettings.shortcutsEnabled !== false;
  updateLoadedLanguagesList();
  
  // Advanced tab
  document.getElementById('customCSS').value = currentSettings.customCSS || '';
}

// Initialize all event listeners
function initializeEventListeners() {
  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  
  // Files tab listeners
  document.getElementById('subtitleFile').addEventListener('change', handleFileChange);
  document.getElementById('delayInput').addEventListener('change', handleDelayChange);
  
  // Style tab listeners
  document.getElementById('textColor').addEventListener('change', handleStyleChange);
  document.getElementById('fontSizeSlider').addEventListener('input', handleFontSizeInput);
  document.getElementById('fontSizeSlider').addEventListener('change', handleStyleChange);
  document.getElementById('fontFamily').addEventListener('change', handleStyleChange);
  document.getElementById('backgroundColor').addEventListener('change', handleStyleChange);
  document.getElementById('backgroundOpacity').addEventListener('input', handleOpacityInput);
  document.getElementById('backgroundOpacity').addEventListener('change', handleStyleChange);
  document.getElementById('shadowColor').addEventListener('change', handleStyleChange);
  document.getElementById('shadowBlur').addEventListener('input', handleShadowBlurInput);
  document.getElementById('shadowBlur').addEventListener('change', handleStyleChange);
  
  // Genre preset listeners
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', handlePresetClick);
  });
  
  // Position tab listeners
  document.getElementById('verticalOffset').addEventListener('input', handleVerticalInput);
  document.getElementById('verticalOffset').addEventListener('change', handlePositionChange);
  document.getElementById('horizontalOffset').addEventListener('input', handleHorizontalInput);
  document.getElementById('horizontalOffset').addEventListener('change', handlePositionChange);
  
  // Position buttons
  document.querySelectorAll('.position-btn[data-position]').forEach(btn => {
    btn.addEventListener('click', handlePositionButtonClick);
  });
  
  // Alignment buttons
  document.querySelectorAll('.position-btn[data-align]').forEach(btn => {
    btn.addEventListener('click', handleAlignmentButtonClick);
  });
  
  // Shortcuts tab listeners
  document.getElementById('shortcutsEnabled').addEventListener('change', handleShortcutsToggle);
  document.getElementById('showHelpBtn').addEventListener('click', handleShowHelp);
  document.getElementById('testShortcutsBtn').addEventListener('click', handleTestShortcuts);
  
  // Advanced tab listeners
  document.getElementById('applyCSSBtn').addEventListener('click', handleApplyCustomCSS);
  document.getElementById('exportSettings').addEventListener('click', handleExportSettings);
  document.getElementById('importBtn').addEventListener('click', () => {
    document.getElementById('importSettings').click();
  });
  document.getElementById('importSettings').addEventListener('change', handleImportSettings);
  document.getElementById('resetSettings').addEventListener('click', handleResetSettings);
}

// Genre preset functionality
function handlePresetClick(event) {
  const presetName = event.target.dataset.preset;
  
  if (presetName === 'custom') {
    activePreset = 'custom';
    updateActivePreset();
    return;
  }
  
  if (GENRE_PRESETS[presetName]) {
    // Apply preset settings
    Object.assign(currentSettings, GENRE_PRESETS[presetName]);
    currentSettings.currentPreset = presetName;
    activePreset = presetName;
    
    updateUIFromSettings();
    updateActivePreset();
    saveSettings();
    updatePreview();
    sendMessageToContentScript({ type: "UPDATE_STYLE", settings: currentSettings });
    sendMessageToContentScript({ type: "UPDATE_POSITION", settings: currentSettings });
  }
}

function updateActivePreset() {
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.preset === activePreset);
  });
}

function cycleToNextPreset() {
  const presetKeys = Object.keys(GENRE_PRESETS);
  presetKeys.push('custom'); // Add custom at the end
  
  const currentIndex = presetKeys.indexOf(activePreset);
  const nextIndex = (currentIndex + 1) % presetKeys.length;
  const nextPreset = presetKeys[nextIndex];
  
  if (nextPreset === 'custom') {
    activePreset = 'custom';
    currentSettings.currentPreset = 'custom';
    updateActivePreset();
    saveSettings();
  } else {
    // Apply the preset
    Object.assign(currentSettings, GENRE_PRESETS[nextPreset]);
    currentSettings.currentPreset = nextPreset;
    activePreset = nextPreset;
    
    updateUIFromSettings();
    updateActivePreset();
    updatePreview();
    saveSettings();
    
    // Send to content script
    sendMessageToContentScript({ type: "UPDATE_STYLE", settings: currentSettings });
    sendMessageToContentScript({ type: "UPDATE_POSITION", settings: currentSettings });
  }
}

// Event handlers
function handleFileChange(event) {
  const file = event.target.files[0];
  if (!file) return;

  currentSettings.filename = file.name;
  
  // Add to loaded languages list
  const languageName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
  
  if (!currentSettings.loadedLanguages) {
    currentSettings.loadedLanguages = [];
  }
  
  // Check if language already exists
  const existingIndex = currentSettings.loadedLanguages.findIndex(lang => lang.name === languageName);
  
  if (existingIndex === -1) {
    currentSettings.loadedLanguages.push({
      name: languageName,
      filename: file.name
    });
    currentSettings.currentLanguageIndex = currentSettings.loadedLanguages.length - 1;
  } else {
    // Update existing language
    currentSettings.loadedLanguages[existingIndex].filename = file.name;
    currentSettings.currentLanguageIndex = existingIndex;
  }
  
  saveSettings();
  updateLoadedLanguagesList();
  
  const fileElement = document.getElementById('currentFile');
  fileElement.textContent = `📁 ${file.name}`;
  fileElement.style.display = 'block';

  const reader = new FileReader();
  reader.onload = function(e) {
    const buffer = e.target.result;
    let content;
    try {
      content = new TextDecoder('windows-1251').decode(buffer);
    } catch (err) {
      // Decoding error
      content = new TextDecoder('utf-8').decode(buffer);
    }
    
    sendMessageToContentScript({ 
      type: "LOAD_SUBTITLES", 
      data: content,
      filename: file.name 
    });
  };
  reader.readAsArrayBuffer(file);
}

function handleDelayChange(event) {
  currentSettings.delay = parseInt(event.target.value) || 0;
  saveSettings();
  sendMessageToContentScript({ type: "SET_DELAY", value: currentSettings.delay });
}

function handleStyleChange() {
  updateSettingsFromUI();
  activePreset = 'custom';
  currentSettings.currentPreset = 'custom';
  updateActivePreset();
  saveSettings();
  updatePreview();
  sendMessageToContentScript({ type: "UPDATE_STYLE", settings: currentSettings });
}

function handleFontSizeInput(event) {
  document.getElementById('fontSizeValue').textContent = `${event.target.value}px`;
  updatePreview();
}

function handleOpacityInput(event) {
  document.getElementById('opacityValue').textContent = `${event.target.value}%`;
  updatePreview();
}

function handleShadowBlurInput(event) {
  document.getElementById('shadowBlurValue').textContent = `${event.target.value}px`;
  updatePreview();
}

function handlePositionChange() {
  updateSettingsFromUI();
  activePreset = 'custom';
  currentSettings.currentPreset = 'custom';
  updateActivePreset();
  saveSettings();
  sendMessageToContentScript({ type: "UPDATE_POSITION", settings: currentSettings });
}

function handleVerticalInput(event) {
  document.getElementById('verticalValue').textContent = `${event.target.value}%`;
}

function handleHorizontalInput(event) {
  document.getElementById('horizontalValue').textContent = `${event.target.value}%`;
}

function handlePositionButtonClick(event) {
  const position = event.target.dataset.position;
  currentSettings.position = position;
  activePreset = 'custom';
  currentSettings.currentPreset = 'custom';
  updateActivePreset();
  
  document.querySelectorAll('.position-btn[data-position]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.position === position);
  });
  
  saveSettings();
  sendMessageToContentScript({ type: "UPDATE_POSITION", settings: currentSettings });
}

function handleAlignmentButtonClick(event) {
  const alignment = event.target.dataset.align;
  currentSettings.textAlign = alignment;
  activePreset = 'custom';
  currentSettings.currentPreset = 'custom';
  updateActivePreset();
  
  document.querySelectorAll('.position-btn[data-align]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.align === alignment);
  });
  
  saveSettings();
  updatePreview();
  sendMessageToContentScript({ type: "UPDATE_STYLE", settings: currentSettings });
}

// Advanced functionality
function handleApplyCustomCSS() {
  const customCSS = document.getElementById('customCSS').value;
  currentSettings.customCSS = customCSS;
  activePreset = 'custom';
  currentSettings.currentPreset = 'custom';
  updateActivePreset();
  saveSettings();
  sendMessageToContentScript({ type: "APPLY_CUSTOM_CSS", css: customCSS });
}

function handleExportSettings() {
  const dataStr = JSON.stringify(currentSettings, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'netflix-subtitles-settings.json';
  link.click();
  
  URL.revokeObjectURL(url);
}

function handleImportSettings(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedSettings = JSON.parse(e.target.result);
      
      // Validate and merge settings
      currentSettings = { ...DEFAULT_SETTINGS, ...importedSettings };
      activePreset = currentSettings.currentPreset || 'custom';
      
      updateUIFromSettings();
      updateActivePreset();
      updatePreview();
      saveSettings();
      
      // Apply to content script
      sendMessageToContentScript({ type: "UPDATE_STYLE", settings: currentSettings });
      sendMessageToContentScript({ type: "UPDATE_POSITION", settings: currentSettings });
      if (currentSettings.customCSS) {
        sendMessageToContentScript({ type: "APPLY_CUSTOM_CSS", css: currentSettings.customCSS });
      }
      
      alert('Settings imported successfully!');
    } catch (error) {
      alert('Error importing settings: Invalid file format');
    }
  };
  reader.readAsText(file);
}

function handleResetSettings() {
  if (confirm('Are you sure you want to reset all settings to default?')) {
    currentSettings = { ...DEFAULT_SETTINGS };
    activePreset = 'custom';
    
    updateUIFromSettings();
    updateActivePreset();
    updatePreview();
    saveSettings();
    
    // Clear storage
    chrome.storage.local.clear();
    
    // Reset content script
    sendMessageToContentScript({ type: "UPDATE_STYLE", settings: currentSettings });
    sendMessageToContentScript({ type: "UPDATE_POSITION", settings: currentSettings });
    sendMessageToContentScript({ type: "APPLY_CUSTOM_CSS", css: '' });
    sendMessageToContentScript({ type: "TOGGLE_SHORTCUTS", enabled: true });
    
    alert('All settings have been reset to default!');
  }
}

// Shortcuts tab handlers
function handleShortcutsToggle(event) {
  const enabled = event.target.checked;
  currentSettings.shortcutsEnabled = enabled;
  saveSettings();
  
  // Send to content script
  sendMessageToContentScript({ 
    type: "TOGGLE_SHORTCUTS", 
    enabled: enabled 
  });
}

function handleShowHelp() {
  // Send message to content script to show help overlay
  sendMessageToContentScript({ 
    type: "SHOW_SHORTCUTS_HELP"
  });
  
  // Close popup after a delay to let user see the help
  setTimeout(() => {
    window.close();
  }, 100);
}

function handleTestShortcuts() {
  // Send a test notification to content script
  sendMessageToContentScript({ 
    type: "TEST_SHORTCUTS"
  });
  
  // Show a brief message in popup
  const btn = document.getElementById('testShortcutsBtn');
  const originalText = btn.textContent;
  btn.textContent = '✅ Test sent!';
  btn.disabled = true;
  
  setTimeout(() => {
    btn.textContent = originalText;
    btn.disabled = false;
  }, 2000);
}

function updateLoadedLanguagesList() {
  const container = document.getElementById('loadedLanguagesList');
  const languages = currentSettings.loadedLanguages || [];
  
  if (languages.length === 0) {
    container.innerHTML = '<div class="no-languages"><small>No subtitle files loaded yet</small></div>';
    return;
  }
  
  let html = '';
  languages.forEach((lang, index) => {
    const isCurrent = index === (currentSettings.currentLanguageIndex || 0);
    html += `
      <div class="language-item">
        <span class="language-name">${lang.name}</span>
        ${isCurrent ? '<span class="language-current">ACTIVE</span>' : ''}
      </div>
    `;
  });
  
  container.innerHTML = html;
}

// Update settings from UI
function updateSettingsFromUI() {
  currentSettings.textColor = document.getElementById('textColor').value;
  currentSettings.fontSize = parseInt(document.getElementById('fontSizeSlider').value);
  currentSettings.fontFamily = document.getElementById('fontFamily').value;
  currentSettings.backgroundColor = document.getElementById('backgroundColor').value;
  currentSettings.backgroundOpacity = parseInt(document.getElementById('backgroundOpacity').value);
  currentSettings.shadowColor = document.getElementById('shadowColor').value;
  currentSettings.shadowBlur = parseInt(document.getElementById('shadowBlur').value);
  currentSettings.verticalOffset = parseInt(document.getElementById('verticalOffset').value);
  currentSettings.horizontalOffset = parseInt(document.getElementById('horizontalOffset').value);
}

// Update preview
function updatePreview() {
  const previewText = document.getElementById('previewText');
  if (!previewText) return;
  
  const bgOpacity = currentSettings.backgroundOpacity / 100;
  const bgColor = hexToRgba(currentSettings.backgroundColor, bgOpacity);
  
  previewText.style.color = currentSettings.textColor;
  previewText.style.fontSize = `${Math.min(currentSettings.fontSize * 0.5, 20)}px`;
  previewText.style.fontFamily = currentSettings.fontFamily;
  previewText.style.textAlign = currentSettings.textAlign;
  previewText.style.backgroundColor = bgColor;
  previewText.style.padding = bgOpacity > 0 ? '4px 8px' : '0';
  previewText.style.borderRadius = bgOpacity > 0 ? '4px' : '0';
  previewText.style.textShadow = `${currentSettings.shadowBlur}px ${currentSettings.shadowBlur}px ${currentSettings.shadowBlur}px ${currentSettings.shadowColor}`;
  
  // Update preview text based on active preset
  if (activePreset !== 'custom') {
    const presetNames = {
      horror: 'Scary subtitle text...',
      comedy: 'Funny subtitle text!',
      drama: 'Emotional subtitle text.',
      action: 'EXPLOSIVE SUBTITLE!',
      scifi: 'Futuristic subtitle text',
      documentary: 'Educational subtitle text',
      romance: 'Romantic subtitle text ♥'
    };
    previewText.textContent = presetNames[activePreset] || 'Sample subtitle text';
  } else {
    previewText.textContent = 'Sample subtitle text';
  }
}

// Helper functions
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function saveSettings() {
  chrome.storage.local.set(currentSettings);
}

function sendMessageToContentScript(message) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    }
  });
}
