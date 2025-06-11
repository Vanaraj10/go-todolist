package controller

import (
	"context"
	"net/http"
	"time"

	"github.com/Vanaraj10/todoApi/config"
	"github.com/Vanaraj10/todoApi/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


func CreateTodo(c *gin.Context){
	var todo models.Todo

	if err := c.ShouldBindJSON(&todo); err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	userID := c.MustGet("user_id").(string)

	// Set the user ID and default values for the new todo
	todo.ID = primitive.NewObjectID()
	todo.UserID = userID
	todo.Done = false // Default value for new todos

	ctx,cancel := context.WithTimeout(context.Background(),10* time.Second)
	defer cancel()
	var todoCollection = config.GetCollection("todos")

	_ , err := todoCollection.InsertOne(ctx, todo)

	if err != nil {
		c.JSON(http.StatusInternalServerError,gin.H{
			"error": "Failed to create todo",
		})
		return
	}
	c.JSON(http.StatusOK,todo)
}

func GetTodos(c *gin.Context) {
	userID := c.MustGet("user_id").(string)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var todoCollection = config.GetCollection("todos")

	cursor, err := todoCollection.Find(ctx,primitive.M{"user_id": userID})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve todos"})
		return
	}

	var todos []models.Todo

	if err := cursor.All(ctx, &todos) ; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode todos"})
		return
	}

	c.JSON(http.StatusOK, todos)
}

func UpdateTodo(c *gin.Context) {
	todoID := c.Param("id")
	userID := c.MustGet("user_id").(string)

	var updatedTodo models.Todo
	if err := c.ShouldBindJSON(&updatedTodo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}
	objID ,_ := primitive.ObjectIDFromHex(todoID)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var todoCollection = config.GetCollection("todos")

	filter := primitive.M{"_id": objID,"user_id": userID}
	update := primitive.M{
		"$set": primitive.M{
			"title":       updatedTodo.Title,
			"description": updatedTodo.Description,
			"done":        updatedTodo.Done,
		},
	}
	_ , err := todoCollection.UpdateOne(ctx,filter,update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update todo"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Todo updated successfully"})
}

func DeleteTodo(c *gin.Context) {
	todoID := c.Param("id")
	userID := c.MustGet("user_id").(string)

	objID,_ := primitive.ObjectIDFromHex(todoID)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var todoCollection = config.GetCollection("todos")

	filter := primitive.M{"_id": objID, "user_id": userID}
	_ , err := todoCollection.DeleteOne(ctx, filter)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete todo"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Todo deleted successfully"})
}