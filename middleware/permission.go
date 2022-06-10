package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"naio/app/common/response"
	"naio/app/services"
	"naio/global"
)

func CheckPermission() gin.HandlerFunc {
	return func(c *gin.Context) {
		// jwt中间件已经在casbin中间件之前执行了，所以此时不需要判断token了，既然请求能走到这里
		// 说明request头中包含了token了
		tokenStr := c.Request.Header.Get("Authorization")
		tokenStr = tokenStr[len(services.TokenType)+1:]
		// 解析token, 但是不用校验token, 因为jwt中间件在casbin中间件之前执行了，已经被校验过了
		token, _ := jwt.ParseWithClaims(tokenStr, &services.CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(global.App.Config.Jwt.Secret), nil
		})
		//
		claims := token.Claims.(*services.CustomClaims)

		if res, err := global.App.Casbin.Enforce(claims.Username, c.Request.URL.Path, c.Request.Method); err != nil {
			response.CasbinFail(c, err.Error())
			c.Abort()
			return
		} else if !res {
			response.PermissionFail(c, "登陆用户, 没有权限")
			c.Abort()
			return
		}

		c.Next()
	}
}
