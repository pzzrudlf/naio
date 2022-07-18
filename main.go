package main

import (
	"naio/bootstrap"
	"naio/global"
)

// @title api文档
// @version 0.0.1
// @BasePath /api
func main() {
	// 初始化配置
	global.App.ConfigViper = bootstrap.InitializeConfig()
	//global.App.Config

	// 初始化日志
	global.App.Log = bootstrap.InitializeLog()

	// 初始化数据库
	global.App.DB = bootstrap.InitializeDB()
	// 程序关闭前，释放数据库连接
	defer func() {
		if global.App.DB != nil {
			db, _ := global.App.DB.DB()
			db.Close()
		}
	}()

	global.App.Casbin = bootstrap.InitializeCasbin()

	// 初始化验证器
	bootstrap.InitializeValidator()

	// 初始化Redis
	global.App.Redis = bootstrap.InitializeRedis()

	// 初始化文件系统
	bootstrap.InitializeStorage()

	// 初始化计划任务
	bootstrap.InitializeCron()
	//global.App.Cron

	//fmt.Println(global.App)
	// 启动服务器
	bootstrap.RunServer()
	// lsof -i tcp:8088
	// kill -9 PID

	//使用command + c 退出进程
}
