package main

import (
"log"
"github.com/julienschmidt/httprouter"
"dvdpila/controllers"
"dvdpila/db"
"net/http"
"html/template"
)


func main() {
	log.Println("Executing DVD Pila!...")
	db := db.Connect()
	tc := controllers.NewTodoController(db)

	router := httprouter.New()
	router.GET("/", tc.Find)
	router.ServeFiles("/assets/*filepath", http.Dir("./assets/"))

	log.Println("Listening on port 3000...")
	http.ListenAndServe("localhost:3000", router)
}
