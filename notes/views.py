from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
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
from .forms import NewFolderForm, FolderForm, NewNoteForm


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


class NoteCreateView(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    model = Note
    form_class = NewNoteForm
    success_url = reverse_lazy('notes:list')
    success_message = "Note created."

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            note = form.save()
            return HttpResponseRedirect('/notes/folder/' + note.folder.slug)

        return render(request, self.template_name, {'form': form})

class FolderNotesView(LoginRequiredMixin, DetailView, FormView):
    model = Folder
    form_class = FolderForm
    success_url = reverse_lazy('notes:list')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        active_folder = Folder.objects.get(slug=self.request.path.split('/')[-1])

        context['active_folder'] = active_folder
        context['folders'] = Folder.objects.all()
        context['folder_form'] = FolderForm(initial={'name': active_folder.name})
        context['note_form'] = NewNoteForm()
        return context

    def form_valid(self, form):
        if form.is_valid():
            print('form.cleand_data:', form.cleaned_data)
            Folder.objects.create(name=form.cleaned_data['name'], slug=slugify(form.cleaned_data['name']))
        return super().form_valid(form)

    def post(self, request, *args, **kwargs):
        folder = Folder.objects.get(slug=kwargs['slug'])
        folder.name = request.POST['name']
        folder.slug = slugify(folder.name)
        folder.save()
        return HttpResponseRedirect('/notes/folder/' + folder.slug)


class FolderDeleteView(LoginRequiredMixin, SuccessMessageMixin, DeleteView):
    model = Folder
    success_url = reverse_lazy('notes:list')
    success_message = "Folder deleted."


class ListCreateNote(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    authentication_classes = (TokenAuthentication,)
