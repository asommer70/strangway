from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView

from .models import Note, Folder


class NoteListView(LoginRequiredMixin, ListView):
    context_object_name = 'notes'
    model = Note
    paginate_by = 10
