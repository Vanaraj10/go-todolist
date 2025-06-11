# Production Environment Configuration Script (PowerShell)
# This script helps generate environment variables for production deployment

Write-Host "🔧 Production Environment Configuration" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# Generate JWT Secret
Write-Host "📝 Generating JWT Secret..." -ForegroundColor Yellow
$bytes = New-Object byte[] 32
(New-Object Random).NextBytes($bytes)
$JWT_SECRET = [Convert]::ToBase64String($bytes)
Write-Host "JWT_SECRET=$JWT_SECRET" -ForegroundColor Green
Write-Host ""

# Display required environment variables
Write-Host "📋 Required Environment Variables for Render.com:" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Web Service Environment Variables:" -ForegroundColor Yellow
Write-Host "----------------------------------" -ForegroundColor Yellow
Write-Host "PORT=10000"
Write-Host "GIN_MODE=release"
Write-Host "MONGODB_URI=mongodb+srv://vanaraj24cs:KKSWJsnRJ5zGTkWR@todolist.xtwasmd.mongodb.net/?retryWrites=true&w=majority&appName=TodoList"
Write-Host "FRONTEND_URL=https://your-frontend-domain.com"
Write-Host "JWT_SECRET=$JWT_SECRET" -ForegroundColor Green
Write-Host ""
Write-Host "Cron Job Environment Variables:" -ForegroundColor Yellow
Write-Host "-------------------------------" -ForegroundColor Yellow
Write-Host "SERVICE_URL=https://your-deployed-service.onrender.com"
Write-Host ""
Write-Host "🔒 Security Notes:" -ForegroundColor Red
Write-Host "- Never commit JWT_SECRET to version control"
Write-Host "- Update FRONTEND_URL with your actual frontend domain"
Write-Host "- Update SERVICE_URL after deploying the web service"
Write-Host "- Consider using MongoDB Atlas IP whitelist for security"
Write-Host ""
Write-Host "💡 Next Steps:" -ForegroundColor Green
Write-Host "1. Copy these environment variables to Render.com"
Write-Host "2. Deploy using the render.yaml blueprint"
Write-Host "3. Update SERVICE_URL in cron job after deployment"
Write-Host "4. Test all endpoints after deployment"
