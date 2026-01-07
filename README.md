# Abhijat Sarari - Futuristic Portfolio

A next-generation portfolio website built with Next.js, featuring an immersive sci-fi design with holographic effects, neural network visualizations, and cutting-edge animations.

![Portfolio Preview](./public/og-image.png)

## ✨ Features

- **🧠 Neural Network Skills Visualization** - Interactive SVG network with tech icons and bezier curves
- **🌀 Holographic UI Effects** - Glassmorphism, animated gradients, and glow effects
- **⚡ Dynamic Data** - Auto-syncing from GitHub, Credly, and Medium
- **🎨 Multiple Themes** - Cyberpunk, Aurora, Neon, and Minimal color schemes
- **♿ Accessibility** - Reduce motion, high contrast mode, keyboard navigation
- **🔮 Easter Eggs** - Konami code reveals Matrix rain effect
- **📱 Fully Responsive** - Mobile-first design that works on all devices

## 🚀 Live Demo

[View Portfolio](https://abhijatsarari.github.io/vdcv/)

## 🛠️ Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** CSS Modules with custom design system
- **Animations:** CSS animations + Canvas API
- **Deployment:** GitHub Pages (Static Export)

## 📦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ABHIJATSARARI/vdcv.git

# Navigate to directory
cd vdcv

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

### Build for Production

```bash
# Build static export
npm run build

# The static files are in the 'out' directory
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_ADMIN_USER=your_username
NEXT_PUBLIC_ADMIN_PASS=your_password
```

### Customization

Edit `src/data/profile.ts` to update:
- Personal information
- Experience & projects
- Skills & certifications
- Social links

## 📁 Project Structure

```
src/
├── app/                # Next.js App Router pages
├── components/         # React components
│   ├── Hero.tsx        # Landing section
│   ├── Skills.tsx      # Neural network visualization
│   ├── Projects.tsx    # Holographic project cards
│   └── ...
├── data/              # Static data files
│   └── profile.ts      # Portfolio content
├── contexts/          # React contexts
├── lib/               # Utility functions
└── hooks/             # Custom React hooks
```

## 🎨 Themes

Switch themes using the palette icon:

| Theme | Description |
|-------|-------------|
| 🌃 Cyberpunk | Deep purples with cyan accents |
| 🌌 Aurora | Northern lights inspired |
| 💜 Neon | Vibrant pink and purple |
| ⬜ Minimal | Clean, subtle design |

## 🔐 Admin Dashboard

Access the secret admin panel at `/observatory-9x7k2m` to view and export your portfolio data.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contact

**Abhijat Sarari**
- Email: abhijatsarari@gmail.com
- LinkedIn: [abhijatsarari](https://linkedin.com/in/abhijatsarari)
- GitHub: [ABHIJATSARARI](https://github.com/ABHIJATSARARI)

---

Built with ❤️ and lots of ☕
