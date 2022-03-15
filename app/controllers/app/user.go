package app

import (
    "github.com/gin-gonic/gin"
    "naio/app/common/request"
    "naio/app/common/response"
    "naio/app/services"
)

// Register 用户注册
func Register(c *gin.Context) {
    var form request.Register
    if err := c.ShouldBindJSON(&form); err != nil {
        response.ValidateFail(c, request.GetErrorMsg(form, err))
        return
    }

    if err, user := services.UserService.Register(form); err != nil {
       response.BusinessFail(c, err.Error())
    } else {
       response.Success(c, user)
    }
}
