import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Form20MaintenanceService } from '../../../../core/services/Form20/form20Maintainance.service';
import { Form20ListService } from '../../../../core/services/Form20/form20list.service';

@Component({
  selector: 'app-set-tender-no',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <h1 mat-dialog-title>Set Tender No</h1>
    <div mat-dialog-content class="dialog-content">
      <div class="form-group">
        <div class="form-field">
          <label>Tender No Filter</label>
          <input type="text" [formControl]="tenderNoFilterFC" placeholder="Default filter is 'NEW'" autocomplete="off" class="form-input">
        </div>
        <div class="form-field">
          <label>Filter</label>
          <input type="text" (keyup)="applyFilter($event)" placeholder="Search..." autocomplete="off" class="form-input">
        </div>
      </div>

      <div class="table-container">
        <div *ngIf="isLoading" class="loading-state">
          <p>Loading data...</p>
        </div>
        <div *ngIf="!isLoading && filteredData.length === 0" class="empty-state">
          <p>No data found</p>
        </div>
        <table class="data-table" *ngIf="!isLoading && filteredData.length > 0">
          <thead>
            <tr>
              <th *ngFor="let col of displayedColumns">
                <span *ngIf="col !== 'updateButton'">{{ getColumnLabel(col) }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let element of filteredData">
              <td *ngFor="let col of displayedColumns">
                <span *ngIf="col !== 'tenderNo' && col !== 'updateButton'">{{ element[col] }}</span>
                <span *ngIf="col === 'tenderNo'" class="tender-no-input">
                  <input type="text" [(ngModel)]="element[col]" autocomplete="off" (click)="inputClick(element)">
                </span>
                <button *ngIf="col === 'updateButton' && element['tenderNo'] !== element['_oldTenderNo'] && element['tenderNo']" 
                        (click)="saveTenderNo(element)" class="save-button">
                  <mat-icon>save</mat-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="save()">Save</button>
    </div>
  `,
  styles: [
    `
      h1[mat-dialog-title] {
        margin: 0 0 16px 0;
        font-size: 20px;
        font-weight: 600;
      }

      .dialog-content {
        padding: 0 24px 24px 24px;
        max-width: 900px;
        min-width: 600px;
      }

      .form-group {
        margin-bottom: 20px;
        display: flex;
        gap: 12px;
      }

      .form-field {
        flex: 1;
      }

      .form-field label {
        display: block;
        margin-bottom: 6px;
        font-size: 13px;
        font-weight: 600;
        color: #333;
      }

      .form-input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 13px;
        font-family: Arial, sans-serif;
      }

      .form-input:focus {
        outline: none;
        border-color: #1976d2;
        box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
      }

      .table-container {
        margin-top: 16px;
        max-height: 400px;
        overflow-y: auto;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      .loading-state {
        padding: 40px 20px;
        text-align: center;
        color: #666;
      }

      .empty-state {
        padding: 40px 20px;
        text-align: center;
        color: #999;
      }

      .data-table {
        width: 100%;
        border-collapse: collapse;
      }

      .data-table thead {
        background-color: #f5f5f5;
        position: sticky;
        top: 0;
      }

      .data-table th {
        padding: 12px;
        text-align: left;
        font-weight: 600;
        border-bottom: 2px solid #ddd;
        font-size: 13px;
      }

      .data-table td {
        padding: 10px 12px;
        border-bottom: 1px solid #eee;
        font-size: 13px;
      }

      .data-table tbody tr:hover {
        background-color: #fafafa;
      }

      .tender-no-input input {
        width: 100%;
        padding: 6px;
        border: 1px solid #ccc;
        border-radius: 3px;
        font-size: 13px;
      }

      .tender-no-input input:focus {
        outline: none;
        border-color: #1976d2;
        box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
      }

      .save-button {
        background: none;
        border: none;
        color: #1976d2;
        cursor: pointer;
        padding: 4px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .save-button:hover {
        color: #1565c0;
      }

      .save-button mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      [mat-dialog-actions] {
        padding-top: 16px;
        border-top: 1px solid #eee;
      }
    `,
  ],
})
export class SetTenderNoComponent implements OnInit {
  tenderNoFilterFC = new FormControl('NEW');
  displayedColumns: string[] = ['id', 'tenderNo', 'businessUnitCode', 'title', 'location', 'client', 'updateButton'];
  dataSource: any[] = [];
  filteredData: any[] = [];
  isLoading = false;

  constructor(
    private maintenanceService: Form20MaintenanceService,
    private form20ListService: Form20ListService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.form20ListService.getForm20List().subscribe({
      next: (response: any) => {
        this.isLoading = false;
        console.log('Form20 List Response:', response);
        console.log('Response type:', typeof response);
        console.log('Is array:', Array.isArray(response));
        
        let items: any[] = [];
        
        // Handle different response formats
        if (Array.isArray(response)) {
          console.log('Response is array, length:', response.length);
          items = response;
        } else if (response && response.items && Array.isArray(response.items)) {
          console.log('Response has items property');
          items = response.items;
        } else if (response && response.data && Array.isArray(response.data)) {
          console.log('Response has data property');
          items = response.data;
        } else {
          console.log('No valid array found in response');
          items = [];
        }
        
        console.log('Parsed items count:', items.length);
        console.log('Parsed items:', items);
        
        if (items && items.length > 0) {
          this.dataSource = items.map((item: any) => ({
            ...item,
            _oldTenderNo: item.tenderNo || ''
          }));
        } else {
          this.dataSource = [];
        }
        
        this.filteredData = [...this.dataSource];
        console.log('DataSource length:', this.dataSource.length);
        console.log('FilteredData length:', this.filteredData.length);
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Error loading Form20 List:', error);
        console.error('Error details:', error.message, error.status);
        this.dataSource = [];
        this.filteredData = [];
      }
    });
  }

  getColumnLabel(col: string): string {
    const labels: { [key: string]: string } = {
      id: 'ID',
      tenderNo: 'Tender No',
      businessUnitCode: 'Business Unit',
      title: 'Title',
      location: 'Location',
      client: 'Client',
      updateButton: ''
    };
    return labels[col] || col;
  }

  applyFilter(event: any): void {
    const filterValue = event.target.value.toLowerCase();
    this.filteredData = this.dataSource.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(filterValue)
    );
  }

  inputClick(element: any): void {
    if (!element['_oldTenderNo']) {
      element['_oldTenderNo'] = element['tenderNo'];
    }
  }

  saveTenderNo(element: any): void {
    console.log('Saving tender no:', element);
    this.maintenanceService.setTenderNo(element['tenderNo']).subscribe({
      next: (response) => {
        console.log('Tender No saved:', response);
        element['_oldTenderNo'] = element['tenderNo'];
      },
      error: (error) => {
        console.error('Error saving Tender No:', error);
      },
    });
  }

  cancel(): void {
    console.log('Dialog cancelled');
  }

  save(): void {
    console.log('Dialog saved');
  }
}
