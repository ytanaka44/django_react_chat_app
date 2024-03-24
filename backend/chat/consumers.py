import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from user.models import CustomUser

from .models import ChatRoom, Message


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope["url_route"]["kwargs"]["uuid"]
        self.room_group_name = f'chat_{self.room_id}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        sender_id = text_data_json['sender_id']

        # データベースにメッセージを保存
        res = await self.save_message_to_db(self.room_id, message, sender_id)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': res['message_data'],
                'sender_id': sender_id
            }
        )

    async def chat_message(self, event):
        message = event['message']

        # WebSocketを介してメッセージを送信
        await self.send(text_data=json.dumps({
            'message': message
        }))

    @database_sync_to_async
    def save_message_to_db(self, room_id, message_text, sender_id):
        try:
            room = ChatRoom.objects.get(id=room_id)
            sender = CustomUser.objects.get(id=sender_id)
            message = Message.objects.create(room=room, content=message_text, sender=sender)
            return {
                'status': 'success',
                'message_data': {
                    'id': message.id,
                    'content': message.content,
                    'sender': message.sender.id,
                    'icon': message.sender.icon.url if message.sender.icon else None,
                    'timestamp': message.timestamp.isoformat(),
                    'room': room_id,
                }
            }
        except ChatRoom.DoesNotExist:
            return {'status': 'error', 'message': 'ChatRoom not found.'}
        except CustomUser.DoesNotExist:
            return {'status': 'error', 'message': 'User not found.'}
