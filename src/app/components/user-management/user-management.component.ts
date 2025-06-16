import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/User';
import { ButtonComponent } from '../button/button.component';
import { EditRolesModalComponent } from '../edit-roles-modal/edit-roles-modal.component';

@Component({
  selector: 'app-user-management',
  imports: [ButtonComponent, EditRolesModalComponent],
  standalone: true,
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  adminService = inject(AdminService);
  users: User[] = [];
  isModalOpen = false;
  selectedUser: User | null = null;

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    return this.adminService.getUserRoles().subscribe({
      next: (users) => (this.users = users),
      error: (err) => console.log(err),
    });
  }

  openEditRolesModal(user: User): void {
    this.selectedUser = user;
    this.isModalOpen = true;
  }

  editUserRoles(event: { user: User; selectedRoles: string[] }) {
    const roles = event.selectedRoles.join(',');
    this.adminService.editRoles(event.user.username, roles).subscribe({
      next: (updatedRoles) => {
        // Update local state
        const updatedUser = {
          ...event.user,
          roles: updatedRoles,
        };

        this.users = this.users.map((u) =>
          u.username === event.user.username ? updatedUser : u
        );
      },
      error: (err) => console.error(err),
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedUser = null;
  }
}
