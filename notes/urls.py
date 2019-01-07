from django.urls import path
from . import views

app_name = 'notes'
urlpatterns = [
    path('', views.NoteListView.as_view(), name='list'),
    path('folder/<slug:slug>', views.FolderNotesView.as_view(), name='folder'),
     path('folder/<slug:slug>/delete', views.FolderDeleteView.as_view(), name='delete_folder'),
    # path('create', views.PhotoCreateView.as_view(), name='create'),
    # path('<int:pk>/edit', views.PhotoUpdateView.as_view(), name='update'),
    # path('<int:pk>/delete', views.PhotoDeleteView.as_view(), name='delete'),

    path('api', views.ListCreateNote.as_view(), name="notes"),
    # path('api/<int:pk>', views.RetrieveUpdateDestroyPhoto.as_view(), name="album"),
]
