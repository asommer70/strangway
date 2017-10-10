package db

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"log"
	"flag"
	"os"
)

type DbConfig struct {
	Database string
	Host     string
	Username string
	Password string
}

type Configuration struct {
	Port string
	Test DbConfig
	Dev DbConfig
	Pro DbConfig
}

func Connect() *gorm.DB {
	var err error
	var db *gorm.DB

	// TODO:as use config file to get database information.
	if flag.Lookup("test.v") != nil {
		db, err = gorm.Open("postgres", os.Getenv("TESTCONSTR"))
	} else {
		db, err = gorm.Open("postgres", os.Getenv("DEVCONSTR"))
	}
	Check(err, "gorm.Open")

	return db
}


// Check ... wrapper for printing errors where needed.
func Check(err error, label string) {
	if err != nil {
		log.Println(label + " err:", err)
	}
}

