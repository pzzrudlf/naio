package app

import (
	"github.com/gin-gonic/gin"
	"naio/app/common/response"
	"naio/app/services"
)

func GetMenu(c *gin.Context) {
	menu, err := services.MenuService.GetMenuList()
	if err != nil {
		response.BusinessFail(c, err.Error())
		return
	}
	response.Success(c, menu)
}
