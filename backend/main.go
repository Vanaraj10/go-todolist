package main

import (
	"os"
	"time"

	"github.com/Vanaraj10/todoApi/config"
	"github.com/Vanaraj10/todoApi/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Set Gin mode to release in production
	if os.Getenv("GIN_MODE") != "debug" {
		gin.SetMode(gin.ReleaseMode)
	}

	config.ConnectDB()
	router := gin.Default() 
	
	// Configure CORS for production
	allowedOrigins := []string{
		"http://localhost:5173", 
		"http://localhost:5174",
	}
	
	// Add production frontend URL if available
	if frontendURL := os.Getenv("FRONTEND_URL"); frontendURL != "" {
		allowedOrigins = append(allowedOrigins, frontendURL)
	}
	
	router.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"*"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	routes.AuthRoutes(router)
	routes.TOdoRoutes(router)

	// Use PORT from environment variable or default to 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	
	router.Run(":" + port)
}
