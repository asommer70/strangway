package models

import (
	"github.com/jinzhu/gorm"
)

type Note struct {
	gorm.Model
	Name string
	Content string
	FolderID uint
}

