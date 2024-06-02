export class User {
    id! : string;
    name! : string;
    email! : string;
}

export class Message {
    id!: number;
    senderId!: string | null;
    receiverId!: string;
    content!: string;
    timestamp!: string;
    isEditing!: boolean;
    isRead! : boolean;
}