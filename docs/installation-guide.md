---
layout: default
title: Installation Guide
description: Step-by-step guide to install Netflix Custom Subtitles Extension using Chrome's Load Unpacked feature.
permalink: /installation-guide/
---

<div class="page-header">
  <div class="container">
    <h1>📥 Installation Guide</h1>
    <p class="page-subtitle">How to install Netflix Custom Subtitles Extension manually</p>
  </div>
</div>

<section class="installation-content">
  <div class="container">
    
    <div class="status-notice">
      <div class="notice-card">
        <h2>🔄 Chrome Web Store Status</h2>
        <p>Our extension is currently under review for the Chrome Web Store. In the meantime, you can install it manually using the steps below.</p>
      </div>
    </div>

    <div class="installation-steps">
      <h2>🚀 Manual Installation Steps</h2>
      
      <div class="step-card">
        <div class="step-number">1</div>
        <div class="step-content">
          <h3>Download the Extension Files</h3>
          <p>Download the extension source code from GitHub:</p>
          <div class="download-options">
            <a href="https://github.com/spectatora/netflix_subtitles_extension/archive/refs/heads/master.zip" class="btn btn-primary">
              📦 Download ZIP
            </a>
            <p class="download-note">Or clone the repository: <code>git clone https://github.com/spectatora/netflix_subtitles_extension.git</code></p>
          </div>
        </div>
      </div>

      <div class="step-card">
        <div class="step-number">2</div>
        <div class="step-content">
          <h3>Extract and Locate Extension Folder</h3>
          <ul>
            <li>Extract the downloaded ZIP file</li>
            <li>Navigate to the <strong>extension/</strong> folder inside the extracted directory</li>
            <li>This folder contains all the extension files (manifest.json, content.js, popup.html, etc.)</li>
          </ul>
        </div>
      </div>

      <div class="step-card">
        <div class="step-number">3</div>
        <div class="step-content">
          <h3>Open Chrome Extensions Page</h3>
          <ul>
            <li>Open Google Chrome</li>
            <li>Type <code>chrome://extensions/</code> in the address bar and press Enter</li>
            <li>Or go to Chrome menu → More tools → Extensions</li>
          </ul>
        </div>
      </div>

      <div class="step-card">
        <div class="step-number">4</div>
        <div class="step-content">
          <h3>Enable Developer Mode</h3>
          <ul>
            <li>Look for the "Developer mode" toggle in the top-right corner</li>
            <li>Turn it ON (the toggle should be blue)</li>
            <li>New buttons will appear: "Load unpacked", "Pack extension", "Update"</li>
          </ul>
          <div class="screenshot-placeholder">
            <img src="{{ site.baseurl }}/chrome-store-assets/screenshots/developer-mode.png" alt="Developer Mode Toggle" style="max-width: 100%; border: 1px solid #ddd; border-radius: 8px; margin: 1rem 0;">
          </div>
        </div>
      </div>

      <div class="step-card">
        <div class="step-number">5</div>
        <div class="step-content">
          <h3>Load the Extension</h3>
          <ul>
            <li>Click the <strong>"Load unpacked"</strong> button</li>
            <li>Browse to and select the <strong>extension/</strong> folder you extracted in step 2</li>
            <li>Click "Select Folder" (Windows) or "Open" (Mac)</li>
          </ul>
        </div>
      </div>

      <div class="step-card">
        <div class="step-number">6</div>
        <div class="step-content">
          <h3>Verify Installation</h3>
          <ul>
            <li>The extension should now appear in your extensions list</li>
            <li>Look for the Netflix Custom Subtitles icon in your Chrome toolbar</li>
            <li>If the icon isn't visible, click the puzzle piece icon and pin the extension</li>
          </ul>
        </div>
      </div>

      <div class="step-card">
        <div class="step-number">7</div>
        <div class="step-content">
          <h3>Start Using on Netflix</h3>
          <ul>
            <li>Go to <a href="https://netflix.com" target="_blank">Netflix.com</a></li>
            <li>Start playing any video</li>
            <li>Click the extension icon and load your .srt subtitle file</li>
            <li>Enjoy custom subtitles with advanced controls!</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="troubleshooting">
      <h2>🔧 Troubleshooting</h2>
      
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Extension not loading?</h4>
          <ul>
            <li>Make sure you selected the correct "extension/" folder</li>
            <li>Check that manifest.json is present in the folder</li>
            <li>Ensure Developer mode is enabled</li>
          </ul>
        </div>
        
        <div class="faq-item">
          <h4>Icon not appearing in toolbar?</h4>
          <ul>
            <li>Click the puzzle piece icon in Chrome toolbar</li>
            <li>Find "Netflix Custom Subtitles" and click the pin icon</li>
            <li>The extension icon will now be visible</li>
          </ul>
        </div>
        
        <div class="faq-item">
          <h4>Extension showing errors?</h4>
          <ul>
            <li>Make sure all files are extracted properly</li>
            <li>Try removing and re-adding the extension</li>
            <li>Check Chrome console for specific error messages</li>
          </ul>
        </div>
        
        <div class="faq-item">
          <h4>Not working on Netflix?</h4>
          <ul>
            <li>Refresh the Netflix page after installing</li>
            <li>Make sure you're on a video page (not browsing)</li>
            <li>Check that the extension has permissions for Netflix.com</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="next-steps">
      <h2>✨ What's Next?</h2>
      <div class="next-steps-grid">
        <div class="next-step-card">
          <h4>📖 Learn the Features</h4>
          <p>Explore all the powerful features including keyboard shortcuts, genre presets, and advanced positioning.</p>
          <a href="{{ site.baseurl }}/keyboard-shortcuts/" class="btn btn-secondary">View Features</a>
        </div>
        
        <div class="next-step-card">
          <h4>🎨 Customize Your Experience</h4>
          <p>Try different genre presets and create your own custom subtitle styles.</p>
        </div>
        
        <div class="next-step-card">
          <h4>⌨️ Master Keyboard Shortcuts</h4>
          <p>Use keyboard shortcuts for hands-free control while watching.</p>
          <a href="{{ site.baseurl }}/keyboard-shortcuts/" class="btn btn-secondary">Learn Shortcuts</a>
        </div>
      </div>
    </div>

  </div>
