package global

import (
	"naio/config"

	"github.com/casbin/casbin/v2"
	"github.com/jassue/go-storage/storage"

	"github.com/go-redis/redis/v8"
	"github.com/robfig/cron/v3"
	"github.com/spf13/viper"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type Application struct {
	ConfigViper *viper.Viper
	Config      config.Configuration
	Log         *zap.Logger
	DB          *gorm.DB
	Casbin      *casbin.Enforcer
	Redis       *redis.Client
	Cron        *cron.Cron
}

var App = new(Application)

func (app *Application) Disk(disk... string) storage.Storage {
	diskName := app.Config.Storage.Default
	if len(disk) > 0 {
		diskName = storage.DiskName(disk[0])
	}
	s, err := storage.Disk(diskName)
	if err != nil {
		panic(err)
	}
	return s
}