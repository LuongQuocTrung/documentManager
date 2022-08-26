package config

type (
	Database struct {
		Url  string
		Name string
	}

	Env struct {
		PortApp string
		Database
	}
)
