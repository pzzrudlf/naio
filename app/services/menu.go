package services

import "naio/app/models"

type menuService struct {
}

var MenuService = new(menuService)

func (menuService *menuService) GetMenuList() (menu models.Menu, err error) {
	return models.Menu{}, nil
}
