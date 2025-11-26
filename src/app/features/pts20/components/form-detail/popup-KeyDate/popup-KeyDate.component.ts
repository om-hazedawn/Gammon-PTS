import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
  ],
  templateUrl: './popup-KeyDate.component.html',
})
export class PopupKeyDateComponent {
  displayedColumns: string[] = ['keyDateType', 'date'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    public dialogRef: MatDialogRef<PopupKeyDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize sample key date data
    this.dataSource.data = [
      { keyDateType: 'Tender Submission', date: new Date('2025-01-15') },
      { keyDateType: 'Site Visit', date: new Date('2025-01-20') },
      { keyDateType: 'Award Date', date: new Date('2025-02-01') },
    ];
  }

  onAdd() {
    // Logic to add new key date
    console.log('Add key date');
  }

  onSave() {
    // Save and close with data
    this.dialogRef.close(this.dataSource.data);
  }

  onClose() {
    // Close without saving
    this.dialogRef.close();
  }
}
