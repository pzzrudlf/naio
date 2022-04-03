package bootstrap

import (
	"github.com/casbin/casbin/v2"
	gormadapter "github.com/casbin/gorm-adapter/v2"
	"naio/global"
)

func InitializeCasbin() *casbin.Enforcer {
	adapter, err := gormadapter.NewAdapter("mysql", global.App.Config.Database.UserName+":"+global.App.Config.Database.Password+"@tcp("+global.App.Config.Database.Host+":3306)/"+global.App.Config.Database.Database, true)
	//adapter, err := gormadapter.NewAdapter("mysql", "root:pzzrudlf@tcp(127.0.0.1:3306)/naio", true)
	if err != nil {
		panic(err)
	}
	e, err := casbin.NewEnforcer("conf/rbac_model.conf", adapter)
	if err != nil {
		panic(err)
	}
	err = e.LoadPolicy()
	if err != nil {
		panic(err)
	}
	return e
}
