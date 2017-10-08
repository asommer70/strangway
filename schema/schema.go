package schema

import (
	"github.com/graphql-go/graphql"
	"strangway/db"
	"strangway/models"
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

// RootQuery ... the GraphQL rootQuery object.
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
					db.First(&note, idQuery)
				}

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

				return notes, nil
			},
		},
	},
})

// Schema ... define schema, with our rootQuery and rootMutation.
var Schema, _ = graphql.NewSchema(graphql.SchemaConfig{
	Query:    RootQuery,
})

// ExecuteQuery ... make the actual query to GraphQL.
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
