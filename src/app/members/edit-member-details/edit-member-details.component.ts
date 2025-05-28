import {
  Component,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AccountService } from '../../services/account.service';
import { MembersService } from '../../services/members.service';
import { Member } from '../../models/Member';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-member-details',
  imports: [FormsModule],
  templateUrl: './edit-member-details.component.html',
  styleUrl: './edit-member-details.component.css',
})
export class EditMemberDetailsComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['event']) notify($event: any) {
    if (this.editForm?.dirty) $event.returnValue = true;
  }

  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toastr = inject(ToastrService);
  member?: Member;
  activeTab = 'edit-info';

  ngOnInit(): void {
    this.getMemberByUsername();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getMemberByUsername() {
    const user = this.accountService.currentUser();
    if (!user) return;
    this.memberService.getMemberByUsername(user.username).subscribe({
      next: (response) => (this.member = response),
      error: (err) => console.log(err),
    });
  }

  updateProfile() {
    this.memberService.updateUserDetails(this?.editForm?.value).subscribe({
      next: (_) => {
        this.toastr.success('User updated successfully.');
        this.editForm?.reset(this.member);
      },
    });
  }
}
