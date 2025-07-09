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
  filename: null
};

let currentSettings = { ...DEFAULT_SETTINGS };

document.addEventListener('DOMContentLoaded', function() {
  initializeTabs();
  loadSettings();
  initializeEventListeners();
  updatePreview();
});

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
    updateUIFromSettings();
    updatePreview();
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
}

// Initialize all event listeners
function initializeEventListeners() {
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
}

// Event handlers
function handleFileChange(event) {
  const file = event.target.files[0];
  if (!file) return;

  currentSettings.filename = file.name;
  saveSettings();
  
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
      console.error('Decoding error:', err);
      content = new TextDecoder('utf-8').decode(buffer);
    }
    
    sendMessageToContentScript({ type: "LOAD_SUBTITLES", data: content });
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
  
  document.querySelectorAll('.position-btn[data-position]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.position === position);
  });
  
  saveSettings();
  sendMessageToContentScript({ type: "UPDATE_POSITION", settings: currentSettings });
}

function handleAlignmentButtonClick(event) {
  const alignment = event.target.dataset.align;
  currentSettings.textAlign = alignment;
  
  document.querySelectorAll('.position-btn[data-align]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.align === alignment);
  });
  
  saveSettings();
  updatePreview();
  sendMessageToContentScript({ type: "UPDATE_STYLE", settings: currentSettings });
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
