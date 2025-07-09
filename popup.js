document.addEventListener('DOMContentLoaded', function() {
  // Load saved state
  chrome.storage.local.get(['delay', 'filename', 'fontSize'], function(result) {
    if (result.delay) document.getElementById('delayInput').value = result.delay;
    if (result.filename) document.getElementById('currentFile').textContent = `Current: ${result.filename}`;
    if (result.fontSize) {
      document.getElementById('fontSizeSlider').value = result.fontSize;
      document.getElementById('fontSizeValue').textContent = `${result.fontSize}px`;
    }
  });

  document.getElementById('subtitleFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Save filename
    chrome.storage.local.set({ filename: file.name });
    document.getElementById('currentFile').textContent = `Current: ${file.name}`;

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
      
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "LOAD_SUBTITLES", data: content});
      });
    };
    reader.readAsArrayBuffer(file);
  });

  document.getElementById('delayInput').addEventListener('change', function(event) {
    const delay = parseInt(event.target.value) || 0;
    // Save delay
    chrome.storage.local.set({ delay: delay });
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "SET_DELAY", value: delay});
    });
  });

  const fontSizeSlider = document.getElementById('fontSizeSlider');
  const fontSizeValue = document.getElementById('fontSizeValue');

  fontSizeSlider.addEventListener('input', function(event) {
    // Update display value immediately while sliding
    fontSizeValue.textContent = `${event.target.value}px`;
  });

  fontSizeSlider.addEventListener('change', function(event) {
    // Save and apply value when sliding stops
    const fontSize = parseInt(event.target.value);
    chrome.storage.local.set({ fontSize: fontSize });
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "SET_FONT_SIZE", value: fontSize});
    });
  });
});
