class ChatWebSocket {
    private ws: WebSocket | null = null;
    private subscribers: Subscribers = {
        'messages-received': [],
        'status-changed': []
    };

    constructor(private url: string) {}

    public clearSubscribers() {
        this.subscribers['messages-received'] = [];
        this.subscribers['status-changed'] = [];
    }

    public createChannel() {
        this.cleanUp();
        this.ws?.close();
        this.ws = new WebSocket(this.url);
        this.notifySubscribersAboutStatus('pending');
        this.ws.addEventListener('open', this.openHandler);
        this.ws.addEventListener('message', this.messageHandler);
        this.ws.addEventListener('error', this.errorHandler);
        this.ws.addEventListener('close', this.closeHandler);
    }

    public subscribe(eventName: keyof Subscribers, callback: (data: any) => void) {
        this.subscribers[eventName].push(callback);
        return () => {
            this.subscribers[eventName] = this.subscribers[eventName].filter((s) => s !== callback);
        };
    }

    public unsubscribe(eventName: keyof Subscribers, callback: (data: any) => void) {
        this.subscribers[eventName] = this.subscribers[eventName].filter(
            (subscriber) => subscriber !== callback
        );
    }

    public sendMessage(message: string) {
        this.ws?.send(message);
    }

    public closeConnection() {
        this.cleanUp();
        this.ws?.close();
        this.ws = null;
    }

    private closeHandler = () => {
        this.notifySubscribersAboutStatus('pending');
        setTimeout(() => this.createChannel(), 5000);
    };

    private notifySubscribersAboutStatus(status: StatusType) {
        this.subscribers['status-changed'].forEach((subscriber) => subscriber(status));
    }

    private messageHandler = (e: MessageEvent) => {
        const newMessages = JSON.parse(e.data);
        this.subscribers['messages-received'].forEach((subscriber) => subscriber(newMessages));
    };

    private openHandler = () => {
        this.notifySubscribersAboutStatus('ready');
    };

    private errorHandler = () => {
        this.notifySubscribersAboutStatus('error');
        console.error('REFRESH PAGE');
    };

    private cleanUp() {
        if (!this.ws) return;

        this.ws.removeEventListener('open', this.openHandler);
        this.ws.removeEventListener('message', this.messageHandler);
        this.ws.removeEventListener('error', this.errorHandler);
        this.ws.removeEventListener('close', this.closeHandler);
    }
}

export const chatAPI = {
    chatWebSocket: new ChatWebSocket(
        'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
    ),

    start() {
        this.chatWebSocket.createChannel();
    },
    stop() {
        this.chatWebSocket.clearSubscribers();
        this.chatWebSocket.closeConnection();
    },
    subscribe(
        eventName: EventsNamesType,
        callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
    ) {
        return this.chatWebSocket.subscribe(eventName, callback);
    },
    unsubscribe(
        eventName: EventsNamesType,
        callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType
    ) {
        this.chatWebSocket.unsubscribe(eventName, callback);
    },
    sendMessage(message: string) {
        this.chatWebSocket.sendMessage(message);
    }
};

type Subscribers = {
    'messages-received': ((...args: any) => void)[];
    'status-changed': ((...args: any) => void)[];
};

export type ChatMessageAPIType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};

export type StatusType = 'pending' | 'ready' | 'error';
type EventsNamesType = 'messages-received' | 'status-changed';
type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;
