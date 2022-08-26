package route

import (
	"department/src/controller"
	"department/src/route/validate"

	"github.com/labstack/echo/v4"
)

func NewStaffRouter(e *echo.Echo) {

	r := e.Group("/staff")
	r.POST("", controller.CreateStaff, validate.StaffPayload)
	r.PUT("/:id", controller.UpdateStaff, validate.StaffPayload)
	r.PATCH("/:id", controller.ChangeStaffActive, validate.StaffStatusPayload)
	r.DELETE("/:id", controller.DeleteStaff, validate.IsMongoID)
	r.GET("", controller.GetStaffs, validate.StaffQuery)
	r.GET("/:id", controller.GetStaff, validate.IsMongoID)
}
