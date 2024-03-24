from rest_framework import serializers

from .models import ChatRoom, Message
from .utils import generate_unique_key


class ChatRoomSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = ChatRoom
        fields = ['id', 'user_id']
        read_only_fields = ['id']

    def create(self, validated_data):
        user_id1 = self.context['request'].user.id
        user_id2 = validated_data.pop('user_id')
        unique_key = generate_unique_key(user_id1, user_id2)

        # unique_keyをチェックして、既存のChatRoomがあるかどうかを確認
        chat_room, created = ChatRoom.objects.get_or_create(
            unique_key=unique_key,
        )

        return chat_room


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.PrimaryKeyRelatedField(read_only=True)
    icon = serializers.ImageField(source='sender.icon', use_url=True, required=False)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'icon', 'room', 'content', 'timestamp']
