[![CodeQL](https://github.com/ngmisl/unternet-tarot-fc-frame/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/ngmisl/unternet-tarot-fc-frame/actions/workflows/github-code-scanning/codeql)

# Tarot Card Reader - Farcaster Frame

A modern tarot card reading app built with TypeScript that works both as a standalone web application and as a Farcaster Frame. Draw cards from the deck to reveal your fortune!

> **Note:** This project is forked from [Unternet Applets](https://github.com/unternet-co/applets/tree/main) with numerous enhancements including Zod validation, improved TypeScript safety, and Farcaster Frame integration.

## Features

- **Random Tarot Card Drawing**: Fetch random cards from a tarot deck API
- **Type-Safe**: Built with TypeScript and Zod for robust validation
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Fast Performance**: Built with Vite and Bun for optimal speed
- **Farcaster Frame Integration**: Share and interact with this app directly in Farcaster

## Enhancements Over Original

This fork includes several improvements to the original Unternet applet:

- **Added Zod Validation**: Robust schema validation for API responses
- **Improved Type Safety**: Better TypeScript types and interfaces
- **Mobile Responsiveness**: Enhanced UI for better mobile experience
- **Farcaster Integration**: Added support for Farcaster Frames
- **Build System**: Migrated to Vite and Bun for better performance

## Tech Stack

- **Frontend**: TypeScript, HTML, CSS
- **Build Tools**: Vite, Bun
- **Validation**: Zod for schema validation
- **Applet SDK**: @web-applets/sdk
- **Social Integration**: Farcaster Frame SDK

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/tarot.git

# Install dependencies
cd tarot
bun install

# Start the development server
bun run dev

# Build for production
bun run build
```

## Farcaster Integration

This app includes Farcaster Frame integration, allowing it to be displayed and interacted with directly in Farcaster clients. The Frame configuration is located in `public/.well-known/farcaster.json`.

To update the Farcaster credentials for your own deployment:

1. Open Warpcast on your phone
2. Go to Settings > Developer > Domains
3. Enter your domain (e.g., tarot.orbiter.website)
4. Generate domain manifest
5. Replace the placeholders in `.well-known/farcaster.json` with your actual credentials

## Deployment

The app is optimized for deployment on platforms like Orbiter or any static web hosting service:

```bash
# Build the project
bun run build

# Deploy the dist folder to your hosting provider
```

## License

MIT

---

Made with <3 for the Unternet
