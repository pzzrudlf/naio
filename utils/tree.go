package utils

import (
	"naio/app/common/params"
	"reflect"
)

func AuthTree(list []*params.AuthMenuVO, pid uint) []*params.AuthMenuVO {
	var nodes []*params.AuthMenuVO
	if reflect.ValueOf(list).IsValid() {
		for _, v := range list {
			if v.ParentId == pid {
				v.Children = append(v.Children, AuthTree(list, v.Id)...)
				nodes = append(nodes, v)
			}
		}
	}
	return nodes
}

func Tree(list []*params.MenuVO, pid uint) []*params.MenuVO {
	var nodes []*params.MenuVO
	if reflect.ValueOf(list).IsValid() {
		for _, v := range list {
			if v.ParentId == pid {
				v.Children = append(v.Children, Tree(list, v.Id)...)
				nodes = append(nodes, v)
			}
		}
	}
	return nodes
}