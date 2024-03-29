package app

import (
	"naio/app/common/request"
	"naio/app/common/response"
	"naio/app/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func Register(c *gin.Context) {
	var form request.Register
	if err := c.ShouldBindJSON(&form); err != nil {
		response.ValidateFail(c, request.GetErrorMsg(form, err))
		return
	}

	if user, err := services.UserService.Register(form); err != nil {
		response.BusinessFail(c, err.Error())
	} else {
		tokenData, err, _ := services.JwtService.CreateToken(services.AppGuardName, user)
		if err != nil {
			response.BusinessFail(c, err.Error())
			return
		}
		//response.Success(c, tokenData)
		c.JSON(http.StatusOK, response.AuthResp{
			Code:       http.StatusOK,
			ExpireTime: tokenData.ExpiresIn,
			Id:         user.GetUid(),
			Token:      tokenData.AccessToken,
		})
	}
}

func Login(c *gin.Context) {
	var form request.Login
	if err := c.ShouldBindJSON(&form); err != nil {
		response.ValidateFail(c, request.GetErrorMsg(form, err))
		return
	}

	if user, err := services.UserService.Login(form); err != nil {
		response.BusinessFail(c, err.Error())
	} else {
		tokenData, err, _ := services.JwtService.CreateToken(services.AppGuardName, user)
		if err != nil {
			response.BusinessFail(c, err.Error())
			return
		}
		//response.Success(c, tokenData)
		c.JSON(http.StatusOK, response.AuthResp{
			Code:       http.StatusOK,
			ExpireTime: tokenData.ExpiresIn,
			Id:         user.GetUid(),
			Token:      tokenData.AccessToken,
		})
	}
}

func GetAuthInfo(c *gin.Context) {
	userInfo, err := services.UserService.GetUserInfo(c.Keys["id"].(string))
	if err != nil {
		response.BusinessFail(c, err.Error())
		return
	}
	response.Success(c, userInfo)
}

func GetAuthMenu(c *gin.Context) {
	menuInfo, err := services.MenuService.GetMenuListByUserId(c.Keys["id"].(string))
	if err != nil {
		response.BusinessFail(c, err.Error())
		return
	}
	response.Success(c, menuInfo)
}

func Logout(c *gin.Context) {
	err := services.JwtService.JoinBlackList(c.Keys["token"].(*jwt.Token))
	if err != nil {
		response.BusinessFail(c, "退出失败")
		return
	}
	response.Success(c, nil)
}
