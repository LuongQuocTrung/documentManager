package dao

import (
	"context"
	"department/src/model"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var staffCol *mongo.Collection

func SetStaffCollection(col *mongo.Collection) {
	staffCol = col
}

func GetStaffs(ctx context.Context, query model.StaffQuery) ([]model.Staff, error) {
	var staffs = []model.Staff{}
	var filter = bson.M{}
	if !query.Department.IsZero() {
		filter["departmentId"] = query.Department
	}
	if len(query.Keyword) > 0 {
		filter["name"] = bson.M{
			"$regex": query.Keyword,
		}
	}
	var opts = options.Find().SetLimit(query.Limit).SetSkip((query.Page - 1) * query.Limit)
	var result, err = staffCol.Find(ctx, filter, opts)
	if err != nil {
		return nil, err
	}
	for result.Next(context.Background()) {
		var staff model.Staff
		err := result.Decode(&staff)
		if err != nil {
			log.Fatal(err)
		}
		staffs = append(staffs, staff)
	}
	if err != nil {
		return nil, err
	}
	return staffs, nil
}

func GetStaff(ctx context.Context, id primitive.ObjectID) (model.Staff, error) {
	var staff model.Staff
	var err = staffCol.FindOne(ctx, bson.D{{"_id", id}}).Decode(&staff)
	if err != nil {
		return staff, err
	}
	return staff, nil
}

func GetStaffByEmail(ctx context.Context, email string) (model.Staff, error) {
	var staff model.Staff
	var err = staffCol.FindOne(ctx, bson.D{{"email", email}}).Decode(&staff)
	if err != nil {
		return staff, err
	}
	return staff, nil
}

func CreateStaff(ctx context.Context, staff model.StaffPayload) (interface{}, error) {
	var result, err = staffCol.InsertOne(context.TODO(), staff)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func UpdateStaff(ctx context.Context, id primitive.ObjectID, staff model.StaffPayload) (model.Staff, error) {
	var result model.Staff
	var filter = bson.D{{"_id", id}}
	var update = bson.D{{"$set", staff}}
	var opts = options.FindOneAndUpdate().SetReturnDocument(options.After)
	var err = staffCol.FindOneAndUpdate(ctx, filter, update, opts).Decode(&result)
	if err != nil {
		return result, err
	}
	return result, nil
}

func ChangeStaffActive(ctx context.Context, payload model.StaffStatusPayload) (*mongo.UpdateResult, error) {
	var filter = bson.D{{"_id", payload.ID}}
	var update = bson.D{{"$set", bson.D{{"active", payload.Active}}}}
	var result, err = staffCol.UpdateOne(ctx, filter, update, options.Update())
	if err != nil {
		return nil, err
	}
	return result, err

}

func DeleteStaff(ctx context.Context, id primitive.ObjectID) (*mongo.DeleteResult, error) {
	var filter = bson.D{{"_id", id}}
	var result, err = staffCol.DeleteOne(ctx, filter, options.Delete())
	if err != nil {
		return nil, err
	}
	return result, nil
}
