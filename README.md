# Language Comparison - Java, Python, Go

An interactive React application that provides side-by-side code comparisons for Java, Python, and Go programming languages.

## Features

- Interactive tabs for different programming concepts (Basics, Datatypes, Visibility, Functions, Objects, Interfaces, GoF patterns, Errors, Concurrency)
- Side-by-side code examples for Java, Python, and Go
- Playground URL generator for Go and Python code
- Beautiful UI with Tailwind CSS and Framer Motion animations
- Responsive design

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:5173` (or another port if 5173 is busy).

### Building for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
language-comparison/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── card.jsx
│   │       ├── tabs.jsx
│   │       └── button.jsx
│   ├── JavaPythonGoCheatSheet.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Technologies Used

- React 18
- Vite (build tool)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Custom UI components

## License

MIT
