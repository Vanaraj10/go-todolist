package routes

import (
	"github.com/Vanaraj10/todoApi/controller"
	"github.com/Vanaraj10/todoApi/middleware"
	"github.com/gin-gonic/gin"
)

func TOdoRoutes(router *gin.Engine) {

	todoGroup := router.Group("/todos")
	todoGroup.Use(middleware.JWTAuthMiddleware())

	{
		todoGroup.POST("/", controller.CreateTodo)
		todoGroup.GET("/", controller.GetTodos)
		todoGroup.PUT("/:id", controller.UpdateTodo)
		todoGroup.DELETE("/:id", controller.DeleteTodo)
	}
}
