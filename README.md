# Anime Frog

Discover and explore the wonderful world of anime! Anime Frog is a full-stack web application that allows users to browse, search, and learn more about their favorite anime series and movies. Built with a modern tech stack, it offers a clean and intuitive interface for anime enthusiasts.

---

## 🌟 Features

- **Browse Anime by Genre**: Explore anime categorized by genres.
- **Search Functionality**: Find your favorite series quickly.
- **Detailed Anime Information**: View comprehensive details about each anime, including characters.
- **Responsive & Clean UI**: Enjoy a seamless experience on any device.
- **Fast & Modern Stack**: Built with React, TypeScript, and Express.

---

## 🛠️ Tech Stack

**Frontend:**
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

**Backend:**
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Jikan API](https://jikan.moe/) (for anime data)

**Other:**
- Docker support for both client and server

---

## 📁 Folder Structure

```
Anime Frog/
  client/      # Frontend (React, Vite, Tailwind)
  server/      # Backend (Node.js, Express)
  README.md    # Project documentation (this file)
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone the Repository
```sh
git clone <YOUR_GIT_URL>
cd "Anime Frog"
```

### 2. Setup the Backend (Server)
```sh
cd server
npm install
# Start in development mode
npm run dev
# Or start normally
npm start
```
The server will run on [http://localhost:3000](http://localhost:3000) by default.

### 3. Setup the Frontend (Client)
```sh
cd ../client
npm install
npm run dev
```
The client will run on [http://localhost:8080](http://localhost:8080) by default.

---

## 🐳 Docker Usage

Both client and server have Dockerfiles for easy containerization.

### Build & Run Server with Docker
```sh
cd server
docker build -t anime-frog-server .
docker run -p 3000:3000 anime-frog-server
```

### Build & Run Client with Docker
```sh
cd client
docker build -t anime-frog-client .
docker run -p 8080:8080 anime-frog-client
```

---

## 🌐 Deployment

You can deploy Anime Frog using your preferred cloud provider, or via [Lovable](https://lovable.dev/projects/67bb27ba-9611-4036-9464-09504cc327bc) for instant hosting and custom domain support.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo, open issues, or submit pull requests.

1. Fork this repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📢 Feedback

We hope you enjoy exploring the amazing world of anime with Anime Frog! Your feedback and suggestions are always welcome.
