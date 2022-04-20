package models

type RolePermission struct {
	ID
	RoleId       int `json:"role_id" gorm:"size:20;comment:角色id"`
	PermissionId int `json:"permission_id" gorm:"size:20;comment:权限id"`
}
