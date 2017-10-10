package main

import (
	"log"
	"github.com/julienschmidt/httprouter"
	"net/http"
	"os"
	"encoding/json"
	"strangway/schema"
	"strangway/db"
	"strangway/models"
)

func init() {
	ldb := db.Connect()
	models.CreateTables(ldb)
}

func main() {
	log.Println("Executing Strangway!...")
	//config := db.GetConfig();
	//db := db.Connect()
	//nc := controllers.NewNoteController(db)

	router := httprouter.New()
	router.GET("/", Index)
	router.GET("/:query", Query)
	//router.ServeFiles("/assets/*filepath", http.Dir("./assets/"))

	// TODO:as adjust port to use config file.
	log.Println("Listening on port: ", os.Getenv("PORT"))
	http.ListenAndServe("localhost:" + os.Getenv("PORT"), router)
}

func Index(res http.ResponseWriter, req *http.Request, params httprouter.Params) {
	res.Header().Set("Content-Type", "application/json")
	intro := struct{Message string `json:"message"`}{
		Message: "Welcome to the GraphQL version of Strangway.",
	}
	json.NewEncoder(res).Encode(intro)
}

func Query(res http.ResponseWriter, req *http.Request, params httprouter.Params) {
	res.Header().Set("Content-Type", "application/json")
	result := schema.ExecuteQuery(params.ByName("query"), schema.Schema)
	json.NewEncoder(res).Encode(result)
}
