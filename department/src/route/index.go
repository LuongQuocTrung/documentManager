package route

import (
	"github.com/labstack/echo/v4"
)

func New(e *echo.Echo) {

	newCommonRoute(e)
	newStaffRouter(e)
	newDepartmentRouter(e)
}
