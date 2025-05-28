import { CanDeactivateFn } from '@angular/router';
import { EditMemberDetailsComponent } from '../members/edit-member-details/edit-member-details.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<
  EditMemberDetailsComponent
> = (component) => {
  if (component.editForm?.dirty) {
    return confirm('Do you want to proceed? Unsaved changes will be lost.');
  }
  return true;
};
