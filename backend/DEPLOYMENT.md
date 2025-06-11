# Deployment Guide for Render.com

## Prerequisites
- GitHub account
- Render.com account
- Your Go backend code pushed to a GitHub repository

## Deployment Steps

### 1. Push Your Code to GitHub
```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### 2. Deploy on Render.com

#### Option A: Using render.yaml (Recommended)
1. Go to [Render.com](https://render.com) and sign in
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Select the repository containing your Go backend
5. Render will automatically detect the `render.yaml` file and create both services:
   - Web service (your API)
   - Cron job (keep-alive service)

#### Option B: Manual Setup
1. **Create Web Service:**
   - Go to Render dashboard
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select your repository
   - Configure:
     - Name: `go-todolist-backend`
     - Environment: `Go`
     - Build Command: `go mod download && go build -o main .`
     - Start Command: `./main`
     - Plan: Free

2. **Set Environment Variables:**
   - `PORT`: `10000`
   - `GIN_MODE`: `release`
   - `MONGODB_URI`: `your-mongodb-connection-string`
   - `FRONTEND_URL`: `https://your-frontend-domain.com`
   - `JWT_SECRET`: (generate a random secret)

3. **Create Cron Job:**
   - Click "New" → "Cron Job"
   - Connect the same repository
   - Configure:
     - Name: `todolist-keep-alive`
     - Environment: `Go`
     - Build Command: `go mod download && go build -o keep-alive ./scripts/keep-alive.go`
     - Start Command: `./keep-alive`
     - Schedule: `*/14 * * * *` (every 14 minutes)
   - Set Environment Variable:
     - `SERVICE_URL`: `https://your-service-name.onrender.com`

### 3. Update Service URL
After deployment, update the `SERVICE_URL` in your cron job environment variables with the actual URL of your deployed service.

## Features Added for Deployment

### 1. Health Check Endpoint
- **Endpoint:** `GET /health`
- **Purpose:** Allows Render to monitor service health
- **Response:** JSON with status, timestamp, and service name

### 2. Environment Configuration
- **MongoDB URI:** Configurable via environment variable
- **Port:** Uses Render's default port (10000)
- **CORS:** Configured for production with environment-based frontend URL

### 3. Keep-Alive Cron Job
- **Schedule:** Runs every 14 minutes
- **Purpose:** Prevents free tier services from sleeping
- **Function:** Pings the health endpoint to keep service active

### 4. Production Optimizations
- **Gin Mode:** Set to release mode in production
- **Logging:** Added connection success logs
- **Error Handling:** Improved error handling with proper exits

## Important Notes

1. **Free Tier Limitations:**
   - Services sleep after 15 minutes of inactivity
   - Cron jobs help keep services active
   - Limited to 750 hours per month

2. **Security:**
   - Database credentials are in environment variables
   - JWT secret is generated automatically
   - CORS is properly configured

3. **Monitoring:**
   - Health check endpoint for service monitoring
   - Cron job logs for keep-alive status
   - Render dashboard for service metrics

## Troubleshooting

1. **Build Failures:**
   - Check Go version compatibility
   - Ensure all dependencies are in go.mod
   - Verify build commands

2. **Service Not Starting:**
   - Check environment variables
   - Verify port configuration
   - Review service logs in Render dashboard

3. **Database Connection Issues:**
   - Verify MongoDB URI
   - Check network connectivity
   - Ensure database allows connections from Render IPs

## Post-Deployment

1. **Update Frontend API URL:**
   - Replace localhost URLs with your Render service URL
   - Update CORS settings if needed

2. **Test Endpoints:**
   - Health check: `https://your-service.onrender.com/health`
   - API endpoints: Test all CRUD operations

3. **Monitor Performance:**
   - Check Render dashboard for metrics
   - Monitor cron job execution
   - Review service logs regularly

Your Go backend is now ready for production deployment on Render.com with automatic keep-alive functionality!
