package controller

import (
	"department/src/constant"
	"department/src/model"
	"department/src/service"
	"fmt"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateStaff(c echo.Context) error {
	var ctx = c.Request().Context()
	var payload, ok = c.Get("payload").(model.StaffPayload)
	if !ok {
		return c.JSON(400, model.Message{constant.BAD_REQUEST})
	}
	var rs, err = service.CreateStaff(ctx, payload)
	if err != nil {
		return c.JSON(400, err.Error())
	}
	return c.JSON(200, rs)

}

func UpdateStaff(c echo.Context) error {
	var ctx = c.Request().Context()
	var payload, ok = c.Get("payload").(model.StaffPayload)
	var ID, _ = primitive.ObjectIDFromHex(c.Param("id"))
	fmt.Println(payload, ID)
	if !ok {
		return c.JSON(400, model.Message{constant.BAD_REQUEST})
	}

	var rs, err = service.UpdateStaff(ctx, ID, payload)
	if err != nil {
		return c.JSON(400, err.Error())
	}
	return c.JSON(200, rs)
}

func GetStaffs(c echo.Context) error {
	fmt.Println(c.Get("user"))
	var ctx = c.Request().Context()
	var query, ok = c.Get("query").(model.StaffQuery)
	if !ok {
		return c.JSON(400, model.Message{constant.BAD_REQUEST})
	}
	var rs, err = service.GetStaffs(ctx, &query)
	if err != nil {
		return c.JSON(400, err.Error())
	}
	return c.JSON(200, rs)
}

func GetStaff(c echo.Context) error {
	var ctx = c.Request().Context()
	var ID, _ = primitive.ObjectIDFromHex(c.Param("id"))
	var rs, err = service.GetStaff(ctx, ID)
	if err != nil {
		return c.JSON(400, err.Error())
	}
	return c.JSON(200, rs)
}

func ChangeStaffActive(c echo.Context) error {
	var ctx = c.Request().Context()
	var payload, ok = c.Get("payload").(model.StaffStatusPayload)
	if !ok {
		return c.JSON(400, model.Message{constant.BAD_REQUEST})
	}
	var rs, err = service.ChangeActiveStaff(ctx, payload)
	if err != nil {
		c.JSON(400, err.Error())
	}
	return c.JSON(200, rs)
}

func DeleteStaff(c echo.Context) error {
	var ctx = c.Request().Context()
	var ID, _ = primitive.ObjectIDFromHex(c.Param("id"))
	var rs, err = service.DeleteStaff(ctx, ID)
	if err != nil {
		c.JSON(400, err.Error())
	}
	return c.JSON(200, rs)
}
