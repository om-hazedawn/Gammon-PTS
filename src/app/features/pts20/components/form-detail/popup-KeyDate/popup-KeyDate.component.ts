import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form20ListDropdownService } from '../../../../../core/services/Form20/form20listdropdown.service';

@Component({
  selector: 'app-popup-keydate',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './popup-KeyDate.component.html',
})
export class PopupKeyDateComponent implements OnInit {
  displayedColumns: string[] = ['keyDateType', 'date'];
  dataSource = new MatTableDataSource<any>([]);
  isAddingNew = false;
  newKeyDateForm: FormGroup;
  keyDateTypes = [
    { value: 'OTC' },
    { value: 'CTC' },
    { value: 'GTC' },
  ];
  formId: number = 0;

  constructor(
    public dialogRef: MatDialogRef<PopupKeyDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private form20ListDropdownService: Form20ListDropdownService
  ) {
    // Get formId from dialog data
    this.formId = data?.formId || 0;

    // Initialize form for adding new key date
    this.newKeyDateForm = this.fb.group({
      keyDateType: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Load key dates if formId is provided
    console.log('PopupKeyDateComponent - formId:', this.formId);
    if (this.formId > 0) {
      this.loadKeyDates();
    } else {
      console.warn('PopupKeyDateComponent - formId is not valid:', this.formId);
    }
  }

  private loadKeyDates(): void {
    console.log('Loading key dates for formId:', this.formId);
    this.form20ListDropdownService.obtainKeyDates(this.formId).subscribe({
      next: (data: any[]) => {
        console.log('Key dates loaded successfully:', data);
        // Transform data to match table format
        const keyDates = data.map((item: any) => ({
          id: item.id,
          formId: item.formId,
          keyDateType: item.type,
          date: new Date(item.date),
        }));
        this.dataSource.data = keyDates;
      },
      error: (error: unknown) => {
        console.error('Error loading key dates:', error);
      },
    });
  }

  onAdd() {
    // Show form to add new key date
    this.isAddingNew = true;
    this.newKeyDateForm.reset();
  }

  onCancelAdd() {
    this.isAddingNew = false;
    this.newKeyDateForm.reset();
  }

  onAddNewKeyDate() {
    if (this.newKeyDateForm.valid) {
      const newKeyDate = {
        id: 0,
        formId: this.formId,
        keyDateType: this.newKeyDateForm.value.keyDateType,
        date: this.newKeyDateForm.value.date,
      };
      
      // Add to table
      const currentData = this.dataSource.data;
      this.dataSource.data = [...currentData, newKeyDate];
      
      // Reset form and hide
      this.newKeyDateForm.reset();
      this.isAddingNew = false;
    }
  }

  onDeleteRow(index: number) {
    const currentData = this.dataSource.data;
    currentData.splice(index, 1);
    this.dataSource.data = [...currentData];
  }

  onSave() {
    // Log current data before saving
    console.log('Current dataSource.data before save:', this.dataSource.data);
    console.log('Number of key dates:', this.dataSource.data.length);

    // Transform data to API format
    const keyDatesToSave = this.dataSource.data.map((item: any) => ({
      id: item.id || 0,
      formId: this.formId,
      type: item.keyDateType,
      date: item.date instanceof Date ? item.date.toISOString() : item.date,
    }));

    console.log('Payload being sent to API:', keyDatesToSave);

    // Call API to save
    this.form20ListDropdownService.updateKeyDates(keyDatesToSave).subscribe({
      next: (response: any) => {
        console.log('Key dates saved successfully:', response);
        this.dialogRef.close(this.dataSource.data);
      },
      error: (error: unknown) => {
        console.error('Error saving key dates:', error);
      },
    });
  }

  onClose() {
    // Close without saving
    this.dialogRef.close();
  }
}
