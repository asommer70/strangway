package models

import (
	"github.com/jinzhu/gorm"
)

type Folder struct {
	gorm.Model
	Name string
	Notes []Note
}


