package routes

import (
	_ "naio/app/common/request"
	"naio/app/services"
	"naio/middleware"
	"net/http"
	_ "net/http"
	_ "time"

	"naio/app/controllers/app"

	"github.com/gin-gonic/gin"
)

// SetApiGroupRoutes 定义 api 分组路由
func SetApiGroupRoutes(router *gin.RouterGroup) {
	router.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong!!!")
	})
	// router.GET("/test", func(c *gin.Context) {
	//     time.Sleep(5*time.Second)
	//     c.String(http.StatusOK, "success")
	// })
	// router.POST("/user/register", func(c *gin.Context) {
	//     var form request.Register
	//     if err := c.ShouldBindJSON(&form); err != nil {
	//        c.JSON(http.StatusOK, gin.H{
	//            "error": request.GetErrorMsg(form, err),
	//        })
	//        return
	//     }
	//     c.JSON(http.StatusOK, gin.H{
	//         "message": "success",
	//     })
	// })

	router.POST("/auth/register", app.Register)
	router.POST("/auth/login", app.Login)

	authRouter := router.Group("").Use(middleware.JWTAuth(services.AppGuardName))
	{
		authRouter.POST("/auth/info", app.Info)
		authRouter.POST("/auth/logout", app.Logout)
	}
}
