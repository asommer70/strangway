package schema

import (
	"testing"
	"flag"
	"strangway/db"
	"strangway/models"
	"github.com/jinzhu/gorm"
	"fmt"
)

var ldb *gorm.DB
var noteID uint
var folderID uint
var testCount int

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

	folder := models.Folder{
		Name: "Ideas",
	}
	ldb.Create(&folder)
	f := models.Folder{
		Name: "Main",
	}
	ldb.Create(&f)
	folderID = folder.ID
}

func cleanTables() {
	if (testCount == 10) {
		ldb.Unscoped().Delete(models.Note{})
		ldb.Unscoped().Delete(models.Folder{})
	}
}


func TestGraphQLQueryNotes(t *testing.T) {
	result := ExecuteQuery("{notes{id, name}}", Schema)

	resMap := result.Data.(map[string]interface{})
	notes := resMap["notes"].([]interface{})

	if (len(notes) != 2) {
		t.Errorf("Expected len(notes) to be 2 but it is %v", len(notes))
	}

	testCount++
	cleanTables()
}

func TestGraphQLQueryOneNote(t *testing.T) {
	query := fmt.Sprintf(`{note(id: "%v"){id, name}}`, noteID)
	result := ExecuteQuery(query, Schema)

	resMap := result.Data.(map[string]interface{})
	note := resMap["note"].(map[string]interface{})

	if (note["name"] != "09-29-2017") {
		t.Errorf("Expected note[name] to be '09-29-2017' but it is %v", note["name"])
	}

	testCount++
	cleanTables()
}

func TestGraphQLCreateNote(t *testing.T) {
	query := fmt.Sprintf(`mutation {note: createNote(name: "%v", content: "%v"){id, name, content}}`, "10-09-2017", "Woo creating?")
	result := ExecuteQuery(query, Schema)

	resMap := result.Data.(map[string]interface{})
	note := resMap["note"].(map[string]interface{})

	if (note["name"] != "10-09-2017") {
		t.Errorf("Expected note[name] to be '10-09-2017' but it is %v", note["name"])
	}

	testCount++
	cleanTables()
}

func TestGraphQLUpdateNote(t *testing.T) {
	query := fmt.Sprintf(`mutation {note: updateNote(id: "%v", name: "%v", content: "%v"){id, name, content}}`, noteID, "Chalkers", "")
	result := ExecuteQuery(query, Schema)

	resMap := result.Data.(map[string]interface{})
	note := resMap["note"].(map[string]interface{})

	if (note["name"] != "Chalkers") {
		t.Errorf("Expected note[name] to be 'Chalkders' but it is %v", note["name"])
	}

	testCount++
	cleanTables()
}

func TestGraphQLDeleteNote(t *testing.T) {
	query := fmt.Sprintf(`mutation {note: deleteNote(id: "%v"){id}}`, noteID)
	result := ExecuteQuery(query, Schema)

	resMap := result.Data.(map[string]interface{})
	note := resMap["note"].(map[string]interface{})

	if (note["id"] == "") {
		t.Errorf("Expected note[id] to be '' but it is %v", note["id"])
	}

	testCount++
	cleanTables()
}

func TestGraphQLQueryOneFolder(t *testing.T) {
	query := fmt.Sprintf(`{folder(id: "%v"){id, name}}`, folderID)
	result := ExecuteQuery(query, Schema)

	resMap := result.Data.(map[string]interface{})
	folder := resMap["folder"].(map[string]interface{})

	if (folder["name"] != "Ideas") {
		t.Errorf("Expected folder[name] to be 'Ideas' but it is %v", folder["name"])
	}

	testCount++
	cleanTables()
}

func TestGraphQLQueryFolders(t *testing.T) {
	result := ExecuteQuery("{folders{id, name}}", Schema)

	resMap := result.Data.(map[string]interface{})
	folders := resMap["folders"].([]interface{})

	if (len(folders) != 2) {
		t.Errorf("Expected len(folders) to be 2 but it is %v", len(folders))
	}

	testCount++
	cleanTables()
}

func TestGraphQLCreateFolder(t *testing.T) {
	query := fmt.Sprintf(`mutation {folder: createFolder(name: "%v"){id, name}}`, "Stuff")
	result := ExecuteQuery(query, Schema)

	resMap := result.Data.(map[string]interface{})
	folder := resMap["folder"].(map[string]interface{})

	if (folder["name"] != "Stuff") {
		t.Errorf("Expected note[name] to be 'Stuff' but it is %v", folder["name"])
	}

	testCount++
	cleanTables()
}

func TestGraphQLUpdateFolder(t *testing.T) {
	query := fmt.Sprintf(`mutation {folder: updateFolder(id: "%v", name: "%v"){id, name}}`, folderID, "Chalkers Folder")
	result := ExecuteQuery(query, Schema)

	resMap := result.Data.(map[string]interface{})
	folder := resMap["folder"].(map[string]interface{})

	if (folder["name"] != "Chalkers Folder") {
		t.Errorf("Expected folder[name] to be 'Chalkers Folder' but it is %v", folder["name"])
	}

	testCount++
	cleanTables()
}

func TestGraphQLDeleteFolder(t *testing.T) {
	query := fmt.Sprintf(`mutation {folder: deleteFolder(id: "%v"){id}}`, folderID)
	result := ExecuteQuery(query, Schema)

	resMap := result.Data.(map[string]interface{})
	folder := resMap["folder"].(map[string]interface{})

	if (folder["id"] == "") {
		t.Errorf("Expected folder[id] to be '' but it is %v", folder["id"])
	}

	testCount++
	cleanTables()
}