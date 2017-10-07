package models

import "time"

type Folder struct {
	ID        uint `json:"id"`
	CreatedAt time.Time	`json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	DeletedAt *time.Time `json:"deleted_at"`
	Name string `json:"name"`
	Notes []Note `json:"notes"`
}


