# 🎨 WallForge AI

WallForge AI is a modern AI-powered wallpaper generator that transforms simple text prompts into stunning, high-quality wallpapers. It uses **Google Gemini AI** for prompt enhancement and **Cloudflare Workers AI (FLUX)** for lightning-fast image generation.

🌐 **Live Demo:** https://wallforge-ai.vercel.app/

---

## ✨ Features

- 🖼️ AI Wallpaper Generation
- 🤖 Prompt Enhancement using Google Gemini AI
- ⚡ High-Speed Image Generation with Cloudflare Workers AI (FLUX)
- 📱 Fully Responsive Design
- 🎨 Multiple Wallpaper Styles
- 📥 Download Generated Wallpapers
- 🕒 Wallpaper History
- 🌙 Modern Glassmorphism UI
- 🚀 Fast Deployment on Vercel

---

## 🛠️ Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion

### AI Services
- Google Gemini AI
- Cloudflare Workers AI (FLUX)

### Deployment
- Vercel

---

## 📸 Screenshots

### Home Page

<img width="100%" alt="WallForge AI" src="https://wallforge-ai.vercel.app/">

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/pratham655/wallforge-ai.git
```

```bash
cd wallforge-ai
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Create Environment Variables

Create a `.env.local` file and add:

```env
GOOGLE_API_KEY=YOUR_GEMINI_API_KEY

CLOUDFLARE_API_TOKEN=YOUR_CLOUDFLARE_API_TOKEN

CLOUDFLARE_ACCOUNT_ID=YOUR_CLOUDFLARE_ACCOUNT_ID
```

---

### 4. Run the Development Server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

## 📂 Project Structure

```
wallforge-ai/
│
├── app/
│   ├── api/
│   └── page.tsx
│
├── components/
│   ├── Hero
│   ├── Navbar
│   ├── Footer
│   ├── PromptBox
│   ├── History
│   └── UI Components
│
├── public/
│
├── styles/
│
├── lib/
│
└── README.md
```

---

## ⚙️ How It Works

1. User enters a wallpaper prompt.
2. Gemini AI enhances the prompt.
3. Enhanced prompt is sent to Cloudflare Workers AI.
4. FLUX generates a high-quality wallpaper.
5. Wallpaper is displayed instantly.
6. User can download or revisit it from history.

---

## 📦 APIs Used

### Google Gemini AI

- Prompt Enhancement

### Cloudflare Workers AI

- FLUX Image Generation

---

## 📈 Future Improvements

- Image Upscaling
- AI Style Presets
- User Authentication
- Cloud Gallery
- Favorite Wallpapers
- Wallpaper Collections
- Image Variations
- Prompt Templates
- Social Sharing
- Mobile PWA Support

---

## 💻 Author

**Pratham S**

GitHub

https://github.com/pratham655




## 📄 License

This project is licensed under the MIT License.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
