package global

import (
	"naio/config"

	"github.com/spf13/viper"
	"go.uber.org/zap"
	"gorm.io/gorm"
	"github.com/go-redis/redis/v8"
)

type Application struct {
	ConfigViper *viper.Viper
	Config config.Configuration
	Log *zap.Logger
	DB *gorm.DB
	Redis *redis.Client
}

var App = new(Application)