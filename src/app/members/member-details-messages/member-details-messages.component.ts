import {
  AfterViewChecked,
  Component,
  inject,
  input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MessageService } from '../../services/message.service';
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-details-messages',
  imports: [DatePipe, ButtonComponent, FormsModule],
  templateUrl: './member-details-messages.component.html',
  styleUrl: './member-details-messages.component.css',
})
export class MemberDetailsMessagesComponent
  implements OnInit, AfterViewChecked
{
  @ViewChild('messageForm') messageForm?: NgForm;
  @ViewChild('scroll') scrollContainer?: any;
  messageService = inject(MessageService);
  username = input.required<string>();
  messageContent: string = '';

  ngOnInit(): void {
    this.loadMessages();
  }

  ngAfterViewChecked(): void {
    this.scrollToBotom();
  }

  sendMessage() {
    this.messageService
      .sendMessage(this.username(), this.messageContent)
      .then(() => {
        this.messageForm?.reset();
        this.scrollToBotom();
      });
  }

  loadMessages() {
    this.messageService.getMessagesFromThread(this.username()).subscribe({
      next: (messages) => {},
    });
  }

  private scrollToBotom() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    }
  }
}
