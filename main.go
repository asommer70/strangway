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

	router := httprouter.New()
	router.GET("/", Index)
	router.GET("/graphql/:query", Query)

	log.Println("Listening on port: ", os.Getenv("SSLPORT"))
	http.ListenAndServeTLS("localhost:" + os.Getenv("SSLPORT"), "./ssl/cert3.pem", "./ssl/privkey3.pem", router)
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
