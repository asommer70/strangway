package models

import (
	"time"
)

type Note struct {
	//gorm.Model
	ID        uint `json:"id"`
	CreatedAt time.Time	`json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	DeletedAt *time.Time `json:"deleted_at"`
	Name string `json:"name"`
	Content string `json:"content"`
	FolderID uint `json:"folderId"`
}

