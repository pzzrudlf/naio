package models

type Permission struct {
	ID
	ParentId   uint   `json:"parent_id" gorm:"size:20;default:null;comment:父权限ID(0为顶级菜单)"`
	ParentName string `json:"parent_name" gorm:"size:36;comment:父级菜单名称"`
	Label      string `json:"label" gorm:"size:64;not null;comment:权限名称"`
	Code       string `json:"code" gorm:"size:64;comment:授权标识符"`
	Path       string `json:"path" gorm:"size:255;comment:路由地址"`
	Name       string `json:"name" gorm:"size:255;comment:路由名称"`
	Url        string `json:"url" gorm:"size:255;comment:授权路径"`
	OrderNum   int    `json:"order_num" gorm:"size:11;default:0;comment:序号"`
	Type       int    `json:"type" gorm:"size:2;not null;default:0;comment:类型(0目录1菜单2按钮)"`
	Icon       string `json:"icon" gorm:"size:200;comment:图标"`
	Remark     string `json:"remark" gorm:"size:200;default:null;comment:备注"`
	Timestamps
	//SoftDeletes
}
