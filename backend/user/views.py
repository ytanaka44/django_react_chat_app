
from django.core.exceptions import ValidationError
from django.core.files.storage import default_storage
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CustomUser
from .serializers import UserSerializer


class UserListView(APIView):
    """
    ユーザーリストを取得するAPIView
    """

    def get(self, request, *args, **kwargs):
        users = CustomUser.objects.exclude(id=request.user.id)  # 現在のユーザーを除外
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class UserView(APIView):
    """
    ユーザー情報を取得するAPIView
    """

    def get(self, request, *args, **kwargs):
        user = CustomUser.objects.get(id=request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        user = CustomUser.objects.get(id=request.user.id)
        old_icon_path = user.icon.path if user.icon else None

        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            try:
                serializer.save()  # アイコンを含むユーザー情報の更新
                # アイコンが更新されたら、古いアイコンを削除
                if old_icon_path and old_icon_path != user.icon.path:
                    if default_storage.exists(old_icon_path):
                        default_storage.delete(old_icon_path)

                return Response(serializer.data)
            except ValidationError as e:
                return Response(e.message_dict, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
