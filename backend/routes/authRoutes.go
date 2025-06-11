package routes

import (
	"github.com/Vanaraj10/todoApi/controller"
	"github.com/gin-gonic/gin"
)

func AuthRoutes(router *gin.Engine) {
	authGroup := router.Group("/auth")
	{
		authGroup.POST("/signup", controller.SignUp)
		authGroup.POST("/login", controller.Login)
	}
}
