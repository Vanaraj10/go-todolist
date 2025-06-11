# 🚀 Railway Deployment Guide

This guide will help you deploy your Modern Todo List Application to Railway.

## Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Repository**: Your code should be pushed to GitHub
3. **Railway CLI** (optional): `npm install -g @railway/cli`

## Deployment Steps

### Method 1: Deploy via Railway Dashboard (Recommended)

1. **Visit Railway Dashboard**
   - Go to [railway.app](https://railway.app)
   - Sign in with your GitHub account

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `go-todolist` repository

3. **Configure Services**
   Railway will automatically detect your application structure and create two services:

   #### Backend Service (Go API)
   - **Root Directory**: `/backend`
   - **Build Command**: Automatically detected
   - **Start Command**: Automatically detected
   
   **Environment Variables to Add:**
   ```
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-make-it-long-and-random
   GIN_MODE=release
   DB_CONNECTION=sqlite
   DB_DATABASE=todos.db
   PORT=8080
   ```

   #### Frontend Service (React App)
   - **Root Directory**: `/frontend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
   
   **Environment Variables to Add:**
   ```
   VITE_API_URL=https://your-backend-service-url.railway.app
   ```
   
   > **Note**: Replace `your-backend-service-url` with the actual URL Railway assigns to your backend service.

4. **Deploy**
   - Railway will automatically build and deploy both services
   - You'll get unique URLs for both frontend and backend

### Method 2: Deploy via Railway CLI

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   cd c:\Users\VJ\Desktop\go-todolist
   railway init
   ```

4. **Deploy Backend**
   ```bash
   cd backend
   railway up
   ```

5. **Deploy Frontend**
   ```bash
   cd ../frontend
   railway up
   ```

## Post-Deployment Configuration

### 1. Update CORS Settings
After deployment, update your backend's CORS configuration with your frontend URL:

```go
// In backend/main.go
allowedOrigins := []string{
    "http://localhost:5173", 
    "http://localhost:5174",
    "https://your-frontend-url.railway.app", // Add this line
}
```

### 2. Update Frontend API URL
Update your frontend's environment variable with the backend URL:

```env
VITE_API_URL=https://your-backend-service.railway.app
```

### 3. Database Setup
Your SQLite database will be automatically created on the first run. For production, consider using Railway's PostgreSQL addon:

1. Go to your project dashboard
2. Click "Add Service"
3. Select "PostgreSQL"
4. Update your backend to use PostgreSQL connection string

## Custom Domain (Optional)

1. **Purchase a Domain**: From any domain registrar
2. **Add Domain in Railway**:
   - Go to your service settings
   - Click "Domains"
   - Add your custom domain
   - Update DNS records as instructed

## Environment Variables Reference

### Backend Environment Variables
```env
JWT_SECRET=your-super-secret-jwt-key
GIN_MODE=release
PORT=8080
DB_CONNECTION=sqlite
DB_DATABASE=todos.db
FRONTEND_URL=https://your-frontend-url.railway.app
```

### Frontend Environment Variables
```env
VITE_API_URL=https://your-backend-url.railway.app
```

## Monitoring & Logs

- **View Logs**: Railway Dashboard → Your Service → Logs tab
- **Monitor Performance**: Railway Dashboard → Your Service → Metrics tab
- **Health Checks**: Railway automatically monitors your services

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure frontend URL is added to backend CORS configuration
   - Check environment variables are set correctly

2. **Build Failures**
   - Check build logs in Railway dashboard
   - Ensure all dependencies are properly specified

3. **Database Issues**
   - For SQLite: Data persists in the container
   - For production: Consider PostgreSQL addon

4. **Environment Variables**
   - Double-check all required environment variables are set
   - Restart services after updating environment variables

### Getting Help

- **Railway Documentation**: [docs.railway.app](https://docs.railway.app)
- **Railway Discord**: Community support
- **GitHub Issues**: For application-specific issues

## Security Checklist

- [ ] Changed default JWT_SECRET
- [ ] Environment variables are secure
- [ ] CORS is properly configured
- [ ] HTTPS is enabled (automatic on Railway)
- [ ] Database access is secured

## Cost Optimization

- **Hobby Plan**: $5/month for unlimited projects
- **Resource Limits**: Monitor usage in dashboard
- **Scaling**: Railway auto-scales based on traffic

---

🎉 **Congratulations!** Your Modern Todo List App is now live on Railway!

**Live URLs:**
- Frontend: `https://your-frontend-service.railway.app`
- Backend API: `https://your-backend-service.railway.app`
