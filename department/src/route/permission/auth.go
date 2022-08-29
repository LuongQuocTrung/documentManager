package permission

import (
	"department/src/config"
	"department/src/constant"
	"department/src/model"
	"department/src/service"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"strings"
)

var JWTConfig = middleware.JWTConfig{
	TokenLookup: "header:authorization",
	ParseTokenFunc: func(auth string, c echo.Context) (interface{}, error) {
		keyFunc := func(t *jwt.Token) (interface{}, error) {
			if t.Method.Alg() != "HS256" {
				return nil, fmt.Errorf("unexpected jwt signing method=%v", t.Header["alg"])
			}
			return []byte(config.ProcessEnv.SigningKey), nil
		}
		if !strings.HasPrefix(auth, "Bearer ") {
			return nil, errors.New("invalid token")
		}
		var splitAuth = strings.Split(auth, "Bearer ")
		token, err := jwt.Parse(splitAuth[1], keyFunc)
		if err != nil {
			return nil, err
		}
		if !token.Valid {
			return nil, errors.New("invalid token")
		}
		var account = model.JwtCustomClaim{}
		jsonClaim, _ := json.Marshal(token.Claims)
		if err := json.Unmarshal(jsonClaim, &account); err != nil {
			return nil, errors.New(constant.FAILURE)
		}
		var ctx = c.Request().Context()
		var user, _ = service.GetStaff(ctx, account.ID)
		if !user.Active {
			return nil, errors.New(constant.ACCOUNT_IS_DISABLE)
		}
		return user, nil
	},
}
