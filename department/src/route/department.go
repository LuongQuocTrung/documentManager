package route

import (
	"department/src/controller"
	"department/src/route/permission"
	"department/src/route/validate"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func newDepartmentRouter(e *echo.Echo) {
	var r = e.Group("/department/")
	r.Use(middleware.JWTWithConfig(permission.JWTConfig))
	r.GET(":id", controller.GetDepartment, validate.IsMongoID)
	r.GET("", controller.GetDepartments, validate.DepartmentQuery)
	r.POST("", controller.CreateDepartment, validate.DepartmentPayload)
	r.PUT(":id", controller.UpdateDepartment, validate.DepartmentPayload)
}
