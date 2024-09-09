
const subscribers:Subscribers = {
    'messages-received': [],
    'status-changed': [],
};

let ws:WebSocket | null = null;

const closeHandler = () => {
    notifySubscribersAboutStatus('pending');
    setTimeout(createChannel, 5000);
}
const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers['messages-received'].forEach(s => s(newMessages));
}
const openHandler = () => {
    notifySubscribersAboutStatus('ready');
}
const errorHandler = () => {
    notifySubscribersAboutStatus('error');
    console.error('REFRESH PAGE');
}
const cleanUp = () => {
    if(!ws) return;

    ws.removeEventListener('open', openHandler);
    ws.removeEventListener('message', messageHandler);
    ws.removeEventListener('error', errorHandler);
    ws.removeEventListener('close', closeHandler);
}
const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status));
}

function createChannel() {
    cleanUp();
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscribersAboutStatus('pending');
    ws.addEventListener('open', openHandler);
    ws.addEventListener('message', messageHandler);
    ws.addEventListener('error', errorHandler);
    ws.addEventListener('close', closeHandler);
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        subscribers[eventName].push(callback)
        return () => {
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
    },
    sendMessage(message: string) {
        ws?.send(message);
    }
}



type Subscribers = {
    'messages-received': ((...args:any) => void)[]
    'status-changed': ((...args:any) => void)[],
}

export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}
export type StatusType = 'pending' | 'ready' | 'error';
type EventsNamesType = 'messages-received' | 'status-changed';
type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;