# 🚀 Render.com Deployment Checklist

## Pre-Deployment Checklist

### ✅ Code Preparation
- [x] Health check endpoint added (`/health`)
- [x] Environment variables configured for production
- [x] JWT secret uses environment variable
- [x] Database connection uses environment variable
- [x] CORS configured for production
- [x] Port configuration for Render (10000)
- [x] Gin mode set to release in production

### ✅ Files Created
- [x] `render.yaml` - Render deployment configuration
- [x] `Dockerfile` - Container configuration (if needed)
- [x] `.dockerignore` - Docker ignore file
- [x] `scripts/keep-alive.go` - Cron job script
- [x] `build.sh` & `build.ps1` - Build scripts
- [x] `.env.example` - Environment variables template
- [x] `DEPLOYMENT.md` - Deployment guide

## Deployment Steps

### 1. 📤 Push to GitHub
```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### 2. 🌐 Deploy on Render.com

#### Method 1: Blueprint Deployment (Recommended)
1. Go to [Render.com](https://render.com)
2. Click **"New"** → **"Blueprint"**
3. Connect your GitHub repository
4. Select your repository
5. Render will automatically create both services from `render.yaml`

#### Method 2: Manual Deployment
1. **Web Service:**
   - New → Web Service
   - Connect repository
   - Configure build/start commands
   - Set environment variables

2. **Cron Job:**
   - New → Cron Job
   - Same repository
   - Configure keep-alive script
   - Set schedule to `*/14 * * * *`

### 3. 🔧 Environment Variables to Set

#### Web Service Environment Variables:
```
PORT=10000
GIN_MODE=release
MONGODB_URI=mongodb+srv://vanaraj24cs:KKSWJsnRJ5zGTkWR@todolist.xtwasmd.mongodb.net/?retryWrites=true&w=majority&appName=TodoList
FRONTEND_URL=https://your-frontend-domain.com
JWT_SECRET=your-generated-secret-key
```

#### Cron Job Environment Variables:
```
SERVICE_URL=https://your-deployed-service.onrender.com
```

### 4. 🔄 Post-Deployment Updates

1. **Update Cron Job URL:**
   - Copy your deployed service URL
   - Update `SERVICE_URL` in cron job environment variables

2. **Test Endpoints:**
   - Health check: `https://your-service.onrender.com/health`
   - Auth endpoints: `/auth/signup`, `/auth/login`
   - Todo endpoints: `/todos` (with authentication)

3. **Update Frontend:**
   - Replace API base URL in frontend
   - Update CORS origins if needed

## 🔍 Verification Steps

### Service Health Check
```bash
curl https://your-service.onrender.com/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": 1234567890,
  "service": "go-todolist-backend"
}
```

### Database Connection
- Check Render logs for "Connected to MongoDB successfully!"
- Test auth endpoints (signup/login)

### Keep-Alive Functionality
- Monitor cron job execution in Render dashboard
- Verify service doesn't go to sleep after 15 minutes

## 🚨 Troubleshooting

### Common Issues:

1. **Build Failures:**
   - Check Go version compatibility
   - Verify all dependencies in go.mod
   - Review build logs in Render dashboard

2. **Service Won't Start:**
   - Check environment variables
   - Verify PORT is set to 10000
   - Review startup logs

3. **Database Connection Issues:**
   - Verify MongoDB URI
   - Check MongoDB Atlas network access
   - Ensure cluster is running

4. **Cron Job Not Working:**
   - Verify SERVICE_URL is correct
   - Check cron job logs in Render
   - Ensure health endpoint is accessible

### Debug Commands:
```bash
# Test locally
go run main.go

# Test keep-alive script
go run scripts/keep-alive.go

# Check health endpoint
curl http://localhost:10000/health
```

## 📊 Monitoring

### Render Dashboard
- Monitor service metrics
- Check deployment logs
- Track cron job execution

### Service Endpoints
- Health: `/health`
- Metrics: Monitor response times
- Error rates: Check for 5xx errors

## 🔒 Security Notes

1. **Never commit sensitive data:**
   - Database credentials
   - JWT secrets
   - API keys

2. **Use environment variables for:**
   - Database connection strings
   - Secret keys
   - Third-party service credentials

3. **CORS Configuration:**
   - Only allow trusted origins
   - Use environment variables for frontend URLs

## 🎯 Free Tier Limitations

- **750 hours per month** (about 31 days)
- **Services sleep after 15 minutes** of inactivity
- **Keep-alive cron job** prevents sleeping
- **Limited bandwidth and compute**

## ✅ Success Indicators

- [x] Service deploys without errors
- [x] Health endpoint returns 200 OK
- [x] Database connections work
- [x] Authentication endpoints functional
- [x] Cron job executes every 14 minutes
- [x] Service remains active (no sleeping)
- [x] Frontend can communicate with backend

Your Go backend is now production-ready for Render.com deployment! 🚀
