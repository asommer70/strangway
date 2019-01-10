from django import forms
from django.urls import reverse_lazy

from .models import Folder, Note


class NewFolderForm(forms.Form):
    name = forms.CharField()


class FolderForm(forms.ModelForm):
    name = forms.CharField()

    class Meta:
        model = Folder
        fields = ['name']


class NewNoteForm(forms.ModelForm):
    name = forms.CharField(widget=forms.TextInput)
    content = forms.CharField(widget=forms.Textarea)

    class Meta:
        model = Note
        fields = ['name', 'content', 'folder']
