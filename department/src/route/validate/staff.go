package validate

import (
	"department/src/constant"
	"department/src/model"
	"fmt"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
	"github.com/labstack/echo/v4"
)

func StaffPayload(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		var payload = new(model.StaffPayload)
		if err := c.Bind(payload); err != nil {
			return c.JSON(400, constant.INVALID_INPUT)
		}
		var err = validation.ValidateStruct(payload,
			validation.Field(&payload.Name, validation.Required),
			validation.Field(&payload.Email, validation.Required, is.Email),
			validation.Field(&payload.Salary, validation.Required),
			//validation.Field(&payload.Active, validation.Required),
			validation.Field(&payload.Password, validation.Required),
		)
		if err != nil {
			fmt.Println(err, payload)
			return c.JSON(400, constant.INVALID_INPUT)
		}
		c.Set("payload", *payload)
		return next(c)
	}
}

func StaffQuery(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {

		var query = new(model.StaffQuery)
		if err := c.Bind(query); err != nil {
			return c.JSON(400, constant.INVALID_INPUT)
		}
		var err = validation.ValidateStruct(query,
			validation.Field(&query.Limit, validation.Required),
			validation.Field(&query.Page, validation.Required),
			validation.Field(&query.Department, validation.Each(is.MongoID)),
		)
		if err != nil {
			return c.JSON(400, constant.INVALID_INPUT)
		}
		c.Set("query", *query)
		return next(c)
	}
}

func StaffStatusPayload(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		var payload = new(model.StaffStatusPayload)
		if err := c.Bind(payload); err != nil {
			fmt.Println("payload ...", err)
			return c.JSON(400, constant.INVALID_INPUT)
		}
		var err = validation.ValidateStruct(payload,
			validation.Field(&payload.ID, validation.Required),
			//validation.Field(&payload.Active, validation.Required),
		)
		if err != nil {
			fmt.Println("validate...", err, payload)
			return c.JSON(400, constant.INVALID_INPUT)
		}
		c.Set("payload", *payload)
		return next(c)
	}
}
