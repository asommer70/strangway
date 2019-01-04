from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.template.defaultfilters import slugify
from django.urls import reverse, reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.views.generic.edit import FormView
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication

from .models import Note, Folder
from .serializers import NoteSerializer
from .forms import NewFolderForm, FolderForm


class NoteListView(LoginRequiredMixin, ListView, FormView):
    context_object_name = 'notes'
    model = Note
    paginate_by = 10
    form_class = FolderForm
    success_url = reverse_lazy('notes:list')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['folders'] = Folder.objects.all()
        return context

    def form_valid(self, form):
        if form.is_valid():
            Folder.objects.create(name=form.cleaned_data['name'], slug=slugify(form.cleaned_data['name']))
        return super().form_valid(form)

class FolderNotesView(LoginRequiredMixin, DetailView, FormView):
    model = Folder
    form_class = FolderForm
    success_url = reverse_lazy('notes:list')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        active_folder = Folder.objects.get(slug=self.request.path.split('/')[-1])

        context['folders'] = Folder.objects.all()
        context['folder_form'] = FolderForm(initial={'name': active_folder.name})
        return context

    def form_valid(self, form):
        if form.is_valid():
            print('form.cleand_data:', form.cleaned_data)
            Folder.objects.create(name=form.cleaned_data['name'], slug=slugify(form.cleaned_data['name']))
        return super().form_valid(form)

class ListCreateNote(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    authentication_classes = (TokenAuthentication,)
