import {
  RTCPeerConnection
} from 'react-native-webrtc';

const HOST_NAME = '127.0.0.1:8080'

enum ParticipantState {
  Disconnected = 'disconnected',
  Connected = 'connected',
  Reconnecting = 'reconnecting',
}

interface Participant {
  uuid: string;
  peer: RTCPeerConnection;
  state: ParticipantState
}

export default class Socket {
  private _apiKey: string;
  private _roomId: string;
  private _socket: any;

  participants: Map<string, Participant>;

  constructor(apiKey: string, roomId: string) {
    this._apiKey = apiKey;
    this._roomId = roomId;
    this.participants = new Map();
  }

  private _getURL(apiKey: string, roomId: string): string {
    return `ws://${HOST_NAME}/signal?apiKey=${apiKey}&roomId=${roomId}`
  }

  public connect(): void {
    this._socket = new WebSocket(this._getURL(this._apiKey, this._roomId));
    this._socket.onopen = () => {
      console.log('connected');
    };
    this._socket.onmessage = (e: any) => {
      const data = JSON.parse(e.data);
      console.log(data);
      switch (data.op) {
        case 'member_is_add':
          this._createOffer(data.Data.uuid)
          break;
        case 'room_members':
          break;
      }
    };
    this._socket.onclose = () => {
      console.log('disconnected');
    };
  }

  private async _createOffer(userUUID: string) {
    if(this.participants.has(userUUID)) {
      console.log("you save uuid key")
    }

    console.log("1")
    const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
    const peerConnection = new RTCPeerConnection(configuration);
    console.log("2")

    this.participants.set(userUUID, {
      peer: peerConnection,
      uuid: userUUID,
      state: ParticipantState.Connected
    });

    console.log("???")
    peerConnection.createOffer().then((offer: any) => {
      console.log(JSON.stringify({
        op: 'offer',
        Data: {
          offer: offer.sdp
        },
        sendTo: userUUID
      }))
      this._socket.send(JSON.stringify({
        op: 'offer',
        Data: {
          offer: offer.sdp
        },
        sendTo: userUUID
      }));
    }).catch((error: any) => {
    });
  }
}