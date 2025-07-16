# CodeShuriken Frontend

A modern React-based frontend application for security scanning and vulnerability management.

## Technologies

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - Component-based UI library
- **shadcn/ui** - Modern component library
- **Tailwind CSS** - Utility-first CSS framework
- **Bun** - Fast JavaScript runtime and package manager

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Bun (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd codeshuriken-fe
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Start the development server:
```bash
bun dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

## Features

- **Dashboard** - Overview of security metrics and status
- **Scanning** - Security vulnerability scanning interface
- **SBOM** - Software Bill of Materials management
- **Reports** - Detailed security reports and analytics
- **Trend Analysis** - Historical data and trend visualization
- **Action Items** - Task management for security issues
- **Integrations** - Third-party service integrations

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── AppSidebar.tsx  # Application sidebar
│   └── Layout.tsx      # Main layout component
├── pages/              # Page components
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun preview` - Preview production build
- `bun lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
