# Smart Task Manager with AI Assistance

A modern web application built with Next.js that helps break tasks into subtasks with AI assistance, including features like task creation, editing, and deletion.

## Features

- 📝 View tasks
- ➕ Create tasks
- ✏️ Edit tasks
- ❌ Delete tasks
- 🤖 AI-assisted suggestions for subtasks
- 💅 Responsive design

## Live Demo

Check out the live demo [Click here](https://task-manager-ai-assistance.vercel.app).

## Interface Preview

![Interface Preview](/public/preview-1.png)
![Interface Preview](/public/preview-2.png)

## Project Breakdown

- **View Tasks**: Displays a list of all tasks with their details.
- **Add Task**: Allows users to create new tasks with AI assistance for subtasks.
- **Edit Task**: Users can modify existing tasks.
- **Delete Task**: Users can remove tasks they no longer need.
- **AI Assistance**: Uses `Google Gemini API` to suggest subtasks based on the main task title and description.
- **Error Handling**: Displays `alerts` for API failures.
- **Form Validation**: Uses `React Hook Form` for managing form state and validation.
- **Context API**: Utilizes React's `Context API` for state management across components.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components for React
- [React Hook Form](https://react-hook-form.com/) - Easy form management in React
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript for better development experience
- [Google Gemini API](https://aistudio.google.com/app/apikey) - AI service for

## Getting Started

### Prerequisites

- React
- Tailwind CSS
- AI Service (Google Gemini API)
- npm or yarn
- pnpm (optional, but recommended for package management)
- node.js

### Installation

1. Clone the repository

```
git clone https://github.com/hazzaz-am/task-manager-ai-assistance
```

2. Install dependencies:

```
pnpm install
```

2. Run project locally:

```
pnpm run dev
```

## 🙋‍♂️ About Me

I'm `Hazzaz Abdul Mannan`, a passionate frontend developer with a focus on building clean, interactive, and user-friendly interfaces. I enjoy learning new technologies and continuously improving my skills. This project helped me explore how to integrate `Next.js` with `AI services`.
