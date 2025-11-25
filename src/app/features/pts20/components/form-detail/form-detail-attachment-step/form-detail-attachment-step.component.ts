import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FORM_DETAIL_STEP_IMPORTS } from '../form-detail-step-imports';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormAddAttchmentComponent } from '../form-add-attchment/form-add-attchment.component';
import { MatButtonModule } from '@angular/material/button';
import { Form20AttachmentService, Form20Attachment } from '../../../../../core/services/Form20/form20Attachment.service';

@Component({
  selector: 'app-form-detail-attachment-step',
  standalone: true,
  imports: [...FORM_DETAIL_STEP_IMPORTS, MatTableModule, MatButtonModule],
  templateUrl: './form-detail-attachment-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Form20AttachmentService]
})
export class FormDetailAttachmentStepComponent implements OnInit {
  @Input() formId: number | null = null;
  displayedColumns: string[] = ['type', 'file', 'actions'];
  attachments: Form20Attachment[] = [];

  constructor(
    private dialog: MatDialog,
    private attachmentService: Form20AttachmentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.formId) {
      this.loadAttachments();
    }
  }

  loadAttachments(): void {
    if (!this.formId) return;
    
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

  onAddAttachment(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    const dialogRef = this.dialog.open(FormAddAttchmentComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.file && this.formId) {
        // Save the attachment with formId
        this.attachmentService.saveAttachment(result.file, this.formId, result.type).subscribe({
          next: () => {
            // Reload the attachment list after successful save
            this.loadAttachments();
          },
          error: (error) => {
            console.error('Error saving attachment:', error);
          }
        });
      }
    });
  }

  onDownloadAttachment(attachment: Form20Attachment): void {
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
}
