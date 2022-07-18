package request

type Menu struct {
	Code       string `form:"code" json:"code" binding:"required"`
	EditType   string `form:"editType" json:"editType" binding:"required"`
	Icon       string `form:"icon" json:"icon" binding:"required"`
	Id         string `form:"id" json:"id" binding:"required"`
	Label      string `form:"label" json:"label" binding:"required"`
	Name       string `form:"name" json:"name" binding:"required"`
	OrderNum   string `form:"orderNum" json:"orderNum" binding:"required"`
	ParentId   string `form:"parentId" json:"parentId" binding:"required"`
	ParentName string `form:"parentName" json:"parentName" binding:"required"`
	Path       string `form:"path" json:"path" binding:"required"`
	Type       string `form:"type" json:"type" binding:"required"`
	Url        string `form:"url" json:"url" binding:"required"`
}
