import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../services/members.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent, FormsModule, ButtonComponent],
  standalone: true,
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  membersService = inject(MembersService);
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  ngOnInit(): void {
    if (!this.membersService.paginatedResult()) this.GetMembersList();
  }

  GetMembersList(orderBy?: string) {
    if (orderBy) this.membersService.userParams().orderBy = orderBy;
    this.membersService.getMembers();
  }

  resetFilters() {
    this.membersService.resetUserParams();
    this.GetMembersList();
  }

  goToPage(page: number) {
    if (
      page < 1 ||
      page >
        (this.membersService.paginatedResult()?.pagination?.totalPages || 1)
    )
      return;

    this.membersService.userParams().pageNumber = page;
    this.GetMembersList();
  }

  getPageNumbers(): number[] {
    const pagination = this.membersService.paginatedResult()?.pagination;
    if (!pagination) return [];

    const totalPages = pagination.totalPages;
    const currentPage = pagination.currentPage;
    const pages: number[] = [];

    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
}
