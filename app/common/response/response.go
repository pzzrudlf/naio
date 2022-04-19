package response

import (
	"github.com/gin-gonic/gin"
	"naio/global"
	"net/http"
	"os"
)

// Response 响应结构体
type Response struct {
	ErrorCode int         `json:"error_code"` // 自定义错误码
	Data      interface{} `json:"data"`       // 数据
	Message   string      `json:"msg"`        // 信息
}

func ServerError(c *gin.Context, err interface{}) {
	msg := "Internal Server Error"
	// 非生产环境显示具体错误信息
	if global.App.Config.App.Env != "production" && os.Getenv(gin.EnvGinMode) != gin.ReleaseMode {
		if _, ok := err.(error); ok {
			msg = err.(error).Error()
		}
	}
	c.JSON(http.StatusInternalServerError, Response{
		http.StatusInternalServerError,
		nil,
		msg,
	})
	c.Abort()
}

// Success 响应成功 ErrorCode 为 0 表示成功
func Success(c *gin.Context, data interface{}) {
	c.JSON(http.StatusOK, Response{
		0,
		data,
		"ok",
	})
}

// Fail 响应失败 ErrorCode 不为 0 表示失败
func Fail(c *gin.Context, errorCode int, msg string) {
	c.JSON(http.StatusOK, Response{
		errorCode,
		nil,
		msg,
	})
}

// FailByError 失败响应 返回自定义错误的错误码、错误信息
func FailByError(c *gin.Context, error global.CustomError) {
	Fail(c, error.ErrorCode, error.ErrorMsg)
}

// ValidateFail 请求参数验证失败
func ValidateFail(c *gin.Context, msg string) {
	Fail(c, global.Errors.ValidateError.ErrorCode, msg)
}

// BusinessFail 业务逻辑失败
func BusinessFail(c *gin.Context, msg string) {
	Fail(c, global.Errors.BusinessError.ErrorCode, msg)
}

// TokenFail 令牌失败
func TokenFail(c *gin.Context) {
	FailByError(c, global.Errors.TokenError)
}

// PermissionFail 权限失败
func PermissionFail(c *gin.Context, msg string) {
	Fail(c, global.Errors.PermissionError.ErrorCode, msg)
}

// CasbinFail casbin自身错误
func CasbinFail(c *gin.Context, msg string) {
	Fail(c, global.Errors.CasbinError.ErrorCode, msg)
}
