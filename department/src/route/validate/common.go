package validate

import (
	"department/src/constant"
	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
	"github.com/labstack/echo/v4"
)

func IsMongoID(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		if err := validation.Validate(c.Param("id"), is.MongoID); err != nil {
			return c.JSON(400, constant.INVALID_INPUT)
		}
		return next(c)
	}
}
