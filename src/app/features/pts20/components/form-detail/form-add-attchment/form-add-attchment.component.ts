import { Component, ChangeDetectorRef, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Form20AttachmentService } from '../../../../../core/services/Form20/form20Attachment.service';

@Component({
  selector: 'app-form-add-attchment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './form-add-attchment.component.html',
  providers: [Form20AttachmentService]
})
export class FormAddAttchmentComponent {
  attachmentTypes = [
    { value: 'tender-presentation', label: 'Tender Presentation' },
    { value: 'meeting-minutes', label: 'Meeting Minutes' }
  ];

  attachmentForm: FormGroup;
  selectedFile: File | null = null;
  fileError: string | null = null;
  isUploading = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormAddAttchmentComponent>,
    private cdr: ChangeDetectorRef,
    private attachmentService: Form20AttachmentService,
    @Inject(MAT_DIALOG_DATA) public data: { formId: number }
  ) {
    this.attachmentForm = this.fb.group({
      type: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fileError = null;
    
    if (input.files?.length) {
      const file = input.files[0];
      
      // Validate PDF file type
      if (file.type !== 'application/pdf') {
        this.fileError = 'Only PDF files are allowed';
        this.selectedFile = null;
        this.attachmentForm.patchValue({ file: null });
        input.value = '';
        return;
      }
      
      this.selectedFile = file;
      this.attachmentForm.patchValue({ file: this.selectedFile });
    }
  }

  onSubmit(): void {
    if (this.attachmentForm.valid && this.selectedFile) {
      // Set uploading state
      this.isUploading = true;
      
      // Perform the upload
      this.attachmentService.saveAttachment(
        this.selectedFile,
        this.data.formId,
        this.attachmentForm.value.type
      ).subscribe({
        next: () => {
          // Close dialog on success
          this.dialogRef.close({ success: true });
        },
        error: (error) => {
          console.error('Error uploading attachment:', error);
          this.fileError = 'Failed to upload file. Please try again.';
          this.isUploading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  
  setUploading(uploading: boolean): void {
    this.isUploading = uploading;
    this.cdr.markForCheck();
  }
}