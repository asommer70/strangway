package controllers

import (
	"net/http"
	"github.com/julienschmidt/httprouter"
	"github.com/jinzhu/gorm"
	"fmt"
)

type TodoController struct{
	db *gorm.DB
}

func NewDvdController(db *gorm.DB) *TodoController {
	return &TodoController{db}
}

func (dc TodoController) Find(res http.ResponseWriter, req *http.Request, params httprouter.Params) {
	// Find Dvd by ID param.byName("id").

	// If no "id" parameter return all.

	// Or return none.
	fmt.Fprintf(res, "I've Got Worms...")
	//dc.tpl.ExecuteTemplate(res, "index.gohtml", nil)

}

func (dc TodoController) Create(res http.ResponseWriter, req *http.Request, params httprouter.Params) {

}

func (dc TodoController) Update(res http.ResponseWriter, req *http.Request, params httprouter.Params) {
	// Find user by ID p.byName("id").

	// Update the Dvd.
}

func (dc TodoController) Delete(res http.ResponseWriter, req *http.Request, params httprouter.Params) {
	// Find user by ID p.byName("id").

	// Delete the Dvd.
}