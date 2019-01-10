from django.db import models


class Note(models.Model):
    name = models.TextField(max_length=1024, blank=True, null=True, default="")
    content = models.TextField(null=True, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    folder = models.ForeignKey('Folder', models.CASCADE, null=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        if self.folder:
            return 'Name: ' + self.name + ' Folder: ' + self.folder.name
        else:
            return 'Name: ' + self.name


class Folder(models.Model):
    name = models.TextField(max_length=1024, default="New Note")
    slug = models.SlugField(max_length=1024, default="Main", unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
