package global

type CustomError struct {
	ErrorCode int
	ErrorMsg  string
}

type CustomErrors struct {
	BusinessError   CustomError
	ValidateError   CustomError
	TokenError      CustomError
	PermissionError CustomError
	CasbinError     CustomError
}

var Errors = CustomErrors{
	BusinessError:   CustomError{40000, "业务错误"},
	ValidateError:   CustomError{42200, "请求参数错误"},
	TokenError:      CustomError{40100, "登陆授权Token失效"},
	CasbinError:     CustomError{50000, "casbin自身错误"},
	PermissionError: CustomError{50000, "无此权限"},
}
