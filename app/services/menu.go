package services

import (
	"naio/app/common/params"
	"naio/app/models"
	"naio/global"
	"strconv"
	"naio/utils"
)

type menuService struct {
}

var MenuService = new(menuService)

func (menuService *menuService) GetMenuList() (menu models.Menu, err error) {
	return models.Menu{}, nil
}

func (menuService *menuService) GetMenuListByUserId(userId string) ([]*params.AuthMenuDao, error) {
	intId, _ := strconv.Atoi(userId)
	var permissions []models.Permission
	global.App.DB.Raw("select id,parent_id,path,url,name,label,icon,code from permission where type in (0,1) and id in (select permission_id from role_permission where role_id = (select role_id from user_role where user_id = ?))", intId).Scan(&permissions)

	var menuInfo []*params.AuthMenuDao
	for _, item := range permissions {
		var menuItem params.AuthMenuDao
		menuItem.Id = item.ID.ID
		menuItem.ParentId = item.ParentId
		menuItem.Path = item.Path
		menuItem.Component = item.Url
		menuItem.Name = item.Name

		menuItem.Meta.Title = item.Label
		menuItem.Meta.Icon = item.Icon
		menuItem.Meta.Roles = []string{}
		menuItem.Meta.Roles = append(menuItem.Meta.Roles, item.Code)
		menuInfo = append(menuInfo, &menuItem)
	}
	data := utils.Tree(menuInfo, 0)
	return data, nil
}
