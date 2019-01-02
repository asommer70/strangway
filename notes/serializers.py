from rest_framework import serializers
from .models import Note, Folder


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'content',
            'created_at',
            'updated_at',
            'folder',
        )
        model = Note
