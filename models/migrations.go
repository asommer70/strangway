package models

import (
	"github.com/jinzhu/gorm"
	"log"
)

func CreateTables(db *gorm.DB) {
	nt := db.HasTable(&Note{})
	if !nt {
		log.Println("CreateTables notes...")
		db.AutoMigrate(&Note{})
	}

	ft := db.HasTable(&Folder{})
	if !ft {
		log.Println("CreateTables folders...")
		db.AutoMigrate(&Folder{})
	}
}

