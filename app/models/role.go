package models

type Role struct {
	ID
	Name       string `json:"name" gorm:"size:64;not null';comment:角色名称"`
	Remark     string `json:"remark" gorm:"size:200;comment:角色说明"`
	CreateUser string `json:"create_user" gorm:"size:11;comment:创建人"`
	Timestamps
}
