package controllers

import (
	"net/http"
	"github.com/julienschmidt/httprouter"
	"github.com/jinzhu/gorm"
	"fmt"
)

type NoteController struct{
	db *gorm.DB
}

func NewNoteController(db *gorm.DB) *NoteController {
	return &NoteController{db}
}

func (nc NoteController) Find(res http.ResponseWriter, req *http.Request, params httprouter.Params) {
	// Find Note by ID param.byName("id").

	// If no "id" parameter return all.

	// Or return none.
	fmt.Fprintf(res, "I've Got Worms...")
	//dc.tpl.ExecuteTemplate(res, "index.gohtml", nil)

}

func (dc NoteController) Create(res http.ResponseWriter, req *http.Request, params httprouter.Params) {

}

func (dc NoteController) Update(res http.ResponseWriter, req *http.Request, params httprouter.Params) {
	// Find user by ID p.byName("id").

	// Update the Note.
}

func (dc NoteController) Delete(res http.ResponseWriter, req *http.Request, params httprouter.Params) {
	// Find user by ID p.byName("id").

	// Delete the Note.
}