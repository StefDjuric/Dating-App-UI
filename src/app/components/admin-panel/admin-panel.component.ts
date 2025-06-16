import { Component } from '@angular/core';
import { UserManagementComponent } from '../user-management/user-management.component';
import { PhotoManagementComponent } from '../photo-management/photo-management.component';
import { HasRoleDirective } from '../../directives/has-role.directive';

@Component({
  selector: 'app-admin-panel',
  imports: [
    UserManagementComponent,
    PhotoManagementComponent,
    HasRoleDirective,
  ],
  templateUrl: './admin-panel.component.html',
  standalone: true,
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {
  activeTab: string = 'photoManagement';

  setActiveTab(activeTab: string) {
    this.activeTab = activeTab;
  }
}
