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
}

func cleanNotesTable() {
	if (testCount == 5) {
		ldb.Unscoped().Delete(models.Note{})
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
	cleanNotesTable()
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
	cleanNotesTable()
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
	cleanNotesTable()
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
	cleanNotesTable()
}