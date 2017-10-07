package schema

import (
	"testing"
	"flag"
	"strangway/db"
	"strangway/models"
	"github.com/jinzhu/gorm"
	"log"
)

var ldb *gorm.DB
var noteID uint

func init() {
	ldb = db.Connect()
	if flag.Lookup("test.v") != nil {
		models.CreateTables(ldb)
	}

	note := models.Note{
		Name: "09-29-2017",
		Content: "##To Do:\n* [ ] Stuff\n* [ ] More stuff\n* [ ] Other things",
	}
	n := models.Note{
		Name: "10-01-2017",
		Content: "##To Do:\n* [ ] Many Things\n* [ ] More things\n* [ ] Other stuff",
	}
	ldb.Create(&note)
	ldb.Create(&n)

	noteID = note.ID
}

func cleanNotesTable() {
	ldb.Delete(models.Note{})
}


//func TestGraphQLQueryNotes(t *testing.T) {
//	defer cleanNotesTable()
//	// Schema
//	//qf := graphql.Fields{
//	//	"note": &graphql.Field{
//	//		Type: graphql.String,
//	//		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
//	//			return "world", nil
//	//		},
//	//	},
//	//}
//
//	//rootQuery := graphql.ObjectConfig{Name: "RootQuery", Fields: qf}
//
//	//{todo(id:"b"){id,text,done}}'
//
//	result := ExecuteQuery("{notes{id, name}}", Schema)
//	log.Println("result:", result)
//	log.Println("result.Data:", result.Data)
//	json.NewEncoder(os.Stdout).Encode(result)
//	t.Errorf("result: %v", result)
//
//
//	//// Query
//	//query := `{hello}`
//	//params := graphql.Params{Schema: schema, RequestString: query}
//
//	//r := graphql.Do(params)
//	//if len(r.Errors) > 0 {
//	//	log.Fatalf("failed to execute graphql operation, errors: %+v", r.Errors)
//	//}
//	//rJSON, _ := json.Marshal(r)
//	//
//	//fmt.Printf("%s \n", rJSON) // {“data”:{“hello”:”world”}}
//}

func TestGraphQLQueryOneNote(t *testing.T) {
	defer cleanNotesTable()
	// Schema
	//qf := graphql.Fields{
	//	"note": &graphql.Field{
	//		Type: graphql.String,
	//		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
	//			return "world", nil
	//		},
	//	},
	//}

	//rootQuery := graphql.ObjectConfig{Name: "RootQuery", Fields: qf}

	//{todo(id:"b"){id,text,done}}'

	//log.Println("string(int(noteID)) %v:", noteID)
	//query := fmt.Sprintf(`{note(id: "%v"){id, name}}`, noteID)
	query := "{notes}"
	//log.Println("query:", query)

	result := ExecuteQuery(query, Schema)
	//log.Println("result:", result)
	log.Println("result.Data:", result.Data)
	//json.NewEncoder(os.Stdout).Encode(result)

	t.Errorf("result: %v", result)


	//// Query
	//query := `{hello}`
	//params := graphql.Params{Schema: schema, RequestString: query}

	//r := graphql.Do(params)
	//if len(r.Errors) > 0 {
	//	log.Fatalf("failed to execute graphql operation, errors: %+v", r.Errors)
	//}
	//rJSON, _ := json.Marshal(r)
	//
	//fmt.Printf("%s \n", rJSON) // {“data”:{“hello”:”world”}}
}
