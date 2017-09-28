package models

import (
	"github.com/jinzhu/gorm"
)

type List struct {
	gorm.Model
	Name string
	Tasks int
	FolderID uint
}

