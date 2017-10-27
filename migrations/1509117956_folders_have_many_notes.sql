-- Migration created: Fri Oct 27 11:25:56 EDT 2017

alter table notes add constraint if not exists belongsToFolder foreign key (folderId) references folders (id);

-- ALTER TABLE distributors ADD CONSTRAINT distfk FOREIGN KEY (address) REFERENCES addresses (address);
