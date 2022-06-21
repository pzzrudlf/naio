package services

import (
	"naio/app/common/params"
	"naio/app/models"
	"naio/global"
	"naio/utils"
	"strconv"
)

type menuService struct {
}

var MenuService = new(menuService)

func (menuService *menuService) GetMenuParent() (menuParent []*params.MenuVO, err error) {
	var menuItem params.MenuVO
	menuList, err := menuService.GetMenuList()
	if err != nil {
		return nil, err
	}
	menuItem.Id = 0
	menuItem.ParentId = -1
	menuItem.Label = "顶级菜单"
	menuItem.Children = append(menuItem.Children, menuList...)
	menuParent = append(menuParent, &menuItem)

	return menuParent, nil
}

func (menuService *menuService) GetMenuList() (menu []*params.MenuVO, err error) {
	var permissions []models.Permission
	global.App.DB.Raw("select id,parent_id,parent_name,label,code,path,name,url,order_num,type,icon,remark,create_time,update_time from permission").Scan(&permissions)

	var menuInfo []*params.MenuVO
	for _, item := range permissions {
		var menuItem params.MenuVO
		menuItem.Id = item.ID.ID
		menuItem.ParentId = item.ParentId
		menuItem.ParentName = item.ParentName
		menuItem.Label = item.Label
		menuItem.Code = item.Code
		menuItem.Path = item.Path
		menuItem.Name = item.Name
		menuItem.Url = item.Url
		menuItem.OrderNum = item.OrderNum
		menuItem.Type = strconv.Itoa(item.Type)
		menuItem.Icon = item.Icon
		menuItem.Remark = item.Remark
		menuItem.CreateTime = item.CreateTime.String()
		menuItem.UpdateTime = item.UpdateTime.String()
		menuInfo = append(menuInfo, &menuItem)
	}

	data := utils.Tree(menuInfo, 0)
	return data, nil
}

func (menuService *menuService) GetMenuListByUserId(userId string) ([]*params.AuthMenuVO, error) {
	intId, _ := strconv.Atoi(userId)
	var permissions []models.Permission
	global.App.DB.Raw("select id,parent_id,path,url,name,label,icon,code from permission where type in (0,1) and id in (select permission_id from role_permission where role_id = (select role_id from user_role where user_id = ?))", intId).Scan(&permissions)

	var menuInfo []*params.AuthMenuVO
	for _, item := range permissions {
		var menuItem params.AuthMenuVO
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

	data := utils.AuthTree(menuInfo, 0)
	return data, nil
}
