import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor(private router: Router) {
    // Replace with your server's URL (e.g., http://localhost:3000)
    // this.socket = io.connect('http://localhost:3000');
    this.socket = io(environment.soket_url, {
      transports: ['websocket'],
      // retries: 1000
    });
    // this.socket = io('http://localhost:3000', { transports: ['websocket'] });
    this.sendMessage('message')
    this.socket.on('connect', () => {
      console.log('Connected to the server');
    });

  }

  // Send a message to the server
  startGame(obj: any): void {
    this.socket.emit('startGameOwnerevent', obj);
  }

  // Send a message to the server
  activeGame(obj: any): void {
    this.socket.emit('activeGame', obj);
  }
  // Send a message to the server
  inActiveGame(obj: any): void {
    this.socket.emit('inactiveGame', obj);
  }
  // Send a obj to the server
  endGame(obj: any): void {
    this.socket.emit('stopGameOwnerevent', obj);
  }
  // Send a message to the server
  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }
  // Send a message to the server
  userJoinThirdGame(obj: any): void {
    this.socket.emit('userJoinThirdGame', obj);
  }
  // Send a message to the server
  thirdGameStartEvent(message: string): void {
    this.socket.emit('thirGameStart', message);
  }
  // Send a message to the server
  saveCrossWordAns(obj: any): void {
    this.socket.emit('saveAnswer', obj);
  }
  // Send a message to the server
  saveAlphabetAns(obj: any): void {
    this.socket.emit('saveAlphabetAnswer', obj);
  }
  // Send a message to the server
  saverapidFire(obj: any): void {
    this.socket.emit('saverapidFire', obj);
  }
  // Send a message to the server
  completeGame(obj: any): void {
    this.socket.emit('completeGame', obj);
  }
  // Send a message to the server
  ThirdgameOverByadmin(obj: any): void {
    this.socket.emit('ThirdgameOverByadmin', obj);
  }

  // Listen for incoming messages from the server
  timerfor2games(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('timerfor2games', (data: any) => {
        observer.next(data);
      });
    });
  }
  // Listen for incoming messages from the server
  getThirdGameOverEventBytime(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('gameOver', (data: string) => {
        observer.next(data);
      });
    });
  }
  // Listen for incoming messages from the server
  getMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('message', (data: string) => {
        observer.next(data);
      });
    });
  }
  // Listen for incoming messages from the server
  updateQuestionThirdgame(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('updateQuestion', (data: string) => {
        observer.next(data);
      });
    });
  }
  // Listen for incoming messages from the server
  updateQuestionThirdgame2(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('updateQuestion2', (data: string) => {
        observer.next(data);
      });
    });
  }
  // Listen for incoming messages from the server
  ThirdgameupdateTimer(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('updateTimer', (data: string) => {
        observer.next(data);
      });
    });
  }
  // Listen for incoming messages from the server
  gameActivated(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('gameActivated', (data: string) => {
        observer.next(data);
      });
    });
  }
  // Listen for incoming messages from the server
  gameInActivated(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('gameInActivated', (data: string) => {
        observer.next(data);
      });
    });
  }
  // Listen for incoming messages from the server
  getGameEndMessageByOwner(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('gameEndByOwer', (data: string) => {
        observer.next(data);
      });
    });
  }
  // Listen for incoming messages from the server
  closeAudio(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('closeAudio', (data: string) => {
        observer.next(data);
      });
    });
  }
  // Listen for incoming messages from the server
  getstartGameEvent(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('gameStart', (data: any) => {
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

  login(obj: any): void {
    this.socket.emit('login', obj.user_id);
  }

  // Socket.emit('login', 1); // Replace `1` with the dynamic user ID

  // Listen for custom events from the server
  listenLoginSucess(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('loginSuccess', (data: any) => {
        observer.next(data);
      });
    });
  }
  listenLogout(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('logout', (data: any) => {
        debugger;
        observer.next(data);
        localStorage.clear()
        this.router.navigate(['/login']);
      });
    });
  }

  // Handle successful login and display user data
  // socket.on('loginSuccess', (data) => {
  //   console.log(data.message);  // 'You are now logged in.'
  //   console.log('User Details:', data.userDetails);
  //   console.log('Active Users Count:', data.activeUsersCount);
  //   console.log('Deactivated Users Count:', data.deactivatedUsersCount);
  // });

  // Handle deactivation notice
  // socket.on('deactivationNotice', (message) => {
  //   console.log(message);  // 'Your account is deactivated.'
  // });

  // Handle forced logout due to new login
  // socket.on('logout', (message) => {
  //   console.log(message);  // 'You have been logged out due to a new login.'
  // });
}
