package config

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Client

func ConnectDB() {
	// Get MongoDB URI from environment variable or use default
	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		mongoURI = "mongodb+srv://vanaraj24cs:KKSWJsnRJ5zGTkWR@todolist.xtwasmd.mongodb.net/?retryWrites=true&w=majority&appName=TodoList"
	}

	client, err := mongo.NewClient(options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	DB = client
	log.Println("Connected to MongoDB successfully!")
}

func GetCollection(collectionName string) *mongo.Collection {
	if DB == nil {
		log.Fatal("Database connection is not established. Please call ConnectDB() first.")
		return nil
	}
	return DB.Database("TodoList").Collection(collectionName)
}