</section>

<style>
.page-header {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 6rem 0 4rem;
  text-align: center;
}

.page-header h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.installation-content {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.status-notice {
  margin-bottom: 4rem;
}

.notice-card {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
}

.notice-card h2 {
  color: #856404;
  margin-bottom: 1rem;
}

.installation-steps h2 {
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
}

.step-card {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border-left: 4px solid #e50914;
}

.step-number {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  background: #e50914;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.step-content {
  flex: 1;
}

.step-content h3 {
  margin-bottom: 1rem;
  color: #333;
}

.step-content ul {
  margin: 1rem 0;
}

.step-content li {
  margin-bottom: 0.5rem;
}

.download-options {
  margin: 1rem 0;
}

.download-note {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: #e50914;
  color: white;
}

.btn-primary:hover {
  background: #b8070f;
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: #e50914;
  border: 2px solid #e50914;
}

.btn-secondary:hover {
  background: #e50914;
  color: white;
}

code {
  background: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.troubleshooting {
  margin: 4rem 0;
  background: #f8f9fa;
  padding: 3rem;
  border-radius: 12px;
}

.troubleshooting h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.faq-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.faq-item h4 {
  color: #e50914;
  margin-bottom: 1rem;
}

.next-steps {
  margin: 4rem 0;
}

.next-steps h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.next-steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.next-step-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  text-align: center;
}

.next-step-card h4 {
  color: #333;
  margin-bottom: 1rem;
}

.next-step-card p {
  color: #666;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .step-card {
    flex-direction: column;
    text-align: center;
  }
  
  .step-number {
    align-self: center;
  }
}
</style> 