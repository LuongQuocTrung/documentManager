package controller

import (
	"department/src/model"
	"department/src/service"
	"github.com/labstack/echo/v4"
)

func Login(c echo.Context) error {
	var ctx = c.Request().Context()
	var payload = c.Get("payload").(model.LoginPayload)
	var rs, err = service.Login(ctx, payload)
	if err != nil {
		return c.JSON(401, model.Message{err.Error()})
	}
	return c.JSON(200, rs)
}
