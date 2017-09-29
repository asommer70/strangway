package models

import (
	"github.com/jinzhu/gorm"
)

func CreateTables(db *gorm.DB) {
	nt := db.HasTable(&Note{})
	if !nt {
		db.AutoMigrate(&Note{})
	}

	ft := db.HasTable(&Folder{})
	if !ft {
		db.AutoMigrate(&Folder{})
	}
}

