import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  excomDecisionPriorityLevelIdControl: FormControl;
  excomDecisionNotesControl: FormControl;
  excomDecisionNotesMaxLength = 500;
  priorityLevelOptions = [
    { id: 1, title: 'For EXCOM Review' },
    { id: 2, title: 'No go' },
    { id: 3, title: 'Lean' },
    { id: 4, title: 'Target' },
    { id: 5, title: 'Top priority' },
    { id: 6, title: 'Go' },
  ];
  subject = { excomDecisionItem: 'Sample decision item' };
  busy = false;

  constructor(
    public dialogRef: MatDialogRef<ExcomDecisionPopupComponent>,
    private fb: FormBuilder
  ) {
    this.excomDecisionPriorityLevelIdControl = new FormControl('', [Validators.required]);
    this.excomDecisionNotesControl = new FormControl('', [Validators.required, Validators.maxLength(this.excomDecisionNotesMaxLength)]);
    this.tenderForm = this.fb.group({
      excomDecisionPriorityLevelId: this.excomDecisionPriorityLevelIdControl,
      excomDecisionNotes: this.excomDecisionNotesControl
    });
  }

  isBusy(): boolean {
    return this.busy;
  }

  handleSubmit(): void {
    if (this.tenderForm.valid) {
      this.busy = true;
      // Simulate save
      setTimeout(() => {
        this.busy = false;
        this.dialogRef.close(this.tenderForm.value);
      }, 1000);
    }
  }
}
