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

		"folders": &graphql.Field{
			Type:        graphql.NewList(folderType),
			Description: "List of folders.",
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				db := db.Connect()
				defer db.Close()

				var folders []models.Folder
				db.Find(&folders);

				return folders, nil
			},
		},

		"folder": &graphql.Field{
			Type:        folderType,
			Description: "Get single folder",
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				db := db.Connect()
				defer db.Close()
				var folder models.Folder

				idQuery, _ := params.Args["id"].(string)
				db.First(&folder, idQuery)

				return folder, nil
			},
		},

		"folderNotes": &graphql.Field{
			Type: graphql.NewList(noteType),
			Description: "Get notes in a folder",
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				db := db.Connect()
				defer db.Close()
				var folder models.Folder

				idQuery, _ := params.Args["id"].(string)
				db.First(&folder, idQuery)
				db.Model(&folder).Related(&folder.Notes)

				return folder.Notes, nil
			},
		},

	},
})

var rootMutation = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootMutation",
	Fields: graphql.Fields{
		"createNote": &graphql.Field{
			Type: noteType,
			Args: graphql.FieldConfigArgument{
				"name": &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
				"content": &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				db := db.Connect()
				defer db.Close()

				note := models.Note{
					Name: params.Args["name"].(string),
					Content: params.Args["content"].(string),
				}
				db.Create(&note)

				return note, nil
			},
		},
		"updateNote": &graphql.Field{
			Type: noteType,
			Args: graphql.FieldConfigArgument{
				"id":  &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
				"name": &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
				"content": &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				db := db.Connect()
				defer db.Close()

				var note models.Note
				db.First(&note, params.Args["id"].(string))

				name := params.Args["name"].(string)
				if (name != "") {
					note.Name = name
				}
				content := params.Args["content"].(string)
				if (content != "") {
					note.Content = content
				}

				db.Save(&note)

				return note, nil
			},
		},
		"deleteNote": &graphql.Field{
			Type: noteType,
			Args: graphql.FieldConfigArgument{
				"id":  &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				db := db.Connect()
				defer db.Close()

				var note models.Note
				db.First(&note, params.Args["id"].(string))

				db.Delete(&note)

				return  note, nil
			},
		},
		"createFolder": &graphql.Field{
			Type: folderType,
			Args: graphql.FieldConfigArgument{
				"name": &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				db := db.Connect()
				defer db.Close()

				folder := models.Folder{
					Name: params.Args["name"].(string),
				}
				db.Create(&folder)

				return folder, nil
			},

		},
		"updateFolder": &graphql.Field{
			Type: folderType,
			Args: graphql.FieldConfigArgument{
				"id":  &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
				"name": &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				db := db.Connect()
				defer db.Close()

				var folder models.Folder
				db.First(&folder, params.Args["id"].(string))

				name := params.Args["name"].(string)
				if (name != "") {
					folder.Name = name
				}

				db.Save(&folder)

				return folder, nil
			},
		},
		"deleteFolder": &graphql.Field{
			Type: folderType,
			Args: graphql.FieldConfigArgument{
				"id":  &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				db := db.Connect()
				defer db.Close()

				var folder models.Folder
				db.First(&folder, params.Args["id"].(string))

				db.Delete(&folder)

				return  folder, nil
			},
		},
	},
})

// Schema ... define schema, with our rootQuery and rootMutation.
var Schema, _ = graphql.NewSchema(graphql.SchemaConfig{
	Query:    RootQuery,
	Mutation: rootMutation,
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

	return result
}
