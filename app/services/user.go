package services

import (
	"errors"
	"fmt"
	"naio/app/common/request"
	"naio/app/models"
	"naio/global"
	"naio/utils"
	"strconv"
	"naio/app/common/params"
)

type userService struct {
}

var UserService = new(userService)

// Register 注册
func (userService *userService) Register(params request.Register) (user models.User, err error) {
	var result = global.App.DB.Where("username = ?", params.Username).Select("id").First(&models.User{})
	if result.RowsAffected != 0 {
		err = errors.New("手机号已存在")
		return
	}
	user = models.User{Username: params.Username, Password: utils.BcryptMake([]byte(params.Password))}
	err = global.App.DB.Create(&user).Error
	return
}

// Login 登陆
func (userService *userService) Login(params request.Login) (user *models.User, err error) {
	err = global.App.DB.Where("username = ?", params.Username).First(&user).Error
	if err != nil || !utils.BcryptMakeCheck([]byte(params.Password), user.Password) {
		err = errors.New("用户名不存在或者秘密错误")
	}
	return
}

// GetUserInfo 获取用户信息
func (userService *userService) GetUserInfo(userId string) (userInfo params.AuthInfoDao, err error) {
	intId, _ := strconv.Atoi(userId)
	var permissions []models.Permission
	global.App.DB.Raw("select code from permission where id in (select permission_id from role_permission where role_id = (select role_id from user_role where user_id = ?))", intId).Scan(&permissions)

	var user models.User
	err = global.App.DB.First(&user, intId).Error
	if err != nil {
		err = errors.New("数据不存在")
	}

	userInfo.ID = strconv.Itoa(int(user.ID.ID))
	userInfo.Name = user.Username
	userInfo.Avatar = ""
	userInfo.Introduction = ""

	var roles []string
	for _, v := range permissions {
		fmt.Println(v.Code)
		roles = append(roles, v.Code)
	}
	
	userInfo.Roles = roles
	return
}
