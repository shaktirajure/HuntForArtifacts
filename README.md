# Artifact Hunter 🏺

A modern Progressive Web App (PWA) for treasure hunting through QR code scanning. Discover hidden artifacts, complete interactive quests, and build your collection in this immersive treasure hunting experience.

## ✨ Features

### Core Functionality
- **QR Code Scanning**: Use your device camera to scan QR codes and discover artifacts
- **Artifact Discovery**: Interactive artifact pages with trivia questions and detailed information
- **Treasure Hunts**: Complete sequential quests by discovering specific artifacts in order
- **Admin Panel**: Create and manage artifacts, generate QR codes, and create printable museum labels

### PWA Features
- **Offline Support**: Advanced service worker caches static assets and last 10 artifact pages
- **Mobile Installation**: "Add to Home Screen" prompts for native app-like experience
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Dark/Light Theme**: Toggle between themes with localStorage persistence

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Modern React**: Built with React 18 and modern hooks
- **Real-time Updates**: Live camera feed for QR scanning
- **Local Storage**: Hunt progress and preferences persist across sessions
- **Optimized Performance**: Lighthouse PWA score optimized

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/artifact-hunter.git
cd artifact-hunter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5000](http://localhost:5000) in your browser

## 📱 Usage

### For Treasure Hunters
1. **Home**: Browse featured artifacts and active hunts
2. **Scan**: Use your camera to scan QR codes and discover artifacts
3. **Artifacts**: View your discovered artifacts collection
4. **Hunts**: Start treasure hunts and track your progress

### For Administrators
1. Navigate to the **Admin** panel
2. **Create Artifacts**: Add new artifacts with descriptions and trivia
3. **Generate QR Codes**: Create downloadable QR codes for artifacts
4. **Print Labels**: Generate 4-per-page printable museum labels

### Installing as PWA
- **Mobile**: Tap the "Add to Home Screen" prompt or browser menu option
- **Desktop**: Click the install icon in the browser address bar

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and TypeScript
- **Wouter** - Lightweight client-side routing
- **TanStack Query** - Server state management and caching
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Radix UI** - Accessible component primitives

### Backend
- **Node.js + Express** - Server runtime and web framework
- **TypeScript** - Type-safe development
- **In-memory Storage** - Development data persistence

### PWA & Mobile
- **Service Worker** - Advanced caching and offline support
- **Web Manifest** - Native app-like installation
- **jsQR** - QR code scanning library
- **getUserMedia API** - Camera access for scanning

### Development
- **Vite** - Fast build tool and development server
- **ESLint + TypeScript** - Code quality and type checking
- **PostCSS** - CSS processing and optimization

## 📂 Project Structure

```
artifact-hunter/
├── client/                 # Frontend React application
│   ├── public/            # Static assets and PWA files
│   │   ├── manifest.json  # PWA manifest
│   │   └── sw.js          # Service worker
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── contexts/      # React contexts (Theme)
│       ├── data/          # Mock data (artifacts, hunts)
│       ├── hooks/         # Custom React hooks
│       ├── lib/           # Utility functions
│       └── pages/         # Application pages
├── server/                # Backend Express server
├── shared/                # Shared TypeScript types
└── package.json          # Dependencies and scripts
```

## 🎯 Hunt System

The treasure hunt system allows users to complete sequential quests:

1. **Start a Hunt**: Choose from available treasure hunts
2. **Follow Clues**: Each hunt step provides clues to the next artifact
3. **Scan to Progress**: Visit artifacts in the correct order
4. **Track Progress**: Hunt progress is saved locally
5. **Complete Hunts**: Earn completion status and achievements

## 🔧 Admin Features

Administrators can manage the entire artifact ecosystem:

- **Artifact Management**: Create artifacts with rich descriptions and trivia
- **QR Code Generation**: Generate and download QR codes for any artifact
- **Museum Labels**: Create professional 4-per-page printable labels
- **Hunt Creation**: Design sequential treasure hunt experiences

## 🌐 PWA Capabilities

This app is built as a Progressive Web App with:

- **Installable**: Can be installed on any device like a native app
- **Offline-First**: Core functionality works without internet
- **Responsive**: Adapts to any screen size and orientation
- **Fast**: Optimized loading and smooth animations
- **Secure**: HTTPS required for camera access and installation

## 📱 Camera Permissions

The QR scanner requires camera access:
- **Desktop**: Grant permission when prompted
- **Mobile**: Ensure HTTPS or localhost for camera access
- **iOS Safari**: May require user gesture to start camera

## 🎨 Theming

Toggle between light and dark themes:
- **Manual Toggle**: Click the theme button in the navigation
- **System Sync**: Respects your device's theme preference
- **Persistence**: Theme choice is saved across sessions

## 🚀 Deployment

### Replit
This project is optimized for Replit deployment:
```bash
npm run dev
```

### Other Platforms
Build for production:
```bash
npm run build
```

Deploy the `dist` folder to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **QR Code Library**: jsQR for reliable QR code scanning
- **UI Components**: shadcn/ui and Radix UI for accessible components
- **Icons**: Lucide React for beautiful, consistent icons
- **Camera API**: Web getUserMedia for device camera access

---

**Happy Treasure Hunting! 🏴‍☠️**