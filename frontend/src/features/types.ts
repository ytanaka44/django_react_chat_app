export interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  icon: string;
}

export interface SignupProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ChatRoomProps {
  userId: string;
}

export interface MessageState {
  id: number;
  sender: string;
  icon: string;
  room: string;
  content: string;
  timestamp: string;
}

export interface MessageProps {
  chatRoomId: string | undefined;
  messages: MessageState[];
  setMessages: React.Dispatch<React.SetStateAction<MessageState[]>>;
}
