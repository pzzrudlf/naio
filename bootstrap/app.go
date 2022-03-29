package bootstrap

import (
	"net/http"
	"naio/global"
	"log"
	"os"
    "os/signal"
    "syscall"
	"context"
	"time"
)

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
