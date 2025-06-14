import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { AccountService } from '../../services/account.service';
import { UserParams } from '../../models/UserParams';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-message',
  imports: [DatePipe, RouterLink, ButtonComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
})
export class MessageComponent implements OnInit {
  messageService: MessageService = inject(MessageService);
  private accountService = inject(AccountService);
  userParams = new UserParams(this.accountService.currentUser());
  container: string = 'Inbox';

  ngOnInit(): void {
    this.loadMessages();
  }

  get isOutbox() {
    return this.container === 'Outbox';
  }

  loadMessages() {
    this.messageService.getMessages(this.userParams, this.container);
  }

  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe({
      next: (_) => {
        this.messageService.paginatedResult.update((prev) => {
          if (prev && prev.items) {
            prev.items.splice(
              prev.items.findIndex((m) => m.id === id),
              1
            );
            return prev;
          }
          return prev;
        });
        console.log('Successfully deleted message');
        this.loadMessages();
      },
      error: (err) => console.log(err),
    });
  }
}
