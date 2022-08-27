package route

import (
	"department/src/controller"
	"department/src/route/validate"
	"github.com/labstack/echo/v4"
)

func newCommonRoute(e *echo.Echo) {

	var r = e.Group("/")

	r.POST("login", controller.Login, validate.LoginPayload)
}
