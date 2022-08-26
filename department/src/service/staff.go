package service

import (
	"context"
	"department/src/constant"
	"department/src/dao"
	"department/src/model"
	"department/src/util"
	"errors"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"reflect"
)

func CreateStaff(ctx context.Context, payload model.StaffPayload) (model.Message, error) {
	if isExistEmailStaff(ctx, payload.Email) {
		return model.Message{}, errors.New(constant.ALREADY_EXIST)
	}
	payload.Password, _ = util.HashPassword(payload.Password)
	var _, err = dao.CreateStaff(ctx, payload)
	if err != nil {
		return model.Message{}, err
	}
	return model.Message{constant.CREATE_SUCCESS}, nil
}

func UpdateStaff(ctx context.Context, id primitive.ObjectID, payload model.StaffPayload) (model.Message, error) {
	if isExistEmailStaff(ctx, payload.Email) {
		return model.Message{}, errors.New(constant.ALREADY_EXIST)
	}
	if isExistStaff(ctx, id) {
		var _, err = dao.UpdateStaff(ctx, id, payload)
		if err != nil {
			return model.Message{}, err
		}
		return model.Message{constant.UPDATE_SUCCESS}, nil
	}
	return model.Message{}, errors.New(constant.NOT_FOUND)
}

func ChangeActiveStaff(ctx context.Context, payload model.StaffStatusPayload) (model.Message, error) {
	var _, err = dao.ChangeStaffActive(ctx, payload)
	if err != nil {
		return model.Message{}, err
	}
	return model.Message{constant.UPDATE_SUCCESS}, nil
}

func DeleteStaff(ctx context.Context, id primitive.ObjectID) (model.Message, error) {
	var _, err = dao.DeleteStaff(ctx, id)
	if err != nil {
		return model.Message{}, err
	}
	return model.Message{constant.Success}, nil
}

func GetStaff(ctx context.Context, id primitive.ObjectID) (model.StaffResponse, error) {

	var rs, err = dao.GetStaff(ctx, id)

	if err != nil {
		return model.StaffResponse{}, err
	}

	if reflect.DeepEqual(rs, model.Staff{}) {
		return model.StaffResponse{}, errors.New(constant.NOT_FOUND)
	}

	var department, _ = GetDepartment(ctx, rs.Department)

	return model.StaffResponse{
		ID:         rs.ID.Hex(),
		Name:       rs.Name,
		Email:      rs.Email,
		Active:     rs.Active,
		Salary:     rs.Salary,
		Department: department,
	}, nil
}

func GetStaffs(ctx context.Context, query *model.StaffQuery) ([]model.StaffResponse, error) {

	if query.Limit < 1 {
		query.Limit = 20
	}
	if query.Page < 1 {
		query.Page = 1
	}

	var rs, err = dao.GetStaffs(ctx, *query)
	if err != nil {
		return nil, err
	}

	var staffs = []model.StaffResponse{}
	for _, value := range rs {
		var department, _ = GetDepartment(ctx, value.Department)

		staffs = append(staffs, model.StaffResponse{
			ID:         value.ID.Hex(),
			Name:       value.Name,
			Email:      value.Email,
			Active:     value.Active,
			Salary:     value.Salary,
			Department: department,
		})
	}
	return staffs, nil
}

func isExistStaff(ctx context.Context, id primitive.ObjectID) bool {
	var rs, err = dao.GetStaff(ctx, id)
	if err != nil || reflect.DeepEqual(rs, model.Staff{}) {
		return false
	}
	return true
}

func isExistEmailStaff(ctx context.Context, email string) bool {
	var rs, err = dao.GetStaffByEmail(ctx, email)
	if err != nil || reflect.DeepEqual(rs, model.Staff{}) {
		return false
	}
	return true
}
