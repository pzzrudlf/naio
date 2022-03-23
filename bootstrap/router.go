package bootstrap

import (
    "context"
    "log"
    "naio/global"
    "naio/middleware"
    "naio/routes"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"

    "github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
    if global.App.Config.App.Env == "production" {
        gin.SetMode(gin.ReleaseMode)
    }

    router := gin.New()
    router.Use(gin.Logger(), middleware.CustomRecovery())

    // 跨域处理
    router.Use(middleware.Cors())

    // 前端项目静态资源
    router.StaticFile("/", "./static/dist/index.html")
    router.Static("/assets", "./static/dist/assets")
    router.StaticFile("/favicon.ico", "./static/dist/favicon.ico")
    // 其他静态资源
    router.Static("/public", "./static")
    router.Static("/storage", "./storage/app/public")

    // 注册 api 分组路由
    apiGroup := router.Group("/api")
    routes.SetApiGroupRoutes(apiGroup)

    return router
}

// RunServer 启动服务器
func RunServer() {
    r := setupRouter()

    srv := &http.Server{
        Addr:    ":" + global.App.Config.App.Port,
        Handler: r,
    }

    go func() {
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            log.Fatalf("listen: %s\n", err)
        }
    }()

    // 等待中断信号以优雅地关闭服务器（设置 10 秒的超时时间）
    quit := make(chan os.Signal, 100000)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit
    log.Println("Shutdown Server ...")

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    if err := srv.Shutdown(ctx); err != nil {
        log.Fatal("Server Shutdown:", err)
    }
    log.Println("Server exiting")
}
