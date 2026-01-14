import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cancel-approval',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <h1 mat-dialog-title>Cancel Approval Status</h1>
    <div mat-dialog-content>
      <mat-card class="content-card">
        <mat-form-field class="field-full-width">
          <input 
            matInput 
            [formControl]="control" 
            placeholder="Approval Header Id" 
            autocomplete="off" 
          />
        </mat-form-field>
        <button 
          mat-raised-button 
          color="primary"
          (click)="updateStatus()"
          [disabled]="!control.value"
        >
          Update the status to cancel
        </button>
      </mat-card>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="close()">Close</button>
    </div>
  `,
  styles: [
    `
      h1[mat-dialog-title] {
        margin: 0 0 16px 0;
        font-size: 20px;
        font-weight: 600;
      }

      [mat-dialog-content] {
        padding: 0 24px 24px 24px;
        min-width: 400px;
      }

      .content-card {
        padding: 20px;
        height: 100%;
      }

      .field-full-width {
        width: 100%;
        margin-bottom: 20px;
      }

      button[mat-raised-button] {
        width: 100%;
      }

      [mat-dialog-actions] {
        padding-top: 16px;
        border-top: 1px solid #eee;
      }
    `,
  ],
})
export class CancelApprovalComponent {
  control = new FormControl('');

  constructor(private dialogRef: MatDialogRef<CancelApprovalComponent>) {}

  updateStatus(): void {
    const approvalHeaderId = this.control.value;
    
    if (!approvalHeaderId) {
      return;
    }

    console.log('Updating approval status to cancel for ID:', approvalHeaderId);
    
    // TODO: Replace with actual API call
    // Example:
    // this.approvalService.cancelApproval(approvalHeaderId).subscribe({
    //   next: (response) => {
    //     console.log('Status updated successfully', response);
    //     this.dialogRef.close(true);
    //   },
    //   error: (error) => {
    //     console.error('Error updating status:', error);
    //   }
    // });
    
    // For now, just close the dialog
    this.dialogRef.close(approvalHeaderId);
  }

  close(): void {
    this.dialogRef.close();
  }
}
