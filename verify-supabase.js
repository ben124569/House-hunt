#!/usr/bin/env node

/**
 * House Hunt Platform - Supabase Connection Verification
 * 
 * This script verifies your Supabase setup is working correctly
 * Run after setting up your .env.local file
 */

import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const requiredEnvVars = [
  'DATABASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

console.log('🏡 House Hunt Platform - Supabase Verification');
console.log('================================================');
console.log('');

// Check environment variables
console.log('📋 Checking environment variables...');
let envErrors = 0;

requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`❌ ${varName} is not set`);
    envErrors++;
  } else if (varName.includes('URL') && !value.startsWith('http')) {
    console.log(`❌ ${varName} should be a valid URL`);
    envErrors++;
  } else {
    console.log(`✅ ${varName} is configured`);
  }
});

if (envErrors > 0) {
  console.log('');
  console.log('❌ Environment setup incomplete. Please check your .env.local file');
  process.exit(1);
}

console.log('');

// Test Prisma connection
console.log('🔗 Testing Prisma database connection...');
const prisma = new PrismaClient();

try {
  await prisma.$connect();
  console.log('✅ Prisma connection successful');
  
  // Test basic query
  const userCount = await prisma.user.count();
  console.log(`✅ Database accessible - ${userCount} users found`);
  
} catch (error) {
  console.log('❌ Prisma connection failed:');
  console.log(error.message);
  
  if (error.message.includes('connection')) {
    console.log('');
    console.log('💡 Troubleshooting tips:');
    console.log('   - Verify your DATABASE_URL format');
    console.log('   - Check your Supabase project is running');
    console.log('   - Ensure you\'re using transaction mode (port 6543)');
    console.log('   - Run "npm run db:push" to create tables');
  }
} finally {
  await prisma.$disconnect();
}

console.log('');

// Test Supabase client
console.log('📡 Testing Supabase client connection...');

try {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  
  // Test basic connectivity
  const { data, error } = await supabase
    .from('User')
    .select('count')
    .limit(1);
  
  if (error && !error.message.includes('relation "User" does not exist')) {
    throw error;
  }
  
  console.log('✅ Supabase client connection successful');
  
  // Test realtime
  const channel = supabase.channel('test');
  channel.subscribe((status) => {
    if (status === 'SUBSCRIBED') {
      console.log('✅ Realtime connection working');
      channel.unsubscribe();
    }
  });
  
} catch (error) {
  console.log('❌ Supabase client failed:');
  console.log(error.message);
  
  console.log('');
  console.log('💡 Troubleshooting tips:');
  console.log('   - Verify NEXT_PUBLIC_SUPABASE_URL is correct');
  console.log('   - Check NEXT_PUBLIC_SUPABASE_ANON_KEY is valid');
  console.log('   - Ensure your Supabase project is active');
}

console.log('');

// Test authentication setup
console.log('🔐 Checking authentication configuration...');

const authVars = [
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET'
];

let authErrors = 0;
authVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`⚠️  ${varName} is not set (required for Google OAuth)`);
    authErrors++;
  } else {
    console.log(`✅ ${varName} is configured`);
  }
});

if (authErrors === 0) {
  console.log('✅ Authentication setup complete');
} else {
  console.log('⚠️  Authentication setup incomplete - some features may not work');
}

console.log('');
console.log('🎉 Verification complete!');
console.log('');

if (envErrors === 0) {
  console.log('Next steps:');
  console.log('1. Run: npm run dev');
  console.log('2. Visit: http://localhost:3000');
  console.log('3. Test family authentication');
  console.log('4. Add your first property');
  console.log('');
  console.log('Your House Hunt Platform is ready! 🏡');
} else {
  console.log('Please fix the issues above and run this script again.');
}