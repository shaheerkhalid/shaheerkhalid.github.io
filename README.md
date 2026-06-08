# UAE Classifieds 🇦🇪

A modern classifieds platform for the UAE — buy and sell cars, property, electronics, jobs, and more across all seven Emirates.

**Live at:** [shaheerkhalid.github.io](https://shaheerkhalid.github.io)

## Features

- 🔍 Full-text search with category, city, and price filters
- 📱 Mobile-responsive design
- 🇦🇪 UAE-focused: Dubai, Abu Dhabi, Sharjah, and all Emirates
- 🌐 Bilingual support (English/Arabic)
- 🔒 Security-first architecture (Argon2id, JWT, CSP, CSRF)
- 📊 Admin dashboard with moderation queue

## Tech Stack

- **Frontend:** Next.js 16 / React / TypeScript / Tailwind CSS
- **Backend:** NestJS / PostgreSQL / Elasticsearch / Redis / BullMQ
- **Infrastructure:** Docker / Kubernetes / GitHub Actions CI/CD

## Architecture

See [shaheerkhalid/classified](https://github.com/shaheerkhalid/classified) for full architecture documentation:

- System Architecture Diagram
- Threat Model (STRIDE)
- Database Schema
- API Specification
- Security Design Review
- Deployment Architecture
- Monitoring & Observability

Built with security-first principles. All passwords hashed with Argon2id. JWT with refresh rotation. RBAC. OWASP-compliant.
