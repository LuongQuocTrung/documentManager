package model

import (
	_ "github.com/go-ozzo/ozzo-validation/v4/is"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	StaffPayload struct {
		Name       string             `bson:"name" json:"name" form:"name" `
		Email      string             `bson:"email" json:"email" form:"email"`
		Password   string             `bson:"password" json:"password" form:"password"`
		Active     bool               `bson:"active" json:"active"  form:"active" `
		Salary     float64            `bson:"salary" json:"salary" form:"salary"`
		Department primitive.ObjectID `bson:"departmentId" json:"department" form:"department"`
	}

	Staff struct {
		ID         primitive.ObjectID `bson:"_id"`
		Name       string             `bson:"name"`
		Email      string             `bson:"email"`
		Password   string             `bson:"password"`
		Active     bool               `bson:"active"`
		Salary     float64            `bson:"salary"`
		Department primitive.ObjectID `bson:"departmentId" `
	}

	StaffResponse struct {
		ID         string             `json:"_id"`
		Name       string             `json:"name"`
		Email      string             `json:"email"`
		Active     bool               `json:"active"`
		Salary     float64            `json:"salary"`
		Department DepartmentResponse `json:"department" `
	}

	StaffQuery struct {
		Limit      int64              `query:"limit"`
		Page       int64              `query:"page"`
		Keyword    string             `query:"keyword"`
		Department primitive.ObjectID `query:"department,omitempty"`
	}

	StaffStatusPayload struct {
		ID     primitive.ObjectID `bson:"_id" param:"id"`
		Active bool               `bson:"active" form:"active" json:"active"`
	}
)
