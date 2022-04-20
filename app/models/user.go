package models

import "strconv"

type User struct {
	ID
	Username                string `json:"username" gorm:"size:30;not null;unique_index;comment:用户名称"`
	Password                string `json:"-" gorm:"not null;default:'';comment:用户密码admin/1234"`
	IsAccountNonExpired     int    `json:"is_account_non_expired" gorm:"size:2;default:1;comment:账户是否过期(1未过期,0已过期)"`
	IsAccountNonLocked      int    `json:"is_account_non_locked" gorm:"size:2;default:1;comment:账户是否被锁定(1未锁定,0已锁定)"`
	IsCredentialsNonExpired int    `json:"is_credentials_non_expired" gorm:"size:2;default:1;comment:密码是否过期(1未过期,0已过期)"`
	IsEnabled               int    `json:"is_enabled" gorm:"size:2;default:1;comment:账户是否可用(1可用,0删除用户)"`
	NickName                string `json:"nick_name" gorm:"size:64;default:null;comment:昵称"`
	DeptId                  string `json:"dept_id" gorm:"size:56;default:null;comment:部门id"`
	DeptName                string `json:"dept_name" gorm:"size:255;default:null;comment:部门名称"`
	Mobile                  string `json:"mobile" gorm:"size:20;default:null;comment:手机号"`
	Email                   string `json:"email" gorm:"size:50;default:null;comment:注册邮箱"`
	PostId                  int    `json:"post_id" gorm:"size:11;default:null;comment:岗位id"`
	PostName                string `json:"post_name" gorm:"size:36;default:null;comment:岗位名称"`
	LoginName               string `json:"login_name" gorm:"size:36;default:null;comment:姓名"`
	IsAdmin                 string `json:"is_admin" gorm:"size:5;default:0;comment:1管理员"`
	Sex                     string `json:"sex" gorm:"size:5;default:null;comment:0男1女"`
	Salt                    string `json:"salt" gorm:"size:255;default:null;comment:加密盐"`
	Timestamps
	//SoftDeletes
}

func (user User) GetUid() string {
	return strconv.Itoa(int(user.ID.ID))
}

func (user User) GetName() string {
	return user.Username
}
