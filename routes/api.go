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
	router.POST("/register", app.Register)
	router.POST("/login", app.Login)

	// 路由分组
	jwtRouter := router.Use(middleware.JWTAuth(services.AppGuardName))
	{
		jwtRouter.GET("/auth/info", app.GetAuthInfo)
		jwtRouter.GET("/auth/menu", app.GetAuthMenu)

		jwtRouter.POST("/image_upload", common.ImageUpload)
		jwtRouter.POST("/logout", app.Logout)
	}
}
