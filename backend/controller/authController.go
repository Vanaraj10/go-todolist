package controller

import (
	"context"
	"net/http"
	"time"

	"github.com/Vanaraj10/todoApi/config"
	"github.com/Vanaraj10/todoApi/models"
	"github.com/Vanaraj10/todoApi/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func SignUp(c *gin.Context) {
	// This function will handle user registration
	// It will receive user data, hash the password, and store the user in the database
	var user models.User 
	if err := c.ShouldBindJSON(&user) ; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid input data",
		})
		return
	}

	ctx,cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	var userCollection = config.GetCollection("users")

	count, _ := userCollection.CountDocuments(ctx, bson.M{"email":user.Email})
	if count > 0 {
		c.JSON(http.StatusConflict,gin.H{
			"error": "Email already exists",
		})
		return
	}

	// Hash the password
	hashedPassword, _ := utils.HashPassword(user.Password)
	user.Password = hashedPassword
	user.ID = primitive.NewObjectID()

	_, err := userCollection.InsertOne(ctx,user)
	if err != nil {
		c.JSON(http.StatusInternalServerError,gin.H{
			"error": "Failed to create user",
		})
		return
	}
	token, _ := utils.GenerateToken(user.ID.Hex())
	c.JSON(http.StatusCreated, gin.H{"token":token})
}

func Login(c *gin.Context) {
	var input models.User

	if err := c.ShouldBindBodyWithJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest,gin.H{
			"error": "Invalid input data",
		})
		return
	}

	ctx,cancel := context.WithTimeout(context.Background(),10 * time.Second)
	defer cancel()

	var userCollection = config.GetCollection("users")

	var foundUser models.User
	err := userCollection.FindOne(ctx,bson.M{"email": input.Email}).Decode(&foundUser)

	if err != nil || ! utils.CheckPasswordHash(input.Password,foundUser.Password){
		c.JSON(http.StatusUnauthorized,gin.H{
			"error": "Invalid email or password",
		})
		return 
	}

	token, _ := utils.GenerateToken(foundUser.ID.Hex())
	c.JSON(http.StatusOK, gin.H{"token": token})
}