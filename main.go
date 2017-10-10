package main

import (
	"log"
	"github.com/julienschmidt/httprouter"
	"strangway/controllers"
	"strangway/db"
	"net/http"
	"os"
)

func main() {
	log.Println("Executing Strangway!...")
	//config := db.GetConfig();
	db := db.Connect()
	nc := controllers.NewNoteController(db)

	router := httprouter.New()
	router.GET("/", nc.Find)
	router.ServeFiles("/assets/*filepath", http.Dir("./assets/"))

	// TODO:as adjust port to use config file.
	log.Println("Listening on port: ", os.Getenv("PORT"))
	http.ListenAndServe("localhost:" + os.Getenv("PORT"), router)
}
