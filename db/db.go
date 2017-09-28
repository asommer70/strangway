package db

import (
"github.com/jinzhu/gorm"
_ "github.com/jinzhu/gorm/dialects/postgres"
"log"
"flag"
)

func Connect() *gorm.DB {
	var err error
	var db *gorm.DB

	// TODO:as use config file to get database information.
	if flag.Lookup("test.v") != nil {
		db, err = gorm.Open("postgres", "host=localhost user=strang dbname=strangway_test sslmode=disable password=things")
	} else {
		db, err = gorm.Open("postgres", "host=localhost user=strang dbname=strangway_dev sslmode=disable password=things")
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

