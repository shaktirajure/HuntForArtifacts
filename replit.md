# Replit.md

## Overview

This is an Artifact Hunter web application - a treasure hunting game that allows users to discover hidden artifacts through QR code scanning and participate in treasure hunts. The app features a modern React frontend with a Node.js/Express backend, designed as a Progressive Web App (PWA) with offline capabilities. Users can scan QR codes to collect artifacts, join treasure hunts, compete with other hunters, and administrators can manage artifacts and hunts through an admin panel.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight React router)
- **State Management**: TanStack Query for server state management and data fetching
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **PWA Features**: Service worker for offline caching, web app manifest for installability

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure with `/api` prefix for all endpoints
- **Development**: Hot reload with Vite development server integration
- **Storage Interface**: Abstracted storage layer with in-memory implementation (ready for database integration)

### Data Storage Solutions
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL with Neon serverless database integration
- **Schema**: User management schema with UUID primary keys
- **Migrations**: Drizzle Kit for schema migrations and database management
- **Current State**: In-memory storage implementation as placeholder for development

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **User Model**: Username/password authentication system
- **Security**: Prepared for secure session handling with database persistence

### External Dependencies
- **Database**: Neon PostgreSQL serverless database
- **UI Components**: Extensive Radix UI component library for accessibility
- **Development**: Replit-specific plugins for development environment integration
- **PWA**: Service worker and manifest configuration for mobile app-like experience
- **Icons**: Lucide React icon library
- **Date Handling**: date-fns for date manipulation
- **Form Handling**: React Hook Form with Zod validation through Hookform resolvers