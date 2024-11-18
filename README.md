# Ohtter Blog

A modern, minimalist blog platform built with Next.js, featuring a sleek pill navigation powered by Framer Motion. Perfect for developers who want to start a personal blog with a modern UI/UX.

https://github.com/user-attachments/assets/e5a43c8e-7e13-4402-bb31-baec47c374b8

## ✨ Features

- 📝 MDX-based blog posts with frontmatter support
- 🎨 Modern pill navigation with:
  - Smooth animations using Framer Motion
  - Reading progress indicator
  - Collapsible table of contents
- 🖋 Built-in Markdown editor with:
  - Live preview
  - Frontmatter management
  - One-click export
- 🎭 Theme support:
  - Dark/Light mode toggle
  - Customizable color scheme
- 📱 Fully responsive design
- ⚡ Fast page loads with Next.js

## 🚀 Quick Start

1. Clone and install:

```
git clone https://github.com/garyku0/ohtter.git
cd ohtter
pnpm install
```

2. Start development:

```
pnpm dev
```

Visit http://localhost:3000 to see your blog.

## 📝 Creating Content

### Using the Editor

1. Navigate to `/editor` route
2. Fill in the frontmatter fields:
   - Title
   - Publish Date
   - Summary
   - Tags
   - Featured Image
3. Write your content in Markdown
4. Export to MDX file

### Manual Post Creation

Add .mdx files to `src/content/posts/` with frontmatter:

```
---
title: "Your Amazing Post"
publishedAt: "2024-01-01"
summary: "A brief description"
tags: ["nextjs", "react"]
image: "/optional-image.jpg"
---

Your content here...
```

## 🛠 Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS + Typography
- **Animations**: Framer Motion
- **Content**: MDX + Gray Matter
- **Syntax Highlighting**: Rehype Pretty Code
- **Icons**: Lucide React
- **Navigation**: Custom Pill Navigation Component

## 📦 Project Structure
```
src/
├── app/ # Next.js app router
├── components/ # React components
├── content/ # MDX blog posts
├── data/ # Data fetching utilities
└── lib/ # Utility functions
```
## ⚙️ Configuration

### Customizing Theme

Edit `tailwind.config.js` to modify:

- Color schemes
- Typography
- Spacing
- Breakpoints

### Blog Settings

Modify `src/app/layout.tsx` for:

- Site metadata
- Default SEO
- Global layouts

## 📄 License

MIT License - Feel free to use this for your own blog!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 💐 Acknowledgments

- Next.js team for the amazing framework
- Framer Motion for smooth animations (I think it's call motion now :) )
- Tailwind CSS for styling utilities
