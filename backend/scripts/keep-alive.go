package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

func main() {
	serviceURL := os.Getenv("SERVICE_URL")
	if serviceURL == "" {
		serviceURL = "https://go-todolist-backend.onrender.com"
	}

	healthEndpoint := serviceURL + "/health"

	log.Printf("Pinging service at: %s", healthEndpoint)

	client := &http.Client{
		Timeout: 30 * time.Second,
	}

	resp, err := client.Get(healthEndpoint)
	if err != nil {
		log.Printf("Error pinging service: %v", err)
		os.Exit(1)
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusOK {
		log.Printf("✅ Service is alive! Status: %d", resp.StatusCode)
		fmt.Printf("Keep-alive ping successful at %s\n", time.Now().Format("2006-01-02 15:04:05"))
	} else {
		log.Printf("❌ Service returned status: %d", resp.StatusCode)
		os.Exit(1)
	}
}
