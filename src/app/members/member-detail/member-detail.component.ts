import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../models/Member';
import { MembersService } from '../../services/members.service';
import { DatePipe } from '@angular/common';
import { MemberDetailsMessagesComponent } from '../member-details-messages/member-details-messages.component';
import { PresenceService } from '../../services/presence.service';
import { AccountService } from '../../services/account.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-member-detail',
  imports: [DatePipe, MemberDetailsMessagesComponent],
  standalone: true,
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  memberService = inject(MembersService);
  private messageService = inject(MessageService);
  presenceService = inject(PresenceService);
  private accountService = inject(AccountService);
  private route = inject(ActivatedRoute);
  member?: Member;
  activeTab: string = 'about';

  ngOnInit(): void {
    this.getMemberByUsername();
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  getMemberByUsername() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    return this.memberService.getMemberByUsername(username).subscribe({
      next: (response) => (this.member = response),
      error: (err) => console.log(err),
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;

    if (this.activeTab === 'messages') {
      const user = this.accountService.currentUser();

      if (!user || !this.member) return;

      this.messageService.createHubConnection(user, this.member?.username);
    } else {
      this.messageService.stopHubConnection();
    }
  }
}
