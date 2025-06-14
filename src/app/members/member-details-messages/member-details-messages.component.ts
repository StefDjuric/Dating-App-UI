import {
  Component,
  inject,
  input,
  OnInit,
  output,
  ViewChild,
} from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/Message';
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-details-messages',
  imports: [DatePipe, ButtonComponent, FormsModule],
  templateUrl: './member-details-messages.component.html',
  styleUrl: './member-details-messages.component.css',
})
export class MemberDetailsMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm;
  messageService = inject(MessageService);
  username = input.required<string>();
  messages: Message[] = [];
  messageContent: string = '';
  updatedMessages = output<Message>();

  ngOnInit(): void {
    this.loadMessages();
  }

  sendMessage() {
    this.messageService
      .sendMessage(this.username(), this.messageContent)
      .subscribe({
        next: (message) => {
          this.messages.push(message);
          this.messageForm?.reset();
        },
      });
  }

  loadMessages() {
    this.messageService.getMessagesFromThread(this.username()).subscribe({
      next: (messages) => {
        this.messages = messages;
      },
    });
  }
}
