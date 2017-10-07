package schema

import (
	"github.com/graphql-go/graphql"
	"strangway/db"
	"strangway/models"
	"github.com/fatih/structs"
	"fmt"
)

var noteType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Note",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.Int,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"content": &graphql.Field{
			Type: graphql.Boolean,
		},
		"createdAt": &graphql.Field{
			Type: graphql.DateTime,
		},
		"updatedAt": &graphql.Field{
			Type: graphql.DateTime,
		},
		"deletedAt": &graphql.Field{
			Type: graphql.DateTime,
		},
	},
})

//"folder": &graphql.Field{
//Type: folderType,
//Resolve: func(p graphql.ResolveParams) (interface{}, error) {
//log.Println("p:", p)
//return "world", nil
//},
//},

var folderType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Folder",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.Int,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"createdAt": &graphql.Field{
			Type: graphql.DateTime,
		},
		"updatedAt": &graphql.Field{
			Type: graphql.DateTime,
		},
		"deletedAt": &graphql.Field{
			Type: graphql.DateTime,
		},
	},
})


var RootQuery = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootQuery",
	Fields: graphql.Fields{
		"note": &graphql.Field{
			Type:        noteType,
			Description: "Get single note",
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				db := db.Connect()
				defer db.Close()

				var note models.Note

				idQuery, isOK := params.Args["id"].(string)
				if isOK {
					// Search for el with id
					db.First(&note, idQuery)
				}

				//fmt.Print("note:", note, "\n")
				//noteMap := structs.Map(note)
				//fmt.Println("noteMap:", noteMap["Name"])

				return note, nil
			},
		},

		"notes": &graphql.Field{
			Type:        graphql.NewList(noteType),
			Description: "List of notes.",
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				db := db.Connect()
				defer db.Close()

				var notes []models.Note
				db.Find(&notes);

				//db := models.GetAdamaDB()
				//organization := models.Organization{}
				//db.Where(&models.Organization{ID: p.Source.(models.User).OrganizationID}).Find(&organization)

				//rows, _ := db.Find(&notes).Rows()
				//defer rows.Close()
				//
				//for rows.Next() {
				//	var note models.Note
				//	db.ScanRows(rows, &note)
				//	fmt.Println("note:", note)
				//}

				//for _, i := range notes {
				//	fmt.Println("i:", i)
				//}
				fmt.Printf("%T\n", notes)
				fmt.Println("len(notes):", len(notes))
				notesMap := structs.Map(notes)
				fmt.Println("notesMap:", notesMap);

				return notesMap, nil
			},
		},
	},
})

// define schema, with our rootQuery and rootMutation
var Schema, _ = graphql.NewSchema(graphql.SchemaConfig{
	Query:    RootQuery,
})

//SchemaConfig := graphql.SchemaConfig{Query: graphql.NewObject(RootQuery)}
//Schema, err := graphql.NewSchema(SchemaConfig)
//if err != nil {
//	log.Fatalf("failed to create new schema, error: %v", err)
//}

func ExecuteQuery(query string, schema graphql.Schema) *graphql.Result {
	result := graphql.Do(graphql.Params{
		Schema:        schema,
		RequestString: query,
	})
	if len(result.Errors) > 0 {
		fmt.Printf("wrong result, unexpected errors: %v", result.Errors)
	}

	fmt.Println("ExecuteQuery result.Data:", result.Data)
	return result
}
