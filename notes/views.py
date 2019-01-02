from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication

from .models import Note, Folder
from .serializers import NoteSerializer


class NoteListView(LoginRequiredMixin, ListView):
    context_object_name = 'notes'
    model = Note
    paginate_by = 10


class ListCreateNote(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    authentication_classes = (TokenAuthentication,)
