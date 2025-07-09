let subtitles = [];
let delay = 0;
let subtitleContainer = null;
let intervalId = null;
let fontSize = 32;

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
  container.style.position = 'absolute';
  container.style.left = '0';
  container.style.right = '0';
  container.style.bottom = '10%';
  container.style.width = '100%';
  container.style.textAlign = 'center';
  container.style.color = 'white';
  container.style.fontSize = `${fontSize}px`;
  container.style.textShadow = '2px 2px 2px black';
  container.style.zIndex = '9999999';
  container.style.pointerEvents = 'none';
  container.style.fontFamily = 'Arial, sans-serif';
  return container;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "LOAD_SUBTITLES") {
    console.log("Raw subtitle content:", msg.data.substring(0, 200)); // Show first 200 chars
    const subtitles = parseSRT(msg.data);
    console.log("Parsed subtitles:", subtitles.slice(0, 5)); // Show first 5 entries
    
    const video = document.querySelector('video');
    if (video) displaySubtitles(video);
  }
  if (msg.type === "SET_DELAY") {
    delay = msg.value;
  }
  if (msg.type === "SET_FONT_SIZE") {
    fontSize = msg.value;
    if (subtitleContainer) {
      subtitleContainer.style.fontSize = `${fontSize}px`;
    }
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

// Add listener for navigation
window.addEventListener('beforeunload', cleanup);
