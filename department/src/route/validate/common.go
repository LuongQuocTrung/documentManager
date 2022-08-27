package validate

import (
	"department/src/constant"
	"department/src/model"
	"fmt"
	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
	"github.com/labstack/echo/v4"
)

func IsMongoID(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		if err := validation.Validate(c.Param("id"), is.MongoID); err != nil {
			return c.JSON(400, model.Message{constant.INVALID_INPUT})
		}
		return next(c)
	}
}

func LoginPayload(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		var payload = new(model.LoginPayload)
		if err := c.Bind(payload); err != nil {
			return c.JSON(400, model.Message{constant.INVALID_INPUT})
		}
		var err = validation.ValidateStruct(payload,
			validation.Field(&payload.Email, validation.Required, is.Email),
			validation.Field(&payload.Password, validation.Required),
		)
		if err != nil {
			fmt.Println(err)
			return c.JSON(400, model.Message{constant.INVALID_INPUT})
		}
		c.Set("payload", *payload)
		return next(c)
	}
}
