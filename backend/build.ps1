# PowerShell build script for Go TodoList Backend

Write-Host "🚀 Testing Go TodoList Backend Build..." -ForegroundColor Green

# Clean any previous builds
Write-Host "🧹 Cleaning previous builds..." -ForegroundColor Yellow
Remove-Item -Path "main.exe", "keep-alive.exe" -ErrorAction SilentlyContinue

# Download dependencies
Write-Host "📦 Downloading dependencies..." -ForegroundColor Yellow
go mod download

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to download dependencies" -ForegroundColor Red
    exit 1
}

# Build main application
Write-Host "🔨 Building main application..." -ForegroundColor Yellow
go build -o main.exe .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Main application built successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to build main application" -ForegroundColor Red
    exit 1
}

# Build keep-alive script
Write-Host "🔨 Building keep-alive script..." -ForegroundColor Yellow
go build -o keep-alive.exe ./scripts/keep-alive.go

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Keep-alive script built successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to build keep-alive script" -ForegroundColor Red
    exit 1
}

Write-Host "🎉 All builds completed successfully!" -ForegroundColor Green
Write-Host "📝 You can now test locally with:" -ForegroundColor Cyan
Write-Host "   .\main.exe (to run the server)" -ForegroundColor White
Write-Host "   .\keep-alive.exe (to test the keep-alive script)" -ForegroundColor White
