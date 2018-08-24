package config

import (
	"io/ioutil"
	"log"

	"gopkg.in/yaml.v2"
)

type config struct {
	// listen on
	Port string `yaml:"port"`
	//static folder path
	StaticPath string `yaml:"staticPath"`
	// UploadPath upload folder path
	UploadPath string `yaml:"uploadPath"`
	// TLS
	TLS *tls `yaml:"tls"`
}

type tls struct {
	// tls certification file
	Cert string `yaml:"cert"`
	// tls key file
	Key string `yaml:"key"`
}

var (
	// Cfg config info
	Cfg *config
)

func init() {
	Cfg = &config{}
	parse()
}

//
// parse config.yaml
//
func parse() {
	ym, err := ioutil.ReadFile("config.yaml")
	if err != nil {
		log.Fatal(err)
	}

	// Unmarshal file
	err = yaml.Unmarshal(ym, Cfg)
	if err != nil {
		log.Fatal(err)
	}
}
