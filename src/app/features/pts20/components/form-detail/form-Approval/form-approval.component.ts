import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FORM_DETAIL_STEP_IMPORTS } from '../form-detail-step-imports';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-approval',
  standalone: true,
  imports: [...FORM_DETAIL_STEP_IMPORTS],
  templateUrl: './form-approval.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormApprovalComponent {
  isSubmitting = false;

  approvalForm = new FormGroup({
    headOfEstimating: new FormControl('', [Validators.required]),
    contractManager: new FormControl('', [Validators.required]),
    director: new FormControl('', [Validators.required]),
    executiveDirector: new FormControl('', [Validators.required]),
    ceo: new FormControl('', [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<FormApprovalComponent>) {}

  onSubmit(): void {
    if (this.approvalForm.valid) {
      this.isSubmitting = true;
      // Close dialog with form value
      this.dialogRef.close(this.approvalForm.value);
      // Reset submitting state in case dialog is not closed
      this.isSubmitting = false;
    }
  }
}
