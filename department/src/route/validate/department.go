package validate

import (
	"department/src/constant"
	"department/src/model"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/labstack/echo/v4"
)

func DepartmentPayload(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		var payload = new(model.DepartmentPayload)
		if err := c.Bind(payload); err != nil {
			return c.JSON(400, model.Message{constant.INVALID_INPUT})
		}
		var err = validation.ValidateStruct(payload,
			validation.Field(&payload.Name, validation.Required),
		)
		if err != nil {
			return c.JSON(400, model.Message{constant.INVALID_INPUT})
		}
		c.Set("payload", *payload)
		return next(c)
	}
}

func DepartmentQuery(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		var query = new(model.DepartmentQuery)
		if err := c.Bind(query); err != nil {
			return c.JSON(400, model.Message{constant.INVALID_INPUT})
		}
		var err = validation.ValidateStruct(query,
			validation.Field(&query.Limit, validation.Required),
			validation.Field(&query.Page, validation.Required),
		)
		if err != nil {
			return c.JSON(400, model.Message{constant.INVALID_INPUT})
		}
		c.Set("query", *query)
		return next(c)
	}
}
