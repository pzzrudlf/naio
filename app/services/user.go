package services

import (
	"errors"
	"naio/app/common/request"
	"naio/app/models"
	"naio/global"
	"naio/utils"
	"strconv"
)

type userService struct {
}

var UserService = new(userService)

// Register 注册
func (userService *userService) Register(params request.Register) (user models.User, err error) {
	var result = global.App.DB.Where("mobile = ?", params.Mobile).Select("id").First(&models.User{})
	if result.RowsAffected != 0 {
		err = errors.New("手机号已存在")
		return
	}
	user = models.User{Name: params.Name, Mobile: params.Mobile, Password: utils.BcryptMake([]byte(params.Password))}
	err = global.App.DB.Create(&user).Error
	return
}

// Login 登陆
func (userService *userService) Login(params request.Login) (user *models.User, err error) {
	err = global.App.DB.Where("mobile = ?", params.Mobile).First(&user).Error
	if err != nil || !utils.BcryptMakeCheck([]byte(params.Password), user.Password) {
		err = errors.New("用户名不存在或者秘密错误")
	}
	return
}

// GetUserInfo 获取用户信息
func (userService *userService) GetUserInfo(id string) (user models.User, err error) {
	intId, _ := strconv.Atoi(id)
	err = global.App.DB.First(&user, intId).Error
	if err != nil {
		err = errors.New("数据不存在")
	}
	return
}
