package bootstrap

import (
	"github.com/casbin/casbin/v2"
	gormadapter "github.com/casbin/gorm-adapter/v2"
)

func InitializeCasbin() *casbin.Enforcer {
	adapter, err := gormadapter.NewAdapter("mysql", "root:pzzrudlf@tcp(127.0.0.1:3306)/naio", true)
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
