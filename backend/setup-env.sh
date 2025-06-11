#!/bin/bash

# Production Environment Configuration Script
# This script helps generate environment variables for production deployment

echo "🔧 Production Environment Configuration"
echo "======================================"

# Generate JWT Secret
echo "📝 Generating JWT Secret..."
JWT_SECRET=$(openssl rand -base64 32)
echo "JWT_SECRET=$JWT_SECRET"
echo ""

# Display required environment variables
echo "📋 Required Environment Variables for Render.com:"
echo "================================================"
echo ""
echo "Web Service Environment Variables:"
echo "----------------------------------"
echo "PORT=10000"
echo "GIN_MODE=release"
echo "MONGODB_URI=mongodb+srv://vanaraj24cs:KKSWJsnRJ5zGTkWR@todolist.xtwasmd.mongodb.net/?retryWrites=true&w=majority&appName=TodoList"
echo "FRONTEND_URL=https://your-frontend-domain.com"
echo "JWT_SECRET=$JWT_SECRET"
echo ""
echo "Cron Job Environment Variables:"
echo "-------------------------------"
echo "SERVICE_URL=https://your-deployed-service.onrender.com"
echo ""
echo "🔒 Security Notes:"
echo "- Never commit JWT_SECRET to version control"
echo "- Update FRONTEND_URL with your actual frontend domain"
echo "- Update SERVICE_URL after deploying the web service"
echo "- Consider using MongoDB Atlas IP whitelist for security"
echo ""
echo "💡 Next Steps:"
echo "1. Copy these environment variables to Render.com"
echo "2. Deploy using the render.yaml blueprint"
echo "3. Update SERVICE_URL in cron job after deployment"
echo "4. Test all endpoints after deployment"
