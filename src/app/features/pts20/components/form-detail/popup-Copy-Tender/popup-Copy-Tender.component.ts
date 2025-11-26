import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { Form20ListService } from '../../../../../core/services/Form20/form20list.service';

@Component({
  selector: 'app-popup-copy-tender',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
  ],
  templateUrl: './popup-Copy-Tender.component.html',
  styles: [`
    .selected-row {
      background-color: #e3f2fd !important;
    }
    .cursor-pointer {
      cursor: pointer;
    }
  `]
})
export class PopupCopyTenderComponent implements OnInit {
  displayedColumns: string[] = ['tenderNo', 'businessUnit', 'title', 'clientName'];
  filterValue: string = '';
  dataSource = new MatTableDataSource<any>([]);
  selectedRow: any | null = null;
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PopupCopyTenderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private form20ListService: Form20ListService
  ) {}

  ngOnInit(): void {
    this.loadFormList();
  }

  loadFormList(): void {
    this.isLoading = true;
    this.form20ListService.getPagedForm20List({ filteringItem: {}, pageSize: -1, page: 0 }).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        const formList = response.items || [];
        this.dataSource.data = formList.map(form => ({
          id: form.id,
          tenderNo: form.tenderNo,
          businessUnit: form.businessUnitCode,
          title: form.title,
          clientName: form.client
        }));
        console.log('DataSource data:', this.dataSource.data);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading form list:', error);
        this.isLoading = false;
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelect() {
    if (this.selectedRow) {
      this.dialogRef.close(this.selectedRow);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  selectRow(row: any): void {
    this.selectedRow = row;
  }
}
