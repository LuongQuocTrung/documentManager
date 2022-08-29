package service

import (
	"context"
	"department/src/constant"
	"department/src/dao"
	"department/src/model"
	"errors"
	"reflect"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateDepartemnt(ctx context.Context, payload model.DepartmentPayload) (model.Message, error) {
	if isExistNameDepartment(ctx, payload.Name) {
		return model.Message{}, errors.New(constant.ALREADY_EXIST)
	}
	var _, err = dao.CreateDepartment(ctx, payload)
	if err != nil {
		return model.Message{}, err
	}
	return model.Message{constant.CREATE_SUCCESS}, nil

}

func UpdateDepartment(ctx context.Context, id primitive.ObjectID, payload model.DepartmentPayload) (model.Message, error) {
	if isExistNameDepartment(ctx, payload.Name) {
		return model.Message{}, errors.New(constant.ALREADY_EXIST)
	}
	if isExistDepartment(ctx, id) {
		var _, err = dao.UpdateDepartment(ctx, id, payload)
		if err != nil {
			return model.Message{}, err
		}
		return model.Message{constant.UPDATE_SUCCESS}, nil
	}
	return model.Message{}, errors.New(constant.NOT_FOUND)

}

func GetDepartment(ctx context.Context, id primitive.ObjectID) (model.DepartmentResponse, error) {
	var rs, err = dao.GetDepartmentById(ctx, id)
	if err != nil {
		return model.DepartmentResponse{}, errors.New(constant.NOT_FOUND)
	}
	return model.DepartmentResponse{
		ID:   rs.ID.Hex(),
		Name: rs.Name,
	}, nil
}

func GetDepartments(ctx context.Context, query *model.DepartmentQuery) ([]model.DepartmentResponse, error) {
	if query.Limit < 1 {
		query.Limit = 20
	}
	if query.Page < 1 {
		query.Page = 1
	}
	var rs, err = dao.GetDepartments(ctx, *query)
	if err != nil {
		return nil, err
	}
	var departments = []model.DepartmentResponse{}
	for _, value := range rs {
		departments = append(departments, model.DepartmentResponse{
			ID:   value.ID.Hex(),
			Name: value.Name,
		})
	}
	return departments, nil
}

func isExistNameDepartment(ctx context.Context, name string) bool {
	var rs, err = dao.GetDepartmentByName(ctx, name)
	if err != nil {
		return false
	}
	if reflect.DeepEqual(rs, model.Department{}) {
		return false
	}
	return true
}

func isExistDepartment(ctx context.Context, id primitive.ObjectID) bool {
	var rs, err = dao.GetDepartmentById(ctx, id)
	if err != nil {
		return false
	}
	if reflect.DeepEqual(rs, model.Department{}) {
		return false
	}
	return true
}
