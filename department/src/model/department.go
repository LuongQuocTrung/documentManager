package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	DepartmentPayload struct {
		Name string `json:"name" form:"name" bson:"name"`
	}
	Department struct {
		ID   primitive.ObjectID `bson:"_id"`
		Name string             `json:"name" form:"name" bson:"name"`
	}
	DepartmentResponse struct {
		ID   string `json:"_id"`
		Name string `json:"Name"`
	}
	DepartmentQuery struct {
		Limit   int64  `query:"limit"`
		Page    int64  `query:"page"`
		Keyword string `query:"keyword"`
	}
)
