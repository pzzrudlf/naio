package route

import (
	"naio/app/controllers/app"
	"naio/app/controllers/common"
	"naio/app/services"
	"naio/middleware"

	"github.com/gin-gonic/gin"
)

func SetApiGroupRoutes(router *gin.RouterGroup) {
	router.POST("/register", app.Register)
	router.POST("/login", app.Login)
	// 路由分组
	jwtRouter := router.Use(middleware.JWTAuth(services.AppGuardName))
	{
		//jwtRouter.GET("/auth/info", middleware.CheckPermission(), app.GetAuthInfo)
		jwtRouter.GET("/auth/info", app.GetAuthInfo)
		jwtRouter.GET("/auth/menu", app.GetAuthMenu)

		//管理员信息--列表
		//创建--管理员信息
		//查看--管理员信息
		//更新--管理员信息
		//删除--管理员信息

		//角色--列表
		//创建--角色
		//查看--角色
		//更新--角色
		//删除--角色

		//菜单--列表
		//创建--菜单
		//查看--菜单
		//更新--菜单
		//删除--菜单

		jwtRouter.POST("/image_upload", common.ImageUpload)
		jwtRouter.POST("/logout", app.Logout)
	}
}
