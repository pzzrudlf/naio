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
		tokenStr := c.Request.Header.Get("Authorization")
		tokenStr = tokenStr[len(services.TokenType)+1:]
		token, _ := jwt.ParseWithClaims(tokenStr, &services.CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(global.App.Config.Jwt.Secret), nil
		})
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
