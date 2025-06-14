import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../models/Member';
import { MembersService } from '../../services/members.service';
import { ButtonComponent } from '../../components/button/button.component';
import { DatePipe } from '@angular/common';
import { MemberDetailsMessagesComponent } from '../member-details-messages/member-details-messages.component';

@Component({
  selector: 'app-member-detail',
  imports: [ButtonComponent, DatePipe, MemberDetailsMessagesComponent],
  standalone: true,
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
})
export class MemberDetailComponent implements OnInit {
  memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  member?: Member;
  activeTab: string = 'about';

  ngOnInit(): void {
    this.getMemberByUsername();
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
  }
}
