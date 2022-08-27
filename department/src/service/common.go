package service

import (
	"context"
	"department/src/config"
	"department/src/constant"
	"department/src/model"
	"department/src/util"
	"errors"
	"github.com/golang-jwt/jwt"
)

func Login(ctx context.Context, payload model.LoginPayload) (model.LoginResponse, error) {
	var staff, err = getStaffByEmail(ctx, payload.Email)

	if err != nil {
		return model.LoginResponse{}, errors.New(constant.NOT_FOUND)
	}
	if !staff.Active {
		return model.LoginResponse{}, errors.New(constant.DENIED_ACCESS)
	}
	if !util.ComparePassword(payload.Password, staff.Password) {
		return model.LoginResponse{}, errors.New(constant.WRONG_PASSWORD)
	}
	var claims = &model.JwtCustomClaim{
		ID:     staff.ID,
		Name:   staff.Name,
		Email:  staff.Email,
		Active: staff.Active,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: util.CreateExpiryByHours(24),
		},
	}
	var token = jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	var encode, err2 = token.SignedString([]byte(config.ProcessEnv.SigningKey))
	if err2 != nil {
		return model.LoginResponse{}, errors.New(constant.FAILURE)
	}
	return model.LoginResponse{
		Token: encode,
		ID:    staff.ID.Hex(),
		Email: staff.Email,
		Name:  staff.Name,
	}, nil
}
