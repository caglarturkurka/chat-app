import {AfterViewInit, Component, HostBinding, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {MessageService} from '../../services/message.service';
import {IUser, User} from '../../model/user';
import {Message} from '../../model/message';
import {Observable, Subject, Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  providers: [UserService]
})
export class ChatWindowComponent implements OnDestroy, OnInit, AfterViewInit {
  @HostBinding('class') public myClasses = 'chat-window';
  @ViewChild(ChatWindowComponent, {static: false}) messageContainer: ChatWindowComponent;
  messagesContainer;

  @Input() senderId: number;
  @Input() receiverId: number;

  messages: Message[] = [];
  currentUser: IUser;
  receiverTyping = false;
  public name: string;
  private _message = '';
  private messenger: Subject<Message> = new Subject<Message>();
  private receiverSub: Subscription;
  private receiverTypingSub: Subscription;
  private typing: Subject<boolean> = new Subject<boolean>();

  constructor(private userService: UserService,
              private authService: AuthService,
              private messageService: MessageService) {
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
    if (this.message) {
      this.typing.next(true);
    } else {
      this.typing.next(false);
    }
  }


  get receiverName(): string {
    return this.userService.getUserInfo(this.receiverId).name;
  }

  get senderName(): string {
    return this.userService.getUserInfo(this.senderId).name;
  }

  get messengerObs(): Observable<Message> {
    return this.messenger.asObservable();
  }

  get typingObs(): Observable<boolean> {
    return this.typing.asObservable();
  }

  ngOnInit() {
    this.currentUser = this.authService.getAuthenticatedUser();
    this.populateUserInfo(this.senderId);
    this.messageService.register(this.senderId, this.messengerObs);
    this.messageService.registerTypingListener(this.senderId, this.typingObs);
  }

  ngAfterViewInit() {
    // The receiver would retrieve the message history from the database here
    // every time the connection is view is loaded.

    const receiver: Observable<Message> = this.messageService.subscribe(this.receiverId);
    if (receiver) {
      this.receiverSub = receiver.subscribe((message) => {
        this.messages.push(message);
        this.scrollToBottom();
      });

    }

    const receiverTyping: Observable<boolean> = this.messageService.subscribeTyping(this.receiverId);
    if (receiverTyping) {
      this.receiverTypingSub = receiverTyping.subscribe(typing => this.receiverTyping = typing);
    }
  }

  populateUserInfo(id: number): void {
    const user: User = this.userService.getUserInfo(id);
    if (user) {
      this.name = user.name;
    } else {
      throw new Error('User not found');
    }
  }


  sendMessage(): void {
    if (this._message) {
      // Send Message

      const newMessage: Message = new Message(this._message, this.senderId, this.receiverId);

      this.messages.push(newMessage);

      this.messenger.next(
        newMessage
      );

      // Clear Message
      this.message = '';

      // The sender would save the messages array to the database
      // That way both sender and receiver have the same history
      // Each time the connection is re-established the message array is
      // retrieved from the database

      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      // Set timeout to scroll after the view has been updated with the new message
      setTimeout(() => {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }, 0);
    }
  }

  /**
   * Unsubscribe
   */
  ngOnDestroy() {
    this.receiverSub.unsubscribe();
    this.receiverTypingSub.unsubscribe();
  }

}
