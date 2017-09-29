package models

import (
	"testing"
	"flag"
	"strangway/db"
)

func init() {
	ldb = db.Connect()
	if flag.Lookup("test.v") != nil {
		CreateTables(ldb)
	}
}

func TestCreateDeleteNote(t *testing.T) {
	note := Note{
		Name: "09-29-2017",
		Content: "##To Do:\n* [ ] Stuff\n* [ ] More stuff\n* [ ] Other things",
	}
	ldb.Create(&note)

	var nt Note
	ldb.First(&nt, note.ID)

	if (nt.Name != "09-29-2017") {
		t.Errorf("Expected nt.Name to be '09-29-2017' but it is %v", nt.Name)
	}
	ldb.Delete(&nt)

	var nn Note
	ldb.First(&nn, note.ID)

	if (nn.Name != "") {
		t.Errorf("Expected nn.Name to be '' but it is not...")
	}
}