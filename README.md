# 🏡 House Hunt Platform

A comprehensive family property research platform for Northern Adelaide suburbs. Built with Next.js 14, TypeScript, tRPC, Prisma, and Supabase for evidence-based house-buying decisions.

## ✨ Features

- **🤖 AI-Powered Property Analysis**: Automatic market comparison and overpricing detection
- **🚨 Deal-Breaker Detection**: Instant flagging of flood zones, 2-story properties, and requirements
- **📊 Market Intelligence**: Comprehensive suburb profiles with crime stats, school data, and growth projections
- **👨‍👩‍👧‍👦 Family Collaboration**: Real-time notes, @mentions, and collaborative decision-making
- **📚 Citation System**: Every fact backed by verifiable sources with confidence scores
- **📱 Mobile Friendly**: Responsive design for overseas family members

## 🎯 Family Requirements

### Budget & Location
- **Budget**: Under $900k asking price
- **Focus**: Northern Adelaide suburbs
- **Previous sale**: $823k

### Must-Have Features
- ✅ 2+ living areas
- ✅ 2+ bathrooms  
- ✅ Single story only
- ✅ Car accommodation (2+ cars)
- ✅ Dog-friendly backyard
- ✅ Solar panels installed

### Deal Breakers
- ❌ Flood zones (especially Angle Vale)
- ❌ 2-story properties
- ❌ No car accommodation
- ❌ Non-dog-friendly yards
- ❌ No solar panels
- ❌ Heavy traffic roads
- ❌ Overhead power lines

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/house-hunt.git
cd house-hunt

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Set up database
pnpm db:push

# Run development server
pnpm dev
```

Visit `http://localhost:3000` to start researching properties!

## 🎯 Core Features

### Property Management
- **URL-based Import**: Paste a Domain or RealEstate.com.au link to auto-populate property details
- **Status Tracking**: Manage properties through stages (Researching → Interested → Viewing → Offer → Purchased/Rejected)
- **Automatic Enrichment**: AI agents gather additional data from multiple sources
- **Photo Galleries**: Organized property photos with floor plans and virtual tours

### Collaborative Research
- **Real-time Notes**: Family members can add notes simultaneously (like Google Docs)
- **User Mentions**: Tag family members with @mentions for specific feedback
- **Pros/Cons Lists**: Structured decision-making with voting
- **Activity Timeline**: Track who added what information and when
- **Document Storage**: Attach inspection reports, contracts, and other files

### Suburb Intelligence
- **Comprehensive Profiles**: Demographics, crime stats, schools, transport, amenities
- **Market Analysis**: Median prices, growth trends, days on market
- **Risk Assessment**: Flood zones, development plans, infrastructure issues
- **Reusable Data**: Suburb profiles are cached and shared across properties

### Market Analysis
- **Overpricing Detection**: Automatic alerts when properties are above market value
- **Comparable Sales**: Find and analyze similar recent sales
- **Investment Metrics**: Rental yield, capital growth potential, cash flow analysis
- **Price History**: Track listing price changes over time

### AI Research Agents
- **Property Scraper**: Extracts data from real estate websites
- **Suburb Researcher**: Gathers area intelligence from government sources
- **Market Analyzer**: Processes sales data and trends
- **Citation Enforcer**: Ensures all facts have verifiable sources
- **Report Generator**: Creates professional PDF reports

## 🏗️ Tech Stack

- **[Next.js 14](https://nextjs.org)**: React framework with App Router
- **[TypeScript](https://typescriptlang.org)**: End-to-end type safety
- **[Prisma](https://prisma.io)**: Type-safe database ORM
- **[tRPC](https://trpc.io)**: Type-safe API layer
- **[NextAuth.js](https://next-auth.js.org)**: Authentication (Google/Email)
- **[Tailwind CSS](https://tailwindcss.com)**: Utility-first styling
- **[Supabase](https://supabase.com)**: PostgreSQL + real-time subscriptions
- **[Puppeteer](https://pptr.dev)**: Web scraping automation

## 📁 Project Structure

```
house-hunt/
├── src/
│   ├── app/                    # Next.js pages and layouts
│   ├── components/             # React components
│   ├── server/                 # Backend logic
│   │   ├── api/               # tRPC routers
│   │   ├── agents/            # AI research agents
│   │   └── db.ts              # Database client
│   └── utils/                  # Shared utilities
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                     # Static assets
├── docs/                       # Documentation
└── agents/                     # Claude sub-agent configs
```

## 🔧 Configuration

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# External APIs (optional)
DOMAIN_API_KEY="..."
OPENAI_API_KEY="..."

# Supabase (for real-time)
NEXT_PUBLIC_SUPABASE_URL="..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
```

### Database Setup

```bash
# Push schema to database
pnpm db:push

# Generate Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Open Prisma Studio
pnpm db:studio
```

## 📊 Database Schema

The platform uses PostgreSQL with the following core models:

- **User**: Family members with authentication
- **Property**: Real estate listings with all details
- **SuburbProfile**: Reusable area intelligence
- **Note**: Collaborative comments and observations
- **Analysis**: Generated reports and comparisons
- **Activity**: Audit trail of all actions

See [prisma/schema.prisma](prisma/schema.prisma) for the complete schema.

## 🤖 AI Agents

The platform uses specialized AI agents for research automation:

1. **property-listing-researcher**: Scrapes property details from listings
2. **suburb-intelligence**: Builds comprehensive area profiles
3. **market-analysis**: Analyzes pricing and trends
4. **citation-enforcer**: Ensures data accuracy with sources
5. **report-generator**: Creates professional documents

See [docs/AGENTS.md](docs/AGENTS.md) for detailed agent documentation.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy!

### Docker

```bash
# Build image
docker build -t house-hunt .

# Run container
docker run -p 3000:3000 --env-file .env.local house-hunt
```

## 📱 Mobile Support

The platform is fully responsive and works great on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Tablets (iPad, Android tablets)
- Mobile phones (iPhone, Android)

Perfect for family members overseas to stay involved!

## 🔒 Security

- Authentication via NextAuth.js (Google OAuth or magic links)
- Row-level security in Supabase
- Input validation and sanitization
- Secure API endpoints with tRPC
- Environment variables for secrets

## 🧪 Testing

```bash
# Run unit tests
pnpm test

# Run integration tests
pnpm test:integration

# Run E2E tests
pnpm test:e2e

# Type checking
pnpm type-check
```

## 📚 Documentation

- [Setup Guide](docs/SETUP.md) - Detailed installation instructions
- [Features](docs/FEATURES.md) - Complete feature documentation
- [Agents](docs/AGENTS.md) - AI agent specifications
- [API Reference](docs/API.md) - tRPC endpoint documentation
- [Contributing](docs/CONTRIBUTING.md) - Development guidelines

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- [T3 Stack](https://create.t3.gg/) for the amazing foundation
- [Vercel](https://vercel.com) for hosting
- [Supabase](https://supabase.com) for database and real-time
- Property data providers (Domain, RealEstate.com.au)

## 💬 Support

- [GitHub Issues](https://github.com/yourusername/house-hunt/issues) - Bug reports and feature requests
- [Discussions](https://github.com/yourusername/house-hunt/discussions) - General questions

---

Built with ❤️ for families making one of life's biggest decisions together.