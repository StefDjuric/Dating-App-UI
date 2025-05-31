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
import { ButtonComponent } from '../../components/button/button.component';
import { CommonModule, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-member-details',
  imports: [FormsModule, ButtonComponent, CommonModule, FileUploadModule],
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
  uploader?: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.baseUrl;

  ngOnInit(): void {
    this.getMemberByUsername();
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/upload-photo',
      authToken: 'Bearer ' + this.accountService.currentUser()?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      const photo = JSON.parse(response);
      this.member?.photos.push(photo);
    };
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

  setMainPhoto(photoId: number) {
    this.memberService.setMainPhoto(photoId).subscribe({
      next: (_) => {
        this.toastr.success('Successfully set main photo. ');
      },
      error: (err) => this.toastr.error(err),
    });
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe({
      next: (_) => {
        const updatedMember = { ...this.member };
        updatedMember.photos = updatedMember.photos?.filter(
          (p) => p.id !== photoId
        );

        this.toastr.success('Successfully deleted photo.');
      },
      error: (err) => this.toastr.error(err),
    });
  }
}
