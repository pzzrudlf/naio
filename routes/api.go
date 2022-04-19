package routes

import (
	"naio/app/controllers/app"
	"naio/app/controllers/common"
	"naio/app/services"
	"naio/middleware"

	"github.com/gin-gonic/gin"
)

// SetApiGroupRoutes 定义 api 分组路由
func SetApiGroupRoutes(router *gin.RouterGroup) {
	router.POST("/auth/register", app.Register)
	router.POST("/auth/login", app.Login)

	// 路由分组
	jwtRouter := router.Use(middleware.JWTAuth(services.AppGuardName))
	{
		jwtRouter.GET("/menu", app.GetMenu)
		jwtRouter.POST("/auth/info", middleware.CheckPermission(), app.Info)
		//jwtRouter.POST("/auth/info", app.Info)
		jwtRouter.POST("/image_upload", common.ImageUpload)
		jwtRouter.POST("/auth/logout", app.Logout)
	}
}
