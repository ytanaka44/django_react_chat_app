from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ChatRoom, Message
from .serializers import ChatRoomSerializer, MessageSerializer


class ChatRoomView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ChatRoomSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            chat_room = serializer.save()
            return Response({
                'chat_room_id': chat_room.id,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MessagesView(APIView):
    def get(self, request, *args, **kwargs):
        room_id = request.query_params.get('room_id')
        if not room_id:
            return Response({'error': 'Room ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            room = ChatRoom.objects.get(id=room_id)
        except ChatRoom.DoesNotExist:
            return Response({'error': 'ChatRoom not found.'}, status=status.HTTP_404_NOT_FOUND)

        messages = Message.objects.filter(room=room).order_by('timestamp')
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    # def post(self, request, *args, **kwargs):
    #     room_id = request.data.get('room')
    #     if not room_id:
    #         return Response({'error': 'Room ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

    #     # ChatRoomが存在するかチェック
    #     try:
    #         room = ChatRoom.objects.get(id=room_id)
    #     except ChatRoom.DoesNotExist:
    #         return Response({'error': 'ChatRoom not found.'}, status=status.HTTP_404_NOT_FOUND)

    #     # MessageSerializerを使用してメッセージデータを検証し、保存
    #     serializer = MessageSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save(room=room, sender=request.user)  # senderを現在のユーザーとして設定
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChatHistoryView(APIView):

    def get(self, request, room_id, *args, **kwargs):
        if not room_id:
            return Response({'error': 'Room ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            room = ChatRoom.objects.get(id=room_id)
        except ChatRoom.DoesNotExist:
            return Response({'error': 'ChatRoom not found.'}, status=status.HTTP_404_NOT_FOUND)

        page = request.query_params.get('page', 1)
        print(page)
        page_size = 10

        all_messages = Message.objects.filter(room=room).order_by('-timestamp')
        paginator = Paginator(all_messages, page_size)

        try:
            messages = paginator.page(page)
        except PageNotAnInteger:
            messages = paginator.page(1)
        except EmptyPage:
            messages = paginator.page(paginator.num_pages)

        serializer = MessageSerializer(messages, many=True)
        response_data = {
            "messages": serializer.data,
            "totalPages": paginator.num_pages,
            "currentPage": page,
        }
        print(response_data)

        return Response(response_data, status=status.HTTP_200_OK)
