# Seonergy - Digital Agency Website

## Overview

Seonergy is a creative digital agency website showcasing web design, SEO, and development services. The project is a modern single-page application built with React and TypeScript, featuring an avant-garde design inspired by Apple's minimalism combined with creative agency aesthetics. The site includes animated sections for hero content, services, projects, process timeline, and contact forms, all styled with a dark theme and corporate yellow-gold branding (#fdc408).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query (React Query) for server state management
- Framer Motion for animations and transitions

**UI Framework:**
- shadcn/ui component library (Radix UI primitives with Tailwind CSS)
- Custom "new-york" style variant
- Tailwind CSS for styling with custom design tokens
- CSS variables for theming support

**Design System:**
- Typography: Space Grotesk (display/titles), Inter (body), JetBrains Mono (code accents)
- Color Palette: Dark base (220 15% 8%), Primary yellow-gold (#fdc408), Cyan accent for tech elements
- Spacing: Consistent Tailwind units (4, 8, 12, 16, 20, 24, 32)
- Component structure: Cards, sections with gradient overlays, fullscreen menu

**Key Components:**
- Header: Fixed position with backdrop blur and menu toggle
- FullscreenMenu: Animated navigation overlay with social links
- HeroSection: Fullscreen video background with gradient overlays
- ServicesSection: Grid layout showcasing three core services
- ProjectsShowcase: Portfolio items with hover effects
- ProcessTimeline: Four-step methodology visualization
- CTASection: Contact form with gradient backgrounds
- Footer: Multi-column layout with company info and social links

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- Custom middleware for request logging and error handling
- Vite middleware integration for development mode
- Static file serving for production builds

**Development Setup:**
- Hot Module Replacement (HMR) via Vite in development
- Custom logging system with timestamps
- Request/response tracking for API endpoints
- Error boundary with status code handling

**Storage Layer:**
- In-memory storage implementation (MemStorage class)
- Interface-based design (IStorage) for easy swapping
- User management (CRUD operations)
- UUID-based ID generation

**API Structure:**
- RESTful endpoints prefixed with `/api`
- JSON request/response format
- Session-based credentials handling
- Centralized query client configuration

### Data Architecture

**Database Schema (Drizzle ORM):**
- PostgreSQL dialect configuration
- Schema definition in `shared/schema.ts` for code sharing between client/server
- Users table with UUID primary keys, username (unique), and password fields
- Zod integration for runtime validation via drizzle-zod
- Migrations stored in `./migrations` directory

**Validation:**
- Zod schemas for type-safe data validation
- `insertUserSchema` for user creation validation
- Shared TypeScript types (`InsertUser`, `User`) derived from schema

### Build and Deployment

**Development:**
- `npm run dev` starts tsx server with Vite middleware
- Hot reload for both client and server code
- Source maps and error overlays enabled

**Production:**
- Client bundle: Vite builds to `dist/public`
- Server bundle: esbuild bundles Express server to `dist`
- ESM module format throughout
- Static asset serving from built client

**TypeScript Configuration:**
- Path aliases: `@/*` (client src), `@shared/*` (shared types), `@assets/*` (attached assets)
- Strict mode enabled
- Incremental compilation with build cache
- No emit mode (bundlers handle compilation)

## External Dependencies

### UI Component Libraries
- **Radix UI**: Unstyled, accessible component primitives (accordion, dialog, dropdown, popover, select, tabs, toast, tooltip, navigation-menu, etc.)
- **shadcn/ui**: Pre-built component collection built on Radix UI and Tailwind
- **Framer Motion**: Animation library for React components
- **Embla Carousel**: Touch-friendly carousel component
- **cmdk**: Command menu component for keyboard shortcuts

### Form Management
- **React Hook Form**: Form state management and validation
- **@hookform/resolvers**: Validation resolver for Zod integration

### Database & ORM
- **Drizzle ORM**: TypeScript ORM with schema-first design
- **drizzle-kit**: Migration management and schema push utilities
- **drizzle-zod**: Automatic Zod schema generation from Drizzle schemas
- **@neondatabase/serverless**: Serverless PostgreSQL driver (Neon Database)

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for components
- **clsx** & **tailwind-merge**: Conditional className utilities

### Utilities
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation
- **lucide-react**: Icon library

### Fonts
- **Google Fonts CDN**: Space Grotesk, Inter, JetBrains Mono loaded via link tags in HTML

### Development Tools
- **Replit Plugins**: Cartographer (code navigation), dev banner, runtime error modal for enhanced development experience
- **TypeScript**: Static type checking with strict mode
- **ESBuild**: Fast server bundling for production