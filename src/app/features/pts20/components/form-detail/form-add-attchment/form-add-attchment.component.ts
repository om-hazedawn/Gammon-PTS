import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-add-attchment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './form-add-attchment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAddAttchmentComponent {
  attachmentTypes = [
    { value: 'tender-presentation', label: 'Tender Presentation' },
    { value: 'meeting-minutes', label: 'Meeting Minutes' }
  ];

  attachmentForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormAddAttchmentComponent>
  ) {
    this.attachmentForm = this.fb.group({
      type: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.attachmentForm.patchValue({ file: this.selectedFile });
    }
  }

  onSubmit(): void {
    if (this.attachmentForm.valid) {
      this.dialogRef.close({
        type: this.attachmentForm.value.type,
        file: this.selectedFile
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}