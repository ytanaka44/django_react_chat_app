from django.urls import path

from .views import *

urlpatterns = [
    path('users/', UserListView.as_view(), name='user_list'),
    path('user/', UserView.as_view(), name='user_info'),
]
