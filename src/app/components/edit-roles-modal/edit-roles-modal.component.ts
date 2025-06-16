import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/User';
import { NgFor, NgIf } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-edit-roles-modal',
  imports: [NgIf, NgFor, ButtonComponent],
  templateUrl: './edit-roles-modal.component.html',
  styleUrl: './edit-roles-modal.component.css',
})
export class EditRolesModalComponent implements OnInit {
  @Input() isOpen = false;
  @Input() selectedUser: User | null = null;
  availableRoles: string[] = ['Admin', 'Moderator', 'Member'];
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveRolesEvent = new EventEmitter<{
    user: User;
    selectedRoles: string[];
  }>();

  selectedRoles: Set<string> = new Set<string>();

  ngOnInit(): void {
    this.initializeSelectedRoles();
  }

  ngOnChanges(): void {
    if (this.selectedUser) {
      this.initializeSelectedRoles();
    }
  }

  private initializeSelectedRoles(): void {
    this.selectedRoles = new Set<string>();

    if (this.selectedUser?.roles) {
      // Ensure we're working with an array
      const rolesArray = Array.isArray(this.selectedUser.roles)
        ? this.selectedUser.roles
        : [this.selectedUser.roles];

      rolesArray.forEach((role) => this.selectedRoles.add(role));
    }
  }

  isRoleSelected(role: string): boolean {
    return this.selectedRoles.has(role);
  }

  toggleRole(role: string): void {
    if (this.selectedRoles.has(role)) {
      this.selectedRoles.delete(role);
    } else {
      this.selectedRoles.add(role);
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  saveChanges(): void {
    if (this.selectedUser) {
      this.saveRolesEvent.emit({
        user: this.selectedUser,
        selectedRoles: Array.from(this.selectedRoles),
      });
    }
    this.closeModal();
  }
}
