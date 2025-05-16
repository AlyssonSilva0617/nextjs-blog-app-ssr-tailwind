# 📰 My Blog App

A modern blog viewer built with **Next.js** and powered by the [JSONPlaceholder API](https://jsonplaceholder.typicode.com). This app demonstrates good frontend development practices using SSR (Server-Side Rendering) and a clean, responsive UI.

## 🌍 Project Structure

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### 📦 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/AlyssonSilva0617/nextjs-blog-app-ssr-tailwind.git

cd my-blog-app

npm install
# or
yarn install

npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🚀 Live Demo

**Production**: [https://blog-site-eosin.vercel.app](https://blog-site-eosin.vercel.app)

**Repository**: [https://github.com/AlyssonSilva0617/nextjs-blog-app-ssr-tailwind.git](https://github.com/AlyssonSilva0617/nextjs-blog-app-ssr-tailwind.git)

---

## 📂 Features

- 🏠 **Home Page**: List of all posts with titles and summaries
- 📄 **Post Page** (`src/app/posts/[id]`): View full post content, author info, and all comments
- 👤 **User Page** (`src/app/users/[id]`): View author details and a list of their posts
- ⚡ Fast and SEO-friendly with SSR
- 📱 Fully responsive and accessible UI
- 🎨 Styled using Tailwind CSS and Ant Design components

---

## 🔧 Technologies Used

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Ant Design 5](https://ant.design/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Type Safety**: TypeScript
- **Code Quality**: ESLint + Prettier

---
