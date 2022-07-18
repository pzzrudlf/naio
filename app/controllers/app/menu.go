package app

import (
	"github.com/gin-gonic/gin"
	"naio/app/common/request"
	"naio/app/common/response"
	"naio/app/services"
)

func GetMenuList(c *gin.Context) {
	menu, err := services.MenuService.GetMenuList()
	if err != nil {
		response.BusinessFail(c, err.Error())
		return
	}
	response.Success(c, menu)
}

func GetMenuParent(c *gin.Context) {
	menu, err := services.MenuService.GetMenuParent()
	if err != nil {
		response.BusinessFail(c, err.Error())
		return
	}
	response.Success(c, menu)
}

func CreateMenu(c *gin.Context) {
	var form request.Menu
	if err := c.ShouldBindJSON(&form); err != nil {
		response.ValidateFail(c, request.GetErrorMsg(form, err))
		return
	}

	err := services.MenuService.CreateMenu(form)
	if err != nil {
		response.BusinessFail(c, "创建失败")
		return
	}
	response.Success(c, nil)
}

func UpdateMenu(c *gin.Context) {
	var form request.Menu
	if err := c.ShouldBindJSON(&form); err != nil {
		response.ValidateFail(c, request.GetErrorMsg(form, err))
		return
	}

	err := services.MenuService.UpdateMenu(form)
	if err != nil {
		response.BusinessFail(c, "更新失败")
		return
	}
	response.Success(c, nil)
}

func DeleteMenu(c *gin.Context) {
	err := services.MenuService.DeleteMenu(c.Keys["id"].(string))
	if err != nil {
		response.BusinessFail(c, err.Error())
		return
	}
	response.Success(c, nil)
}
