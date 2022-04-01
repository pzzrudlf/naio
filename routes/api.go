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
	//router.POST("/auth/info", app.Info).Use(middleware.JWTAuth(services.AppGuardName))
	//router.POST("/auth/logout", app.Logout).Use(middleware.JWTAuth(services.AppGuardName))

	// 路由分组
	jwtRouter := router.Group("").Use(middleware.JWTAuth(services.AppGuardName))
	{
		jwtRouter.POST("/auth/logout", app.Logout)
		jwtRouter.POST("/auth/info", app.Info)
		jwtRouter.POST("/image_upload", common.ImageUpload)

		//casbinRouter := jwtRouter.Group("").Use(middleware.CheckCasbinPermission())
		//{
		//	casbinRouter.POST("/auth/info", app.Info)
		//	casbinRouter.POST("/image_upload", common.ImageUpload)
		//}
	}
}
