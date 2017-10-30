-- Migration created: Fri Oct 27 11:25:56 EDT 2017

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'belongstofolder') THEN
    alter table notes add constraint belongstofolder foreign key (folderId) references folders (id);
  END IF;
END;
$$;
