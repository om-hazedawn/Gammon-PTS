import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-attachment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
  ],
  template: `
    <div class="attachment-dialog">
      <h2 mat-dialog-title>Form Attachments</h2>
      <mat-dialog-content>
        <!-- Table to display Type and File -->
        <table class="attachment-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>File</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngIf="selectedFile">
              <td>{{ attachmentForm.get('type')?.value || '-' }}</td>
              <td>{{ selectedFile.name }}</td>
            </tr>
            <tr *ngIf="!selectedFile">
              <td colspan="2" class="no-data">No file selected</td>
            </tr>
          </tbody>
        </table>

      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button
          mat-raised-button
          color="primary"
          (click)="onUpload()"
          [disabled]="!selectedFile || !attachmentForm.valid"
        >
          Upload
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .attachment-dialog {
      padding: 20px;
      min-width: 400px;
    }

    .no-data {
      text-align: center;
      color: #666;
      padding: 16px !important;
    }

    .attachment-table {
      width: 100%;
      margin-bottom: 20px;
      border-collapse: collapse;
    }

    .attachment-table th,
    .attachment-table td {
      padding: 8px;
      text-align: left;
      border: 1px solid #ddd;
    }

    .attachment-table th {
      background-color: #f5f5f5;
    }

    .attachment-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .file-upload-section {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .selected-file {
      color: #666;
      font-size: 14px;
    }

    .full-width {
      width: 100%;
    }
  `],
})
export class FormAttachmentComponent {
  attachmentForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<FormAttachmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.attachmentForm = this.fb.group({
      type: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    }
  }

  onUpload(): void {
    if (!this.selectedFile || !this.attachmentForm.valid) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('type', this.attachmentForm.get('type')?.value);

    // Here you would make your API call to upload the file
    this.dialogRef.close({
      file: this.selectedFile,
      type: this.attachmentForm.get('type')?.value
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
