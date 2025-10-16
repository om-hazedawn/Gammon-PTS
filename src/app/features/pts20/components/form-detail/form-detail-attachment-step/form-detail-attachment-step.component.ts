import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FORM_DETAIL_STEP_IMPORTS } from '../form-detail-step-imports';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormAddAttchmentComponent } from '../form-add-attchment/form-add-attchment.component';
import { MatButtonModule } from '@angular/material/button';

interface Attachment {
  type: string;
  file: string;
}

@Component({
  selector: 'app-form-detail-attachment-step',
  standalone: true,
  imports: [...FORM_DETAIL_STEP_IMPORTS, MatTableModule, MatButtonModule],
  templateUrl: './form-detail-attachment-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDetailAttachmentStepComponent {
  displayedColumns: string[] = ['type', 'file'];
  attachments: Attachment[] = [
    { type: 'office', file: 'Document.pdf' }
  ];

  constructor(private dialog: MatDialog) {}

  onAddAttachment(event: Event): void {
    event.preventDefault(); // Prevent form submission
    event.stopPropagation(); // Stop event bubbling
    
    const dialogRef = this.dialog.open(FormAddAttchmentComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.attachments = [...this.attachments, {
          type: result.type,
          file: result.file.name
        }];
      }
    });
  }
}
