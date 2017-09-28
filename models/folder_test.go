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