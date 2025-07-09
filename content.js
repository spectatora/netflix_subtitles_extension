let subtitles = [];
let delay = 0;
let subtitleContainer = null;
let intervalId = null;

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

  if (intervalId) cancelAnimationFrame(intervalId);

  function updateSubtitles() {
    if (!subtitles.length || !video) return;
    const currentTime = Math.floor(video.currentTime * 1000) + delay;
    const line = subtitles.find(s => currentTime >= s.start && currentTime <= s.end);
    subtitleContainer.innerHTML = line ? line.text : '';
    intervalId = requestAnimationFrame(updateSubtitles);
  }
  
  updateSubtitles();
}

function createSubtitleContainer() {
  const container = document.createElement('div');
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
    const subtitles = parseSRT(msg.data);
    console.log("Parsed subtitles:", subtitles.slice(0, 5));
    
    const video = document.querySelector('video');
    if (video) displaySubtitles(video);
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
  'textAlign', 'shadowColor', 'shadowBlur'
], function(result) {
  Object.assign(subtitleSettings, result);
});
