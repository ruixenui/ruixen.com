# 🌟 Ruixen UI

Beautifully crafted, production-ready UI components and templates built with **Next.js 14**, **Tailwind CSS**, **TypeScript**, and **Framer Motion**. Featuring an integrated sandbox environment for rapid component development and testing.

![Ruixen UI Screenshot](https://ruixen.com/ruixen_dark.png)

## ✨ Features

### Core Features
- 🚀 **Modern Component Library**: 50+ production-ready components
- 🎨 **Design System**: Built with Tailwind CSS for easy theming and customization
- 🧩 **Interactive Sandbox**: Built-in development environment for component testing
- 📱 **Fully Responsive**: Components adapt to all screen sizes
- ⚡ **Performance Optimized**: Built with Next.js 14 App Router
- 🔍 **Type-Safe**: Full TypeScript support

### Sandbox Environment
- 🛠️ **Component Playground**: Test components in isolation
- 🔄 **Live Reloading**: See changes in real-time
- 📁 **File System Simulation**: In-memory file system for rapid development
- 📦 **Template System**: Quick start with pre-configured component templates
- 🌐 **Shareable URLs**: Share component states via URL

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm 9.x or later
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ruixenui/ruixen.com.git
   cd ruixen.com
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🧩 Component Structure

Components are organized by category in the `app/sections` directory:

```
app/
  sections/
    navbar/         # Navigation components
    hero/           # Hero section components
    features/       # Feature showcase components
    testimonials/   # Testimonial components
    cta/            # Call-to-action components
    footer/         # Footer components
```

Each component is self-contained with its own:
- TypeScript types
- Storybook stories
- Unit tests
- Documentation

## 🛠️ Sandbox Development

The integrated sandbox allows you to develop and test components in isolation:

1. Navigate to the component you want to test
2. Click the "Open in Sandbox" button
3. The sandbox will automatically load with the component and its dependencies
4. Make changes and see updates in real-time

### Sandbox API

- `POST /api/sandbox/new` - Create a new sandbox
- `POST /api/sandbox/connect` - Connect to an existing sandbox
- `GET /api/sandbox/[sandboxId]/files` - List files in sandbox
- `GET/PUT/DELETE /api/sandbox/[sandboxId]/files/[...filePath]` - File operations

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

## 📚 Documentation

For detailed documentation, visit [https://ruixen.com/docs](https://ruixen.com/docs)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌐 Connect

- [Website](https://ruixen.com)
- [GitHub](https://github.com/ruixenui)
- [Twitter](https://x.com/ruixenui)

---

Built with ❤️ by the Ruixen UI Team
