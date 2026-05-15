# 📊 FedWatch Dashboard

**FedWatch** is a high-end, real-time financial terminal designed for retail investors to monitor economic indicators from the Federal Reserve, BLS, and BEA. It processes "dirty" economic data feeds and provides immediate actionable intelligence through sentiment analysis and surge detection.

![Dashboard Preview](https://lucide.dev/api/gh-icon/activity?size=64&color=3b82f6)

## ✨ Key Features

### 📡 Real-Time Intelligence
- **Live Feed Engine**: Updates strictly every 2 seconds with fresh economic indicators.
- **Feed Control**: Integrated "Freeze" capability to pause the stream for detailed inspection.
- **Zero-Flicker Rendering**: Optimized with React memoization to ensure smooth updates without UI stutter.

### 🧠 Calculation Engine (The "CTO Special")
- **Inflation Surge Detection**: Automatically flags any inflation data point that increases by >5% compared to the previous entry.
- **Data Normalization**: Clean utility layer that standardizes inconsistent timestamps (Unix/ISO) and values ($1.2B, 950M, 2.4%).
- **Sentiment Analysis**: Immediate "Bullish" or "Bearish" badges based on economic impact.

### 🎨 Premium Terminal UI
- **High-End Aesthetic**: Sleek dark-mode interface with glassmorphic components and professional typography (Inter & JetBrains Mono).
- **Stat Cards**: Real-time tracking of active alerts, unique sources, and feed volume.
- **Advanced Filtering**: Case-insensitive partial matching for sources and instant category-based tabs.

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks (useMemo, useRef, Custom Hooks)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yogisharma30799/fed-watch-dashboard.git
   cd fed-watch-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

---
*Built for the Fed-Watch Dashboard Challenge.*
