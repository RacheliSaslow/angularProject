# ClientAngular 🚀

[![Angular](https://img.shields.io/badge/Angular-18.1.0-DD0031?style=for-the-badge&logo=angular)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=for-the-badge&logo=render)](https://angularproject-jkks.onrender.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

A modern, scalable Angular client application built with the latest Angular CLI, featuring Server-Side Rendering (SSR) and JWT authentication support. Perfect for building robust web applications with a focus on performance and developer experience.

## ✨ Features

- **Server-Side Rendering (SSR)**: Improved SEO and initial load performance
- **JWT Authentication**: Secure token-based authentication with `jwt-decode`
- **Modern Angular**: Built with Angular 18.1.0, leveraging the latest features
- **TypeScript**: Full type safety and enhanced developer productivity
- **Express Integration**: Backend rendering capabilities
- **Comprehensive Testing**: Unit tests with Karma and Jasmine
- **Hot Module Replacement**: Fast development with automatic reloading

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Angular CLI** (version 18.1.0 or higher)

```bash
# Check versions
node --version
npm --version
ng version
```

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ClientAngular
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🚀 Development

### Start Development Server

Run the development server with hot reload:

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The app will automatically reload when you make changes to source files.

### Server-Side Rendering Development

To run the SSR version locally:

```bash
npm run serve:ssr:ClientAngular
```

## 🏗️ Build

### Production Build

Build the project for production:

```bash
npm run build
# or
ng build
```

The build artifacts will be stored in the `dist/` directory.

### SSR Build

For server-side rendering build:

```bash
ng build --configuration production
```

## 🧪 Testing

### Unit Tests

Run unit tests with Karma:

```bash
npm test
# or
ng test
```

### End-to-End Tests

Run end-to-end tests:

```bash
ng e2e
```

*Note: You'll need to add an e2e testing package first.*

## 📁 Project Structure

```
ClientAngular/
├── src/
│   ├── app/          # Main application code
│   ├── assets/       # Static assets
│   ├── environments/ # Environment configurations
│   └── index.html    # Main HTML file
├── dist/             # Build output
├── server.ts         # SSR server configuration
└── package.json      # Dependencies and scripts
```

## 🔧 Code Scaffolding

Generate new components and services using Angular CLI:

```bash
# Generate a new component
ng generate component my-component

# Generate other Angular elements
ng generate directive|pipe|service|class|guard|interface|enum|module
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For more help with Angular CLI:

```bash
ng help
```

Or check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

---

**Happy Coding! 🎉**
