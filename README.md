# 🎬 Media Pauser Chrome Extension

A browser extension that automatically manages your media playback when switching between tabs and applications.


![Screenshot 2025-04-20 at 10 24 47 PM](https://github.com/user-attachments/assets/a39050b1-dc41-4a8c-8a20-9154fc2eb397)



## ✨ Features

- **🔇 Auto Pause** - Automatically pauses videos and audio when you switch away from the tab
- **▶️ Auto Resume** - Optionally resumes playback when you return to the tab
- **🔒 Per-Site Control** - Enable or disable the extension for specific websites
- **⚙️ Customization** - Configure auto-resume behavior on a site-by-site basis

## 🎯 Use Cases

### Coding Tutorials
**Problem:** Having to manually pause YouTube videos when switching to try out code examples  
**Solution:** Videos automatically pause when you switch to your code editor and resume when you return

https://github.com/user-attachments/assets/ff772c9b-68b5-4b55-ba88-6adeab8c1ce9

### Multitasking with Movies/Sports
Balance entertainment and productivity without missing content:

https://github.com/user-attachments/assets/1b29ed08-b619-44d3-b378-5bd48df210c2

## 📥 Installation

### 1. Get the Code
```bash
git clone https://github.com/ssonthal/media-pauser-chrome-extension.git
```

### 2. Install in Chrome
1. Open `chrome://extensions/`
2. Toggle on **Developer mode** in the top-right corner
3. Click **Load unpacked**
4. Select the Media Pauser folder

### 3. Ready to Use
The Media Pauser icon will appear in your toolbar. Click it to configure settings for your current website.

## 📁 Project Structure

* **manifest.json** - Extension configuration, permissions, and metadata
* **popup.html** - User interface for controlling the extension
* **popup.js** - Handles user interactions and applies settings
* **content.js** - Core functionality for detecting focus changes and controlling media playback

## 🤝 Contributing

We welcome contributions to make Media Pauser even better!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -am 'Add new feature'`
4. Push your branch: `git push origin feature-name`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👏 Acknowledgements

* **Chrome Extensions Documentation** - [Link](https://developer.chrome.com/docs/extensions/develop)
* **YouTube and other media sites** - For providing the media experience that inspired this extension
