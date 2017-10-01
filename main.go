package main

import (
	"log"
	"github.com/julienschmidt/httprouter"
	"strangway/controllers"
	"strangway/db"
	"net/http"
)


func main() {
	log.Println("Executing DVD Pila!...")
	db := db.Connect()
	nc := controllers.NewNoteController(db)

	router := httprouter.New()
	router.GET("/", nc.Find)
	router.ServeFiles("/assets/*filepath", http.Dir("./assets/"))

	log.Println("Listening on port 3000...")
	http.ListenAndServe("localhost:3000", router)
}
