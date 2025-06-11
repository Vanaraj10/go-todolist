#!/bin/bash

echo "🚀 Testing Go TodoList Backend Build..."

# Clean any previous builds
echo "🧹 Cleaning previous builds..."
rm -f main keep-alive

# Download dependencies
echo "📦 Downloading dependencies..."
go mod download

# Build main application
echo "🔨 Building main application..."
go build -o main .

if [ $? -eq 0 ]; then
    echo "✅ Main application built successfully!"
else
    echo "❌ Failed to build main application"
    exit 1
fi

# Build keep-alive script
echo "🔨 Building keep-alive script..."
go build -o keep-alive ./scripts/keep-alive.go

if [ $? -eq 0 ]; then
    echo "✅ Keep-alive script built successfully!"
else
    echo "❌ Failed to build keep-alive script"
    exit 1
fi

echo "🎉 All builds completed successfully!"
echo "📝 You can now test locally with:"
echo "   ./main (to run the server)"
echo "   ./keep-alive (to test the keep-alive script)"
