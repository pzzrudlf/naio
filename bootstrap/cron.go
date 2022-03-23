package bootstrap

import (
	"fmt"
	"naio/global"
	"time"
	"github.com/robfig/cron/v3"
)

func InitializeCron() {
	global.App.Cron = cron.New(cron.WithSeconds())

	go func(){
		global.App.Cron.AddFunc("0 0 2 * * *", func(){
			fmt.Println(time.Now())
		})
		global.App.Cron.Start()
		defer global.App.Cron.Stop()
		select{}
	}()
}
