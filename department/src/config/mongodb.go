package config

import (
	"context"
	"department/src/dao"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"time"
)

var mongoDb *mongo.Database

func ConnectMongoDb() {
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(ProcessEnv.Database.Url))
	if err != nil {
		log.Fatalln("Connect database fail")
		return
	}
	mongoDb = client.Database(ProcessEnv.Database.Name)
	dao.SetStaffCollection(mongoDb.Collection("staffs"))
	dao.SetDepartmentCollection(mongoDb.Collection("departments"))
	fmt.Println("Connect successfully")
}
