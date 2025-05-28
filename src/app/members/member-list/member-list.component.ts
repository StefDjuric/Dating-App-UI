import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../services/members.service';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent],
  standalone: true,
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  membersService = inject(MembersService);

  ngOnInit(): void {
    if (this.membersService.members().length === 0) this.GetMembersList();
  }

  GetMembersList() {
    this.membersService.getMembers();
  }
}
