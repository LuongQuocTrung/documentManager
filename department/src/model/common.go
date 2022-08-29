package model

import (
	"github.com/golang-jwt/jwt"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type (
	LoginPayload struct {
		Email    string `json:"email" form:"email" bson:"email"`
		Password string `json:"password" form:"password" bson:"password"`
	}

	JwtCustomClaim struct {
		ID     primitive.ObjectID `json:"_id"`
		Name   string             `json:"name"`
		Email  string             `json:"admin"`
		Active bool               `json:"active"`
		jwt.StandardClaims
	}

	LoginResponse struct {
		Token string `json:"token"`
		ID    string `json:"_id"`
		Email string `json:"email"`
		Name  string `json:"name"`
	}
)
