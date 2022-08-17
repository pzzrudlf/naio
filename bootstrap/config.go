package bootstrap

import (
    "fmt"
    "github.com/fsnotify/fsnotify"
    "github.com/spf13/viper"
    "naio/global"
    "os"
)

func InitializeConfig() {
    // 设置配置文件路径
    config := "config.yaml"
    // 生产环境可以通过设置环境变量来改变配置文件路径
    if configEnv := os.Getenv("VIPER_CONFIG"); configEnv != "" {
        config = configEnv
    }
    viper.SetConfigFile(config)
    viper.SetConfigType("yaml")
    if err := viper.ReadInConfig(); err != nil {
        panic(fmt.Errorf("read config failed: %s", err))
    }
    // 监听配置文件
    viper.WatchConfig()
    viper.OnConfigChange(func(in fsnotify.Event) {
        fmt.Println("config file changed:", in.Name)
        // 重载配置
        if err := viper.Unmarshal(&global.App.Config); err != nil {
            fmt.Println(err)
        }
    })
    // 将配置赋值给全局变量
    if err := viper.Unmarshal(&global.App.Config); err != nil {
       fmt.Println(err)
    }
}
