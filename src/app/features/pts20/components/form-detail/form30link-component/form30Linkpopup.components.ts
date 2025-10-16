import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

interface ProjectData {
  projectName: string;
  projectSize: string;
  immediateCustomer: string;
  ultimateCustomerGroup: string;
}

@Component({
  selector: 'app-form30-link-popup',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './form30Linkpopup.components.html'
})
export class Form30LinkPopupComponent {
  displayedColumns: string[] = ['projectName', 'projectSize', 'immediateCustomer', 'ultimateCustomerGroup'];
  filterValue: string = '';
  dataSource = new MatTableDataSource<ProjectData>([]);
  selectedRow: ProjectData | null = null;

  constructor(
    public dialogRef: MatDialogRef<Form30LinkPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize empty table data
    this.dataSource.data = [
      { projectName: 'Project 1', projectSize: 'Large', immediateCustomer: 'Customer A', ultimateCustomerGroup: 'Group 1' },
      { projectName: 'Project 2', projectSize: 'Medium', immediateCustomer: 'Customer B', ultimateCustomerGroup: 'Group 2' },
      { projectName: 'Project 3', projectSize: 'Small', immediateCustomer: 'Customer C', ultimateCustomerGroup: 'Group 3' }
    ];
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelect() {
    if (this.selectedRow) {
      this.dialogRef.close(this.selectedRow);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onRowClick(row: ProjectData) {
    this.selectedRow = row;
  }
}