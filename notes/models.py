from django.db import models


class Note(models.Model):
    name = models.TextField(max_length=1024, blank=True, null=True, default="")
    content = models.TextField(null=True, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    folder = models.ForeignKey('folder')

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return self.name


class Folder(models.Model):
    name = models.TextField(max_length=1024, blank=True, null=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
