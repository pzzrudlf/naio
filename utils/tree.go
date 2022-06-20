package utils

import (
	"naio/app/common/params"
	"reflect"
)

func Tree(list []*params.AuthMenuDao, pid uint) []*params.AuthMenuDao {
	var nodes []*params.AuthMenuDao
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
