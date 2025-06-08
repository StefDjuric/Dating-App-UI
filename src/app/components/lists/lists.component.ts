import { Component, inject, OnInit } from '@angular/core';
import { LikeService } from '../../services/like.service';
import { Member } from '../../models/Member';
import { MemberCardComponent } from '../../members/member-card/member-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lists',
  imports: [MemberCardComponent, CommonModule],
  standalone: true,
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css',
})
export class ListsComponent implements OnInit {
  likeService = inject(LikeService);
  members: Member[] = [];
  predicate = 'liked';
  loading: boolean = false;

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.loading = true;
    this.likeService.getLikes(this.predicate).subscribe({
      next: (response) => {
        this.members = response;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
    });
  }

  setPredicate(predicate: string) {
    this.predicate = predicate;
    this.loadLikes();
  }

  getTitle() {
    switch (this.predicate) {
      case 'liked':
        return 'Members you like.';
      case 'likedBy':
        return 'Members who like you.';
      default:
        return 'Mutual.';
    }
  }

  getActiveClass(predicate: string) {
    return this.predicate === predicate ? 'active' : '';
  }
}
