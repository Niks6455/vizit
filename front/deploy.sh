#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 20+"
    exit 1
fi

# Check pnpm
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Build
echo "🔨 Building Next.js app..."
pnpm build

echo "✅ Build complete!"
echo "📝 Run 'pnpm start' to start the production server"
echo "   Or use PM2: pm2 start 'pnpm start' --name vizit"
