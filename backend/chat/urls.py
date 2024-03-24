from django.urls import path

from .views import ChatHistoryView, ChatRoomView

urlpatterns = [
    path('chatroom/', ChatRoomView.as_view(), name='chatroom'),
    path('chat/history/<uuid:room_id>/', ChatHistoryView.as_view(), name='chat_history'),
]
