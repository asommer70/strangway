from django.test import TestCase
from django.utils import timezone
from .models import  Note, Folder


class NoteModelTests(TestCase):
    def setUp(self):
        self.note = Note.objects.create(
            name="Test Note",
            content="## Testing\nWoo!!",
        )

        self.folder = Folder.objects.create(
            name="Main",
        )

    def test_note_creation(self):
        now = timezone.now()
        self.assertLess(self.note.created_at, now)

    def test_note_update(self):
        self.note.name = 'Taco note...'
        self.note.save()
        note = Note.objects.get(id=self.note.id)
        self.assertEqual(note.name, 'Taco note...')

    def test_folder(self):
        self.note.folder = self.folder
        self.note.save()
        self.assertEqual(self.note.folder.name, 'Main')

    def test_note_deletion(self):
        self.note.delete()
        self.assertEqual(len(Note.objects.all()), 0)


class FolerModelTests(TestCase):
    def setUp(self):
        self.folder = Folder.objects.create(
            name="Ideas",
        )

        self.note1 = Note.objects.create(
            name="Test Note",
            content="## Testing\nWoo!!",
        )

        self.note2 = Note.objects.create(
            name="Test Note",
            content="## Testing\nWoo!!",
        )

    def test_folder_creation(self):
        now = timezone.now()
        self.assertLess(self.folder.created_at, now)

    def test_folder_update(self):
        self.folder.name = 'Idea'
        self.folder.save()
        folder = Folder.objects.get(id=self.folder.id)
        self.assertEqual(folder.name, 'Idea')

    def test_folder_deletion(self):
        self.folder.delete()
        self.assertEqual(len(Folder.objects.all()), 0)

    def test_folder_notes(self):
        self.note1.folder = self.folder
        self.note2.folder = self.folder
        self.note1.save()
        self.note2.save()

        self.assertEqual(len(self.folder.note_set.all()), 2)
