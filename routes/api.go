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

	// 单条路由设置中间件
	//router.POST("/auth/info", middleware.JWTAuth(services.AppGuardName), app.Info)
	//router.POST("/auth/logout", app.Logout).Use(middleware.JWTAuth(services.AppGuardName))

	// 路由分组
	jwtRouter := router.Group("").Use(middleware.JWTAuth(services.AppGuardName))
	{
		jwtRouter.POST("/auth/logout", app.Logout)
		jwtRouter.POST("/auth/info", middleware.CheckPermission(), app.Info)
		jwtRouter.POST("/image_upload", middleware.CheckPermission(), common.ImageUpload)
	}
}
