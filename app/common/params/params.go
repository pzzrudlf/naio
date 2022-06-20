package params

type AuthInfoDao struct {
	ID           string      `json:"id"`
	Name         string      `json:"name"`
	Avatar       string      `json:"avatar"`
	Introduction string      `json:"introduction"`
	Roles        interface{} `json:"roles"`
}

func (authInfoDao AuthInfoDao) GetUid() string {
	return authInfoDao.ID
}

func (authInfoDao AuthInfoDao) GetName() string {
	return authInfoDao.Name
}

type MetaDao struct {
	Title string   `json:"title"`
	Icon  string   `json:"icon"`
	Roles []string `json:"roles"`
}

type AuthMenuDao struct {
	Id        uint           `json:"id"`
	ParentId  uint           `json:"parent_id"`
	Path      string         `json:"path"`
	Component string         `json:"component"`
	Name      string         `json:"name"`
	Meta      MetaDao        `json:"meta"`
	Children  []*AuthMenuDao `json:"children"`
}
