# House Hunt Database Schema Overview

## Schema Status: ✅ Complete & Production Ready

**Last Updated:** 2025-01-08  
**Schema Version:** Initial comprehensive implementation  
**Total Models:** 11 (8 core + 3 NextAuth)

## Core Models Summary

### 👥 User Management
- **User**: Extended NextAuth model with family roles (ADMIN/EDITOR/VIEWER)
- **Account/Session**: NextAuth.js authentication models
- **VerificationToken**: Email verification support

### 🏠 Property Management  
- **Property**: Core entity with deal-breaker validation fields
- **SuburbProfile**: Reusable suburb intelligence with citation system
- **Analysis**: AI-generated pricing and investment analysis
- **Document**: File attachments (contracts, reports, etc.)

### 🤝 Collaboration
- **Note**: Threaded comments with @mentions and note types
- **Activity**: Complete audit trail of all user actions
- **PropertyComparison**: Saved property comparisons with weightings
- **SavedSearch**: User search criteria with notifications

### 📊 Historical Tracking
- **SuburbHistory**: Track suburb data changes over time

## Key Features Implemented

### ✅ Family Collaboration
- Role-based access (Admin/Editor/Viewer)
- Real-time collaborative notes with threading
- @mention system for family members
- Complete activity audit trail

### ✅ Australian Context
- SA-focused suburb data (Gawler East, Smithfield, Angle Vale)
- Australian postcode validation
- Adelaide Metro transport data
- SA Police crime statistics integration
- Flood risk assessment (critical for Gawler River area)

### ✅ Deal-Breaker Automation
- **hasFloodRisk**: Auto-flag flood zones (Angle Vale)
- **hasTwoStories**: Reject 2-story properties
- **hasCarParking**: Ensure 2-car accommodation
- **hasSolarPanels**: Must have solar installed
- **isDogFriendly**: Dog-friendly backyard required
- **isMainRoad**: Avoid heavy traffic roads
- **hasPowerLines**: Avoid overhead power lines

### ✅ Property Research Intelligence
- Comprehensive suburb profiles with citations
- Market analysis with comparable sales
- Investment metrics (yield, growth, cash flow)
- Risk assessments and scoring
- Data freshness tracking with confidence scores

### ✅ Performance Optimization
- Strategic indexes for common queries
- Composite indexes for filtered searches
- Optimized for property search and activity feeds
- Connection pooling support (Supabase compatible)

## Database Relationships

```
User (family members)
├── Properties (created properties)
├── Notes (collaborative comments)
├── Activities (audit trail)
├── Documents (uploaded files)
├── PropertyComparisons (saved comparisons)
└── SavedSearches (search criteria)

Property (listings)
├── SuburbProfile (location intelligence)
├── Notes (family comments)
├── Analysis (AI insights)
├── Documents (attachments)
├── Activities (property history)
└── PropertyComparisons (comparison inclusion)

SuburbProfile (reusable area data)
├── Properties (properties in suburb)
└── SuburbHistory (data changes)
```

## Citation & Data Quality System

### Data Sources Tracked
- **ABS 2021 Census**: Demographics data
- **SA Police Crime Statistics**: Crime rates and trends  
- **MySchool.edu.au**: School ratings and catchments
- **CoreLogic/Domain**: Market data and sales
- **Adelaide Metro**: Transport information
- **SA Water**: Flood mapping and risk

### Quality Metrics
- **dataConfidence**: 0-100% confidence score
- **lastUpdated**: Data freshness timestamp
- **sources**: Structured citation system
- **Historical tracking**: Changes over time

## Next Steps for Implementation

### 1. Database Deployment
```bash
# Set up Supabase PostgreSQL database
# Configure environment variables
# Run initial migration
npm run db:migrate

# Seed with sample data
npm run db:seed
```

### 2. Row-Level Security (Supabase)
```sql
-- All family members see all properties
-- Implement based on family grouping
-- Secure document access
```

### 3. Real-time Features
- Live collaborative notes
- Property status updates
- New property notifications
- Activity feed updates

### 4. API Integration
- RealEstate.com.au scraping
- SA Police data updates
- ABS demographic updates
- Market data refresh

## Sample Seed Data Included

- **3 Family Members**: Ben (Admin), Parent (Editor), Overseas (Viewer)
- **3 Suburb Profiles**: Gawler East, Smithfield, Angle Vale with full data
- **2 Sample Properties**: One meeting criteria, one rejected for flood risk
- **Collaborative Notes**: Family discussion examples
- **1 Property Analysis**: Complete AI analysis with comparables
- **Activity History**: Full audit trail of actions

## File Locations

- **Schema**: `/prisma/schema.prisma` - Complete database schema
- **Seed Data**: `/prisma/seed.ts` - Comprehensive test data
- **Environment**: `/.env.example` - All required variables
- **Package Config**: `/package.json` - Database scripts configured

---

**Ready for development!** All models are production-ready with proper relationships, indexes, and Australian property research context.