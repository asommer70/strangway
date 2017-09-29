package models

import (
	"testing"
	"strangway/db"
	"flag"
	"github.com/jinzhu/gorm"
)

var ldb *gorm.DB

func init() {
	ldb = db.Connect()
	if flag.Lookup("test.v") != nil {
		CreateTables(ldb)
	}
}

func TestCreateDeleteFolder(t *testing.T) {
	folder := Folder{
		Name: "Ideas",
	}
	ldb.Create(&folder)

	var f Folder
	ldb.First(&f)

	if (f.Name != "Ideas") {
		t.Errorf("Expected f.Name to be 'Ideas' but it is %v", f.Name)
	}

	ldb.Delete(&f)

	var fd Folder
	ldb.First(&fd, f.ID)

	if (fd.Name != "") {
		t.Errorf("Expected fd.Name to be '' but it is not...")
	}
}

func TestFolderHasManyNotes(t *testing.T) {
	folder := Folder{
		Name: "Ideas",
	}
	ldb.Create(&folder)

	note := Note{
		Name: "Things To Do",
		Content: "##To Do:\n* [ ] Stuff\n* [ ] More stuff\n* [ ] Other things",
		FolderID: folder.ID,
	}
	ldb.Create(&note)

	var f Folder
	ldb.First(&f)
	ldb.Model(&f).Related(&f.Notes)

	if (len(f.Notes) != 1) {
		t.Errorf("Expected len(f.Notes) to be 1 but it is %v", len(f.Notes))
	}

	ldb.Delete(&folder)
	ldb.Delete(&note)
}