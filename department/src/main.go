package main

import (
	"department/src/config"
	"department/src/route"
	_ "net/http"

	"github.com/labstack/echo/v4"
	_ "github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()
	config.InitDotEnv()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	config.ConnectMongoDb()
	route.New(e)
	e.Logger.Fatal(e.Start(":" + config.ProcessEnv.PortApp))
}
