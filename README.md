# NightProxy

A space-themed web proxy service that allows users to browse websites through a custom proxy interface with advanced redirection and content handling capabilities.

## Features

- Stylish space-themed UI with cosmic visual elements
- Proxied web browsing with JavaScript support
- WebSocket support for real-time browsing
- Mobile-responsive design
- Animated text and interactive elements

## Deploying to Glitch.com

### Option 1: Upload a Zip File

1. Download this entire project as a ZIP file
2. Go to [Glitch.com](https://glitch.com) and create a new project
3. Click "Import from GitHub" in the Glitch UI
4. Instead of entering a GitHub URL, scroll down and click "Upload a zip file"
5. Upload the ZIP file of this project
6. Glitch will automatically install the dependencies and start the server

### Option 2: Import from GitHub

If this project is on GitHub:

1. Go to [Glitch.com](https://glitch.com) and sign in
2. Create a new project
3. Click "Import from GitHub"
4. Enter the GitHub repository URL for this project
5. Glitch will import the project and automatically start it

## Environment Setup

The project includes a `.env` file and `glitch.json` for Glitch.com configuration. You shouldn't need to modify these files for a basic deployment.

## Running Locally

If you want to run the project locally:

```bash
npm install
npm run dev
```

The application will be available at http://localhost:5000

## Technology Stack

- React frontend
- Node.js/Express backend
- WebSocket for real-time communication
- TailwindCSS for styling