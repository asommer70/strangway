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

func TestUpdateNote(t *testing.T) {
	note := Note{
		Name: "09-29-2017",
		Content: "##To Do:\n* [ ] Stuff\n* [ ] More stuff\n* [ ] Other things",
	}
	ldb.Create(&note)

	note.Name = "10-09-2017"
	ldb.Save(&note)

	var nt Note
	ldb.First(&nt, note.ID)

	if (nt.Name != "10-09-2017") {
		t.Errorf("Expected nt.Name to be '10-09-2017' but it is %v", nt.Name)
	}
	ldb.Delete(&nt)
}

func TestFindAllNotes(t *testing.T) {
	note := Note{
		Name: "09-29-2017",
		Content: "##To Do:\n* [ ] Stuff\n* [ ] More stuff\n* [ ] Other things",
	}
	n := Note{
		Name: "10-01-2017",
		Content: "##To Do:\n* [ ] Many Things\n* [ ] More things\n* [ ] Other stuff",
	}
	ldb.Create(&note)
	ldb.Create(&n)

	var notes []Note
	ldb.Find(&notes)

	if len(notes) != 2 {
		t.Errorf("Expected len(notes) to be 2 but it is %v", len(notes))
	}

	ldb.Delete(&note)
	ldb.Delete(&n)
}
