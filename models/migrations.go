package models

import (
	"github.com/jinzhu/gorm"
)

func CreateTables(db *gorm.DB) {
	lt := db.HasTable(&List{})
	if !lt {
		db.AutoMigrate(&List{})
	}

	ft := db.HasTable(&Folder{})
	if !ft {
		db.AutoMigrate(&Folder{})
	}
}

