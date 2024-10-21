import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor() {
    // Replace with your server's URL (e.g., http://localhost:3000)
    // this.socket = io.connect('http://localhost:3000');
    this.socket = io('http://localhost:3000', { transports: ['websocket'] });
    console.log(this.socket)
    this.sendMessage('message')
    this.socket.on('connect', () => {
      console.log('Connected to the server');
    });

  }

  // Send a message to the server
  sendMessage(message: string): void {
    // debugger;
    this.socket.emit('message', message);
  }

  // Listen for incoming messages from the server
  getMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('message', (data: string) => {
        observer.next(data);
      });
    });
  }

  // Disconnect the socket
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  // Emit custom events to the server
  emitEvent(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  // Listen for custom events from the server
  listenToEvent(eventName: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });
    });
  }
}
