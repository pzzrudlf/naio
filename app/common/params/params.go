package params

type AuthInfoVO struct {
	ID           string      `json:"id"`
	Name         string      `json:"name"`
	Avatar       string      `json:"avatar"`
	Introduction string      `json:"introduction"`
	Roles        interface{} `json:"roles"`
}

func (authInfoVO AuthInfoVO) GetUid() string {
	return authInfoVO.ID
}

func (authInfoVO AuthInfoVO) GetName() string {
	return authInfoVO.Name
}

type MetaVO struct {
	Title string   `json:"title"`
	Icon  string   `json:"icon"`
	Roles []string `json:"roles"`
}

type AuthMenuVO struct {
	Id        uint          `json:"-"`
	ParentId  uint          `json:"-"`
	Path      string        `json:"path"`
	Component string        `json:"component"`
	Name      string        `json:"name"`
	Meta      MetaVO        `json:"meta"`
	Children  []*AuthMenuVO `json:"children"`
}

type MenuVO struct {
	Id         uint      `json:"id"`
	ParentId   interface{}      `json:"parentId"`
	ParentName string    `json:"parentName"`
	Label      string    `json:"label"` // 页面表格
	Code       string    `json:"code"` // 页面表格
	Path       string    `json:"path"` // 页面表格
	Name       string    `json:"name"` // 页面表格
	Url        string    `json:"url"` // 页面表格
	OrderNum   int       `json:"orderNum"`
	Type       string    `json:"type"` // 页面表格
	Icon       string    `json:"icon"` // 页面表格
	Remark     string    `json:"remark"`
	CreateTime string    `json:"createTime"`
	UpdateTime string    `json:"updateTime"`
	Children   []*MenuVO `json:"children"`
}
