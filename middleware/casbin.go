package middleware

import (
	"naio/app/common/response"
	"naio/app/services"
	"naio/global"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"

)

func CheckPermission() gin.HandlerFunc {
	return func(c *gin.Context) {

		// 
		tokenStr := c.Request.Header.Get("Authorization")
		if tokenStr == "" {
			response.TokenFail(c)
			c.Abort()
			return
		}
		tokenStr = tokenStr[len(services.TokenType)+1:]

		// 解析token, 但是不用校验token, 因为jwt中间件在casbin中间件之前执行了，已经被校验过了
		token, _ := jwt.ParseWithClaims(tokenStr, &services.CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(global.App.Config.Jwt.Secret), nil
		})
		if res, err := global.App.Casbin.Enforce(services.JwtService.GetIdFromClaims("username", token.Claims), c.Request.URL.Path, c.Request.Method); err != nil {
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
