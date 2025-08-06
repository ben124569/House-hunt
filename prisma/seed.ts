import { PrismaClient, UserRole, PropertyType, PropertyStatus, RiskLevel } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Create test users (family members)
  const adminUser = await prisma.user.upsert({
    where: { email: "ben@family.com" },
    update: {},
    create: {
      email: "ben@family.com",
      name: "Ben Merritt",
      role: UserRole.ADMIN,
      preferences: {
        maxPrice: 900000,
        preferredSuburbs: ["Gawler East", "Smithfield", "Elizabeth"],
        notifications: {
          email: true,
          push: true
        }
      },
      timezone: "Australia/Adelaide"
    }
  });

  const parentUser = await prisma.user.upsert({
    where: { email: "parent@family.com" },
    update: {},
    create: {
      email: "parent@family.com",
      name: "Parent Merritt",
      role: UserRole.EDITOR,
      preferences: {
        maxPrice: 900000,
        mustHave: ["single_story", "two_living_areas", "solar_panels"]
      },
      timezone: "Australia/Adelaide"
    }
  });

  const overseasUser = await prisma.user.upsert({
    where: { email: "overseas@family.com" },
    update: {},
    create: {
      email: "overseas@family.com",
      name: "Overseas Family",
      role: UserRole.VIEWER,
      preferences: {
        currency: "AUD",
        receiveWeeklyUpdates: true
      },
      timezone: "Europe/London"
    }
  });

  console.log("Created users:", { adminUser: adminUser.id, parentUser: parentUser.id, overseasUser: overseasUser.id });

  // Create suburb profiles for Northern Adelaide
  const gawlerEast = await prisma.suburbProfile.upsert({
    where: {
      name_state_postcode: {
        name: "Gawler East",
        state: "SA",
        postcode: "5118"
      }
    },
    update: {},
    create: {
      name: "Gawler East",
      state: "SA",
      postcode: "5118",
      latitude: -34.6036,
      longitude: 138.7514,
      population: 8500,
      medianAge: 35.2,
      medianIncome: 75000,
      demographics: {
        families: 65,
        youngProfessionals: 25,
        retirees: 10
      },
      schools: [
        {
          name: "Gawler East Primary School",
          type: "Primary",
          rating: 4.2,
          distance: 0.8
        },
        {
          name: "Trinity College Gawler",
          type: "Secondary",
          rating: 4.0,
          distance: 1.2
        }
      ],
      crimeStats: {
        overall: "LOW",
        theft: 2.1,
        assault: 1.8,
        vandalism: 1.5,
        trend: "improving"
      },
      transport: {
        busRoutes: ["547", "548"],
        trainStation: "Gawler Central",
        trainDistance: 2.5
      },
      commuteTime: {
        adelaideCBD: 45,
        elizabethShoppingCentre: 15,
        modburyHospital: 25
      },
      amenities: {
        shopping: ["Gawler Green Shopping Centre", "Willaston Village"],
        healthcare: ["Gawler Health Service", "Barossa Hills Medical Centre"],
        recreation: ["Gawler River", "Civic Park", "Golf Course"]
      },
      medianHousePrice: 680000,
      medianUnitPrice: 420000,
      rentalYield: 4.2,
      growthRate: 8.5,
      daysOnMarket: 28,
      marketData: {
        salesVolume: 245,
        priceGrowth12Month: 8.5,
        rentGrowth12Month: 4.1
      },
      floodRisk: RiskLevel.LOW,
      bushfireRisk: RiskLevel.LOW,
      sources: {
        demographics: "ABS 2021 Census",
        crime: "SA Police Crime Statistics 2023",
        schools: "MySchool.edu.au",
        market: "CoreLogic/Domain Nov 2024",
        transport: "Adelaide Metro"
      },
      dataConfidence: 92.5,
      lastUpdated: new Date()
    }
  });

  const smithfield = await prisma.suburbProfile.upsert({
    where: {
      name_state_postcode: {
        name: "Smithfield",
        state: "SA",
        postcode: "5114"
      }
    },
    update: {},
    create: {
      name: "Smithfield",
      state: "SA", 
      postcode: "5114",
      latitude: -34.6854,
      longitude: 138.6832,
      population: 12400,
      medianAge: 38.7,
      medianIncome: 68000,
      demographics: {
        families: 58,
        youngProfessionals: 32,
        retirees: 10
      },
      schools: [
        {
          name: "Smithfield Primary School",
          type: "Primary", 
          rating: 3.8,
          distance: 0.6
        },
        {
          name: "Mark Oliphant College",
          type: "Secondary",
          rating: 4.1,
          distance: 1.8
        }
      ],
      crimeStats: {
        overall: "MEDIUM",
        theft: 3.2,
        assault: 2.8,
        vandalism: 2.1,
        trend: "stable"
      },
      transport: {
        busRoutes: ["400", "405", "407"],
        trainStation: "Smithfield",
        trainDistance: 0.5
      },
      commuteTime: {
        adelaideCBD: 35,
        elizabethShoppingCentre: 8,
        modburyHospital: 20
      },
      amenities: {
        shopping: ["Elizabeth Shopping Centre", "Northern Adelaide Shopping Centre"],
        healthcare: ["Lyell McEwin Hospital", "Northern Districts GP"],
        recreation: ["Central District Park", "Edinburgh Parks Lake"]
      },
      medianHousePrice: 580000,
      medianUnitPrice: 350000,
      rentalYield: 4.8,
      growthRate: 6.2,
      daysOnMarket: 35,
      marketData: {
        salesVolume: 380,
        priceGrowth12Month: 6.2,
        rentGrowth12Month: 5.2
      },
      floodRisk: RiskLevel.LOW,
      bushfireRisk: RiskLevel.LOW,
      sources: {
        demographics: "ABS 2021 Census", 
        crime: "SA Police Crime Statistics 2023",
        schools: "MySchool.edu.au",
        market: "CoreLogic/Domain Nov 2024",
        transport: "Adelaide Metro"
      },
      dataConfidence: 89.0,
      lastUpdated: new Date()
    }
  });

  const angleVale = await prisma.suburbProfile.upsert({
    where: {
      name_state_postcode: {
        name: "Angle Vale",
        state: "SA",
        postcode: "5117"
      }
    },
    update: {},
    create: {
      name: "Angle Vale",
      state: "SA",
      postcode: "5117", 
      latitude: -34.6425,
      longitude: 138.6725,
      population: 9200,
      medianAge: 32.1,
      medianIncome: 72000,
      demographics: {
        families: 72,
        youngProfessionals: 20,
        retirees: 8
      },
      schools: [
        {
          name: "Angle Vale Primary School",
          type: "Primary",
          rating: 3.9,
          distance: 1.2
        }
      ],
      crimeStats: {
        overall: "LOW", 
        theft: 1.9,
        assault: 1.4,
        vandalism: 1.2,
        trend: "stable"
      },
      transport: {
        busRoutes: ["551"],
        trainStation: "Gawler Central",
        trainDistance: 8.5
      },
      commuteTime: {
        adelaideCBD: 50,
        elizabethShoppingCentre: 20,
        modburyHospital: 35
      },
      amenities: {
        shopping: ["Limited local shops"],
        healthcare: ["Angle Vale Medical Centre"],
        recreation: ["Virginia Pipeline Trail", "Parks and reserves"]
      },
      medianHousePrice: 650000,
      medianUnitPrice: 380000,
      rentalYield: 4.5,
      growthRate: 12.8,
      daysOnMarket: 22,
      marketData: {
        salesVolume: 185,
        priceGrowth12Month: 12.8,
        rentGrowth12Month: 6.8
      },
      floodRisk: RiskLevel.HIGH, // Critical: Gawler River flood zone
      bushfireRisk: RiskLevel.MEDIUM,
      developments: {
        planned: ["Angle Vale Township expansion", "New shopping precinct 2025-2027"]
      },
      sources: {
        demographics: "ABS 2021 Census",
        crime: "SA Police Crime Statistics 2023", 
        schools: "MySchool.edu.au",
        market: "CoreLogic/Domain Nov 2024",
        flood: "SA Water Flood Mapping 2024"
      },
      dataConfidence: 85.5,
      lastUpdated: new Date()
    }
  });

  console.log("Created suburb profiles:", { 
    gawlerEast: gawlerEast.id, 
    smithfield: smithfield.id, 
    angleVale: angleVale.id 
  });

  // Create sample properties
  const property1 = await prisma.property.create({
    data: {
      url: "https://www.realestate.com.au/property-house-sa-gawler+east-123456",
      address: "45 Willow Street, Gawler East SA 5118",
      suburb: "Gawler East",
      state: "SA",
      postcode: "5118",
      priceDisplay: "$750,000",
      priceMin: 750000,
      priceMax: 750000,
      bedrooms: 4,
      bathrooms: 2,
      parking: 2,
      landSize: 650,
      propertyType: PropertyType.HOUSE,
      status: PropertyStatus.INTERESTED,
      description: "Beautiful family home featuring 4 bedrooms, 2 bathrooms, 2 living areas, and solar panels. Located in a quiet street with a dog-friendly backyard.",
      features: [
        "4 bedrooms",
        "2 bathrooms", 
        "2 living areas",
        "Solar panels",
        "Dog-friendly yard",
        "Single story",
        "Drive-through garage",
        "Established gardens"
      ],
      images: [
        { url: "image1.jpg", caption: "Front of house", isPrimary: true },
        { url: "image2.jpg", caption: "Living area", isPrimary: false },
        { url: "image3.jpg", caption: "Kitchen", isPrimary: false }
      ],
      agentName: "Sarah Johnson",
      agentAgency: "Ray White Gawler", 
      agentPhone: "0412 345 678",
      agentEmail: "sarah@raywhitegawler.com.au",
      hasFloodRisk: false,
      hasTwoStories: false,
      hasCarParking: true,
      hasSolarPanels: true,
      isDogFriendly: true,
      isMainRoad: false,
      hasPowerLines: false,
      listingId: "123456",
      listedDate: new Date("2024-01-15"),
      daysOnMarket: 12,
      createdById: adminUser.id,
      suburbId: gawlerEast.id,
      statusHistory: [
        {
          status: "RESEARCHING",
          date: "2024-01-20T10:00:00Z",
          userId: adminUser.id,
          note: "Initial property found"
        },
        {
          status: "INTERESTED", 
          date: "2024-01-22T14:30:00Z",
          userId: adminUser.id,
          note: "Meets all criteria - scheduling inspection"
        }
      ]
    }
  });

  const property2 = await prisma.property.create({
    data: {
      url: "https://www.realestate.com.au/property-house-sa-angle+vale-789012",
      address: "12 River Bend Drive, Angle Vale SA 5117", 
      suburb: "Angle Vale",
      state: "SA",
      postcode: "5117",
      priceDisplay: "$680,000-$720,000",
      priceMin: 680000,
      priceMax: 720000,
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      landSize: 580,
      propertyType: PropertyType.HOUSE,
      status: PropertyStatus.REJECTED,
      description: "Modern 3 bedroom home with 2 bathrooms. Close to parks and schools.",
      features: [
        "3 bedrooms",
        "2 bathrooms",
        "Open plan living", 
        "Double garage",
        "Low maintenance yard"
      ],
      images: [
        { url: "image4.jpg", caption: "Street view", isPrimary: true }
      ],
      agentName: "Mark Thompson",
      agentAgency: "Professionals Gawler",
      agentPhone: "0412 987 654",
      agentEmail: "mark@professionalsggawler.com.au",
      hasFloodRisk: true, // Deal breaker - Angle Vale flood zone
      hasTwoStories: false,
      hasCarParking: true,
      hasSolarPanels: false, // Deal breaker - no solar
      isDogFriendly: true,
      isMainRoad: false,
      hasPowerLines: false,
      listingId: "789012",
      listedDate: new Date("2024-01-10"),
      daysOnMarket: 18,
      createdById: adminUser.id,
      suburbId: angleVale.id,
      statusHistory: [
        {
          status: "RESEARCHING",
          date: "2024-01-18T09:00:00Z", 
          userId: adminUser.id,
          note: "Found property in budget"
        },
        {
          status: "REJECTED",
          date: "2024-01-18T09:15:00Z",
          userId: adminUser.id,
          note: "Rejected due to flood risk and no solar panels"
        }
      ]
    }
  });

  console.log("Created properties:", { property1: property1.id, property2: property2.id });

  // Create sample notes
  await prisma.note.create({
    data: {
      content: "This property looks perfect! It has everything on our must-have list. The location is great and it's not in a flood zone. We should book an inspection ASAP.",
      type: "PRO",
      propertyId: property1.id,
      authorId: adminUser.id
    }
  });

  await prisma.note.create({
    data: {
      content: "@overseas@family.com This property meets all our criteria - single story, 2 living areas, solar panels, and dog-friendly yard. What do you think?",
      type: "GENERAL",
      propertyId: property1.id,
      authorId: parentUser.id
    }
  });

  await prisma.note.create({
    data: {
      content: "Unfortunately this property is in the Angle Vale flood zone which we identified as a deal breaker. Also missing solar panels.",
      type: "CON", 
      propertyId: property2.id,
      authorId: adminUser.id
    }
  });

  // Create analysis for property 1
  await prisma.analysis.create({
    data: {
      propertyId: property1.id,
      estimatedValue: 735000,
      overpricing: 2.0, // 2% over estimated value
      priceAssessment: "fair",
      confidence: 85.5,
      comparables: [
        {
          address: "23 Oak Street, Gawler East",
          soldPrice: 730000,
          soldDate: "2024-01-10",
          bedrooms: 4,
          bathrooms: 2,
          landSize: 620,
          distance: 0.3
        },
        {
          address: "67 Pine Avenue, Gawler East",
          soldPrice: 745000,
          soldDate: "2023-12-15",
          bedrooms: 4, 
          bathrooms: 2,
          landSize: 680,
          distance: 0.5
        }
      ],
      comparableCount: 2,
      rentalYield: 4.1,
      capitalGrowth: 8.5,
      valueScore: 78.5,
      investmentScore: 72.0,
      locationScore: 85.0,
      risks: [
        {
          type: "market",
          level: "low",
          description: "Strong market growth in area"
        }
      ],
      riskScore: 15.0,
      summary: "Good value property in growing suburb. Meets all family requirements with strong fundamentals.",
      keyInsights: [
        "Property priced fairly at $750k vs estimated value of $735k",
        "Strong rental yield potential at 4.1%",
        "Excellent location score due to schools and transport",
        "Low risk investment in established suburb"
      ]
    }
  });

  // Create activities
  await prisma.activity.create({
    data: {
      type: "PROPERTY_ADDED",
      action: "Added property at 45 Willow Street, Gawler East",
      userId: adminUser.id,
      propertyId: property1.id,
      metadata: {
        source: "realestate.com.au"
      }
    }
  });

  await prisma.activity.create({
    data: {
      type: "STATUS_CHANGED", 
      action: "Changed property status from RESEARCHING to INTERESTED",
      userId: adminUser.id,
      propertyId: property1.id,
      metadata: {
        oldStatus: "RESEARCHING",
        newStatus: "INTERESTED",
        reason: "Meets all criteria"
      }
    }
  });

  await prisma.activity.create({
    data: {
      type: "PROPERTY_ADDED",
      action: "Added property at 12 River Bend Drive, Angle Vale", 
      userId: adminUser.id,
      propertyId: property2.id,
      metadata: {
        source: "realestate.com.au"
      }
    }
  });

  await prisma.activity.create({
    data: {
      type: "STATUS_CHANGED",
      action: "Changed property status from RESEARCHING to REJECTED",
      userId: adminUser.id,
      propertyId: property2.id,
      metadata: {
        oldStatus: "RESEARCHING", 
        newStatus: "REJECTED",
        reason: "Flood risk and missing solar panels"
      }
    }
  });

  console.log("Database seeded successfully! 🌱");
  console.log("Created:");
  console.log("- 3 users (Ben, Parent, Overseas)");
  console.log("- 3 suburb profiles (Gawler East, Smithfield, Angle Vale)");
  console.log("- 2 properties (1 interested, 1 rejected)"); 
  console.log("- 3 collaborative notes");
  console.log("- 1 property analysis");
  console.log("- 4 activity records");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });