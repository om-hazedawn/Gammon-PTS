import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TenderListApiService } from '../../../../core/services/tender-list-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-excom-decision-popup',
  templateUrl: './excom-decision-popup.component.html',
  styleUrls: ['./excom-decision-popup.component.scss'],
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
    MatProgressSpinnerModule
  ]
})
export class ExcomDecisionPopupComponent {
  tenderForm: FormGroup;
  excomDecisionNotesMaxLength = 1000;
  priorityLevelOptions = [
    { id: 1, title: 'For EXCOM Review' },
    { id: 2, title: 'No go' },
    { id: 3, title: 'Lean' },
    { id: 4, title: 'Target' },
    { id: 5, title: 'Top priority' },
    { id: 6, title: 'Go' },
  ];
  subject: { excomDecisionItem: string } = { excomDecisionItem: '' };
  busy = false;

  constructor(
    public dialogRef: MatDialogRef<ExcomDecisionPopupComponent>,
    private fb: FormBuilder,
    private tenderListApiService: TenderListApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Component data:', data); // Debug log
    this.subject.excomDecisionItem = data.excomDecisionItem || 'Upxxxsks';
    this.tenderForm = this.fb.group({
      excomDecisionPriorityLevelId: new FormControl(data.excomDecisionPriorityLevelId || '', []),
      excomDecisionNotes: new FormControl(data.excomDecisionNotes || '', [Validators.maxLength(this.excomDecisionNotesMaxLength)]),
    });
  }

  isBusy(): boolean {
    return this.busy;
  }

  handleSubmit(): void {
    if (!this.data || !this.data.tenderId) {
      console.error('tenderId is missing:', this.data);
      return;
    }

    if (this.tenderForm.valid) {
      this.busy = true;
      const selectedPriorityId = this.tenderForm.value.excomDecisionPriorityLevelId;
      const selectedPriority = this.priorityLevelOptions.find(option => option.id === selectedPriorityId);

      const requestData = {
        tenderId: this.data.tenderId,
        excomDecisionPriorityLevelId: this.tenderForm.value.excomDecisionPriorityLevelId,
        excomDecisionNotes: this.tenderForm.value.excomDecisionNotes
      };
      console.log('Sending data:', requestData); // Debug log
      this.tenderListApiService.putTenderExcomDecision(
        requestData.tenderId,
        requestData.excomDecisionPriorityLevelId,
        requestData.excomDecisionNotes
      ).subscribe({
        next: () => {
          this.busy = false;
          this.dialogRef.close({
            ...this.tenderForm.value,
            excomDecisionPriorityLevel: selectedPriority || null
          });
        },
        error: (error) => {
          console.error('Error saving EXCOM decision:', error);
          this.busy = false;
        }
      });
    }
  }

  get excomDecisionPriorityLevelIdControl(): FormControl {
    return this.tenderForm.get('excomDecisionPriorityLevelId') as FormControl;
  }

  get excomDecisionNotesControl(): FormControl {
    return this.tenderForm.get('excomDecisionNotes') as FormControl;
  }
}
