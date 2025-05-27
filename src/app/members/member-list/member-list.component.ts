import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../services/members.service';
import { Member } from '../../models/Member';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent],
  standalone: true,
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  private membersService = inject(MembersService);
  members: Member[] = [];

  ngOnInit(): void {
    this.GetMembersList();
  }

  GetMembersList() {
    this.membersService.getMembers().subscribe({
      next: (response) => (this.members = response),
      error: (err) => console.log(err),
    });
  }
}
