import { Component, computed, inject, input } from '@angular/core';
import { Member } from '../../models/Member';
import { RouterLink } from '@angular/router';
import { LikeService } from '../../services/like.service';
import { PresenceService } from '../../services/presence.service';

@Component({
  selector: 'app-member-card',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
})
export class MemberCardComponent {
  private likeService = inject(LikeService);
  private presenceService = inject(PresenceService);
  member = input.required<Member>();
  hasLiked = computed(() =>
    this.likeService.likeIds().includes(this.member().id)
  );
  isOnline = computed(() =>
    this.presenceService.onlineUsers().includes(this.member().username)
  );

  toggleLike() {
    this.likeService.toggleLike(this.member().id).subscribe({
      next: () => {
        if (this.hasLiked()) {
          this.likeService.likeIds.update((ids) =>
            ids.filter((id) => id !== this.member().id)
          );
        } else {
          this.likeService.likeIds.update((ids) => [...ids, this.member().id]);
        }
      },
    });
  }
}
