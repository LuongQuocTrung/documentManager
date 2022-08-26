package dao

import (
	"context"
	"department/src/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
)

var departmentCol *mongo.Collection

func SetDepartmentCollection(c *mongo.Collection) {
	departmentCol = c
}

func CreateDepartment(ctx context.Context, payload model.DepartmentPayload) (*mongo.InsertOneResult, error) {
	var result, err = departmentCol.InsertOne(ctx, payload)
	if err != nil {
		return result, err
	}
	return result, nil
}

func UpdateDepartment(ctx context.Context, id primitive.ObjectID, payload model.DepartmentPayload) (model.Department, error) {
	var filter = bson.D{{"_id", id}}
	var opt = options.FindOneAndUpdate().SetReturnDocument(options.After)
	var update = bson.D{{"$set", payload}}
	var result model.Department
	var err = departmentCol.FindOneAndUpdate(ctx, filter, update, opt).Decode(&result)
	if err != nil {
		return result, err
	}
	return result, nil
}

func GetDepartmentById(ctx context.Context, id primitive.ObjectID) (model.Department, error) {
	var department model.Department
	var filter = bson.D{{"_id", id}}
	var err = departmentCol.FindOne(ctx, filter).Decode(&department)
	if err != nil {
		return department, err
	}
	return department, nil
}

func GetDepartmentByName(ctx context.Context, name string) (model.Department, error) {
	var department model.Department
	var filter = bson.D{{"name", name}}
	var err = departmentCol.FindOne(ctx, filter).Decode(&department)
	if err != nil {
		return department, err
	}
	return department, nil
}

func GetDepartments(ctx context.Context, query model.DepartmentQuery) ([]model.Department, error) {
	var departments = []model.Department{}
	var filter = bson.D{{"name", bson.D{{"$regex", query.Keyword}}}}
	var opts = options.Find().SetLimit(query.Limit).SetSkip((query.Page - 1) * query.Limit)
	var result, err = departmentCol.Find(ctx, filter, opts)
	if err != nil {
		return nil, err
	}
	for result.Next(context.Background()) {
		var department model.Department
		err := result.Decode(&department)
		if err != nil {
			log.Fatal(err)
		}
		departments = append(departments, department)
	}
	if err != nil {
		return nil, err
	}
	return departments, nil
}
