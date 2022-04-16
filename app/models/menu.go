package models

type Menu struct {
	ID
	Name string `json:"name" gorm:"size:30;not null;comment:菜单名称"`
	Pid  int    `json:"pid" gorm:"comment:父级菜单id"`
	Path string `json:"path" gorm:"comment:菜单路径"`
	Timestamps
	SoftDeletes
}
