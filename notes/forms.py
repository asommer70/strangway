from django import forms
from django.urls import reverse_lazy

from .models import Folder


class NewFolderForm(forms.Form):
    name = forms.CharField()


class FolderForm(forms.ModelForm):
    name = forms.CharField()

    class Meta:
        model = Folder
        fields = ['name']
