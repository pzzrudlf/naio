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
	// A
	router.POST("/auth/login", app.Login)

	// 路由分组
	jwtRouter := router.Use(middleware.JWTAuth(services.AppGuardName))
	{
		// B
		//jwtRouter.GET("/auth/info", middleware.CheckPermission(), app.Info)
		jwtRouter.GET("/auth/info", app.GetUserInfo)
		jwtRouter.GET("/menu", app.GetMenu)

		jwtRouter.POST("/image_upload", common.ImageUpload)
		jwtRouter.POST("/auth/logout", app.Logout)
	}
}
