import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
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
import { Form20AttachmentService, Form20Attachment } from '../../../../../core/services/Form20/form20Attachment.service';
import { MatTableModule } from '@angular/material/table';

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
    MatTableModule,
  ],
  providers: [Form20AttachmentService],
  template: `
    <div class="attachment-dialog">
      <h2 mat-dialog-title>Form Attachments</h2>
      <mat-dialog-content>
        <!-- Upload Section -->
        <div class="upload-section" [formGroup]="attachmentForm">
          <mat-form-field class="full-width">
            <mat-label>Attachment Type</mat-label>
            <mat-select formControlName="type">
              <mat-option value="tender-presentation">Tender Presentation</mat-option>
              <mat-option value="meeting-minutes">Meeting Minutes</mat-option>
            </mat-select>
          </mat-form-field>
          
          <div class="file-upload-section">
            <input
              type="file"
              #fileInput
              accept=".pdf,application/pdf"
              (change)="onFileSelected($event)"
              style="display: none"
            />
            <button mat-stroked-button (click)="fileInput.click()">
              <mat-icon>attach_file</mat-icon>
              Choose PDF File
            </button>
            @if (selectedFile) {
              <span class="selected-file">{{ selectedFile.name }}</span>
            }
            @if (fileError) {
              <span class="error-message">{{ fileError }}</span>
            }
          </div>
          
          <button
            mat-raised-button
            color="primary"
            (click)="onUpload()"
            [disabled]="!selectedFile || !attachmentForm.valid"
          >
            <mat-icon>cloud_upload</mat-icon>
            Upload
          </button>
        </div>

        <!-- Attachments List Table -->
        <div class="attachments-list">
          <h3>Uploaded Attachments</h3>
          <table mat-table [dataSource]="attachments" class="attachment-table">
            <ng-container matColumnDef="type">
              <th mat-header-cell *matHeaderCellDef>Type</th>
              <td mat-cell *matCellDef="let row">{{ row.attachmentType || 'General' }}</td>
            </ng-container>

            <ng-container matColumnDef="file">
              <th mat-header-cell *matHeaderCellDef>File Name</th>
              <td mat-cell *matCellDef="let row">{{ row.fileName }}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let row">
                <button mat-icon-button color="primary" title="Download" (click)="onDownload(row)">
                  <mat-icon>download</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            @if (attachments.length > 0) {
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            } @else {
              <tr>
                <td colspan="3" class="no-data">No attachments available</td>
              </tr>
            }
          </table>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Close</button>
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

    .upload-section {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #ddd;
    }

    .attachments-list h3 {
      margin-bottom: 15px;
      color: #1976d2;
    }

    .error-message {
      color: #f44336;
      font-size: 12px;
      margin-left: 10px;
    }
  `],
})
export class FormAttachmentComponent implements OnInit {
  attachmentForm: FormGroup;
  selectedFile: File | null = null;
  fileError: string | null = null;
  attachments: Form20Attachment[] = [];
  displayedColumns: string[] = ['type', 'file', 'actions'];
  formId: number;

  constructor(
    public dialogRef: MatDialogRef<FormAttachmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { formId: number },
    private fb: FormBuilder,
    private attachmentService: Form20AttachmentService,
    private cdr: ChangeDetectorRef
  ) {
    this.formId = data.formId;
    this.attachmentForm = this.fb.group({
      type: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAttachments();
  }

  loadAttachments(): void {
    this.attachmentService.obtainAttachmentsList(this.formId).subscribe({
      next: (attachments) => {
        this.attachments = attachments.filter(att => !att.isDeleted);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading attachments:', error);
      }
    });
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    this.fileError = null;
    
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate PDF file type
      if (file.type !== 'application/pdf') {
        this.fileError = 'Only PDF files are allowed';
        this.selectedFile = null;
        event.target.value = '';
        return;
      }
      
      this.selectedFile = file;
    }
  }

  onUpload(): void {
    if (!this.selectedFile || !this.attachmentForm.valid) return;

    this.attachmentService.saveAttachment(
      this.selectedFile,
      this.formId,
      this.attachmentForm.get('type')?.value
    ).subscribe({
      next: () => {
        // Reset form and reload attachments
        this.selectedFile = null;
        this.attachmentForm.reset();
        this.loadAttachments();
      },
      error: (error) => {
        console.error('Error uploading attachment:', error);
      }
    });
  }

  onDownload(attachment: Form20Attachment): void {
    this.attachmentService.downloadAttachment(attachment.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = attachment.fileName;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading attachment:', error);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
