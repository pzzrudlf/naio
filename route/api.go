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
	jwtRouter := router.Use(middleware.JWTAuth(services.AppGuardName))
	{
		//jwtRouter.GET("/auth/info", middleware.CheckPermission(), app.GetAuthInfo)
		jwtRouter.GET("/auth/info", app.GetAuthInfo)
		jwtRouter.GET("/auth/menu", app.GetAuthMenu)

		//管理员信息--列表
		// jwtRouter.GET("/admin/list", middleware.CheckPermission(), app.GetAdminList)
		jwtRouter.GET("/admin/list", app.GetAdminList)
		//创建--管理员信息
		// jwtRouter.POST("/admin", middleware.CheckPermission(), app.CreateAdmin)
		jwtRouter.POST("/admin", app.CreateAdmin)
		//更新--管理员信息
		// jwtRouter.PUT("/admin", middleware.CheckPermission(), app.UpdateAdmin)
		jwtRouter.PUT("/admin", app.UpdateAdmin)
		//删除--管理员信息
		// jwtRouter.DELETE("/admin/:id", middleware.CheckPermission(), app.DeleteAdmin)
		jwtRouter.DELETE("/admin/:id", app.DeleteAdmin)

		jwtRouter.GET("/admin/getRolistForAssign", app.GetRolistForAssign)
		jwtRouter.GET("/admin/getRoleIdByUserId", app.GetRoleIdByUserId)
		jwtRouter.POST("/admin/assignRole", app.AssignRole)


		//角色--列表
		// jwtRouter.GET("/role/list", middleware.CheckPermission(), app.GetRoleList)
		jwtRouter.GET("/role/list", app.GetRoleList)
		//创建--角色
		// jwtRouter.POST("/role", middleware.CheckPermission(), app.CreateRole)
		jwtRouter.POST("/role", app.CreateRole)
		//更新--角色
		// jwtRouter.PUT("/role", middleware.CheckPermission(), app.UpdateRole)
		jwtRouter.PUT("/role", app.UpdateRole)
		//删除--角色
		// jwtRouter.DELETE("/role/:id", middleware.CheckPermission(), app.DeleteRole)
		jwtRouter.DELETE("/role/:id", app.DeleteRole)

		//菜单--列表
		// jwtRouter.GET("/menu/list", middleware.CheckPermission(), app.GetMenuList)
		jwtRouter.GET("/menu/list", app.GetMenuList)
		//创建--菜单
		// jwtRouter.POST("/menu", middleware.CheckPermission(), app.CreateMenu)
		jwtRouter.POST("/menu", app.CreateMenu)
		//更新--菜单
		// jwtRouter.PUT("/menu", middleware.CheckPermission(), app.UpdateMenu)
		jwtRouter.PUT("/menu", app.UpdateMenu)
		//删除--菜单
		// jwtRouter.DELETE("/menu/:id", middleware.CheckPermission(), app.DeleteMenu)
		jwtRouter.DELETE("/menu/:id", app.DeleteMenu)


		jwtRouter.POST("/image_upload", common.ImageUpload)
		jwtRouter.POST("/logout", app.Logout)
	}
}
