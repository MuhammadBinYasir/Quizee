# 🎯 Quizee - Interactive Quiz Platform

Quizee is a full-stack interactive quiz platform that allows users to create, manage, attempt, and analyze quizzes. It provides authentication, quiz creation, quiz attempts, analytics, user profiles, scorecards, and more.

## ✨ Features

- 🔐 **User Authentication** - Secure account management with Clerk
- 📝 **Quiz Creation** - Create custom quizzes with multiple questions
- ✏️ **Quiz Editing** - Update and manage existing quizzes
- 🎯 **Quiz Attempts** - Take quizzes and test your knowledge
- 🏆 **Scorecards** - View quiz scores and results
- 📊 **Quiz Analytics** - Analyze quiz performance and statistics
- 📚 **Quiz History** - Keep track of previous quiz attempts
- 👤 **User Profiles** - View and manage user profiles
- 🌐 **Public Quizzes** - Explore quizzes created by other users
- 📁 **File Uploads** - Upload files using UploadThing
- 📱 **Responsive UI** - Optimized for different screen sizes
- 🎨 **Modern Interface** - Clean and interactive user experience
- ✨ **Animations** - Smooth UI animations with Framer Motion

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| ⚡ **Next.js 16** | Full-stack React framework |
| ⚛️ **React 19** | Frontend UI |
| 🔷 **TypeScript** | Type-safe development |
| 🍃 **MongoDB** | Database |
| 🗄️ **Mongoose** | MongoDB ODM |
| 🔑 **Clerk** | Authentication & user management |
| 🎨 **Tailwind CSS** | Styling |
| 🧩 **Radix UI** | Accessible UI components |
| 📋 **React Hook Form** | Form management |
| ✅ **Zod** | Schema validation |
| 📤 **UploadThing** | File uploads |
| 🎬 **Framer Motion** | Animations |
| 💡 **Lucide React** | Icons |

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have the following installed:

- 🟢 Node.js 24.x
- 📦 npm
- 🍃 MongoDB database
- 🔑 Clerk account
- 📤 UploadThing account

### 📥 Clone the Repository

```bash
git clone https://github.com/MuhammadBinYasir/Quizee.git
cd Quizee
```

### 📦 Install Dependencies

```bash
npm install
```

### 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

MONGODB_URI=

UPLOADTHING_TOKEN=
UPLOADTHING_APP_ID=
```

Fill these values with the credentials from your respective services.

### ▶️ Run the Development Server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## 📜 Available Scripts

### 💻 Development

```bash
npm run dev
```

Starts the Next.js development server.

### 🏗️ Build

```bash
npm run build
```

Creates an optimized production build.

### 🚀 Production

```bash
npm run start
```

Starts the application in production mode.

### 🔍 Lint

```bash
npm run lint
```

Runs the project's linting command.

## 📂 Project Structure

```text
Quizee/
├── app/
│   ├── api/
│   ├── ...
│   └── layout.tsx
├── components/
├── lib/
├── models/
├── public/
├── types/
├── middleware.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

> 📌 The project structure may evolve as development continues.

## 🔐 Authentication

Quizee uses **Clerk** for authentication and user management.

Authentication is used for features such as:

- 👤 User registration
- 🔑 Login
- 🛡️ Protected application features
- 📝 User-specific quiz management
- 👤 User profiles

## 🍃 Database

**MongoDB** is used as the primary database, with **Mongoose** providing schema modeling and database interaction.

Configure the database connection using:

```env
MONGODB_URI=
```

## 📤 File Uploads

**UploadThing** is used for handling file uploads.

Required configuration is provided through environment variables.

## 🔀 Development Workflow

The project uses multiple branches for development and releases:

```text
       🌱 Feature Branch
              ↓
          🛠️ dev
              ↓
          🧪 beta
              ↓
          🚀 main
```

- 🛠️ **dev** - Latest development changes
- 🧪 **beta** - Pre-release/testing branch
- 🚀 **main** - Production branch

## 🤝 Contributing

Contributions and improvements are welcome.

### 🌱 Create a Feature Branch

```bash
git checkout dev
git checkout -b feature/your-feature
```

### 💾 Commit Your Changes

```bash
git add .
git commit -m "feat: describe your change"
```

### 📤 Push Your Branch

```bash
git push origin feature/your-feature
```

Then create a pull request for review.

## 📌 Project Status

🚧 **Quizee is currently under active development.**

Features, UI components, APIs, and project architecture may continue to evolve as the project grows.

## 👨‍💻 Author

**Muhammad Bin Yasir**

🔗 GitHub: [MuhammadBinYasir](https://github.com/MuhammadBinYasir)

## 📄 License

License information will be added when a license is defined for the project.

---

⭐ **If you find Quizee interesting, consider giving the repository a star!**
