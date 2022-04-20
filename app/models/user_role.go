package models

type UserRole struct {
	ID
	UserId int `json:"user_id" gorm:"size:20;comment:用户id"`
	RoleId int `json:"role_id" gorm:"size:20;comment:角色id"`
}
