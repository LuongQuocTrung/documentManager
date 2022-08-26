package controller

import (
	"department/src/constant"
	"department/src/model"
	"department/src/service"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateDepartment(c echo.Context) error {
	var ctx = c.Request().Context()
	var payload, ok = c.Get("payload").(model.DepartmentPayload)
	if !ok {
		return c.JSON(400, model.Message{constant.BAD_REQUEST})
	}
	var rs, err = service.CreateDepartemnt(ctx, payload)
	if err != nil {
		return c.JSON(400, err.Error())
	}
	return c.JSON(200, rs)
}

func UpdateDepartment(c echo.Context) error {
	var ctx = c.Request().Context()
	var payload, ok = c.Get("payload").(model.DepartmentPayload)
	var ID, _ = primitive.ObjectIDFromHex(c.Param("id"))
	if !ok {
		return c.JSON(400, model.Message{constant.BAD_REQUEST})
	}
	var rs, err = service.UpdateDepartment(ctx, ID, payload)
	if err != nil {
		return c.JSON(400, err.Error())
	}
	return c.JSON(200, rs)
}

func GetDepartment(c echo.Context) error {
	var ctx = c.Request().Context()
	var ID, _ = primitive.ObjectIDFromHex(c.Param("id"))
	var rs, err = service.GetDepartment(ctx, ID)
	if err != nil {
		return c.JSON(400, err.Error())
	}
	return c.JSON(200, rs)
}

func GetDepartments(c echo.Context) error {
	var ctx = c.Request().Context()
	var query, ok = c.Get("query").(model.DepartmentQuery)
	if !ok {
		return c.JSON(400, model.Message{constant.BAD_REQUEST})
	}
	var rs, err = service.GetDepartments(ctx, &query)
	if err != nil {
		return c.JSON(400, err.Error())
	}
	return c.JSON(200, rs)
}
