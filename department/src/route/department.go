package route

import (
	"department/src/controller"
	"department/src/route/validate"
	"github.com/labstack/echo/v4"
)

func NewDepartmentRouter(e *echo.Echo) {
	var r = e.Group("/department/")

	r.GET(":id", controller.GetDepartment, validate.IsMongoID)
	r.GET("", controller.GetDepartments, validate.DepartmentQuery)
	r.POST("", controller.CreateDepartment, validate.DepartmentPayload)
	r.PUT(":id", controller.UpdateDepartment, validate.DepartmentPayload)
}
