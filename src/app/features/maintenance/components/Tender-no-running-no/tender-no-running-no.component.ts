import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Form20MaintenanceService } from '../../../../core/services/Form20/form20Maintainance.service';

interface RunningNoItem {
  tenderYear: number;
  lastNo: number;
  control?: FormControl<number | null>;
  _originalYear?: number;
  _originalLastNo?: number;
}

@Component({
  selector: 'app-tender-no-running-no',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
  ],
  template: `
    <h1 mat-dialog-title>Tender No Last no (Running No) Maintenance</h1>
    <div mat-dialog-content>
      <mat-card class="table-card">
        <mat-table [dataSource]="dataSource" class="mat-elevation-z5">
          <ng-container matColumnDef="tenderYear">
            <mat-header-cell *matHeaderCellDef> Tender Year </mat-header-cell>
            <mat-cell *matCellDef="let element">
              <span *ngIf="!element.control"> {{element.tenderYear}}</span>
              <mat-form-field *ngIf="element.control" class="full-width input-field">
                <input matInput autocomplete="off" type="number" [formControl]="element.control" />
              </mat-form-field>
            </mat-cell>
          </ng-container>
          <ng-container matColumnDef="lastNo">
            <mat-header-cell *matHeaderCellDef> Last No </mat-header-cell>
            <mat-cell *matCellDef="let element">
              <mat-form-field class="full-width input-field">
                <input matInput autocomplete="off" type="number" [(ngModel)]="element.lastNo" />
              </mat-form-field>
            </mat-cell>
          </ng-container>
          <ng-container matColumnDef="updateButton">
            <mat-header-cell *matHeaderCellDef> </mat-header-cell>
            <mat-cell *matCellDef="let element">
              <button 
                mat-icon-button 
                (click)="update(element)" 
                color="primary" 
                [disabled]="disableSaveButton(element)"
              >
                <mat-icon>save</mat-icon>
              </button>
            </mat-cell>
          </ng-container>
          <mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></mat-header-row>
          <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
        </mat-table>
        <button 
          mat-icon-button 
          (click)="addRunningNoYear()" 
          matTooltip="Add running for new year" 
          [disabled]="!canAdd()" 
          color="primary"
        >
          <mat-icon>add</mat-icon>
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
        min-width: 500px;
        max-width: 600px;
      }

      .table-card {
        padding: 16px;
        height: 100%;
      }

      mat-table {
        width: 100%;
        max-height: 400px;
        overflow-y: auto;
      }

      mat-header-cell {
        font-weight: 600;
        font-size: 14px;
      }

      mat-cell {
        font-size: 13px;
      }

      .full-width {
        width: 100%;
      }

      .input-field {
        padding-bottom: 0;
      }

      .input-field input {
        font-size: 13px;
      }

      button[mat-icon-button] {
        margin-top: 8px;
      }

      [mat-dialog-actions] {
        padding-top: 16px;
        border-top: 1px solid #eee;
      }
    `,
  ],
})
export class TenderNoRunningNoComponent implements OnInit {
  displayedColumns: string[] = ['tenderYear', 'lastNo', 'updateButton'];
  dataSource: RunningNoItem[] = [];

  constructor(
    private dialogRef: MatDialogRef<TenderNoRunningNoComponent>,
    private maintenanceService: Form20MaintenanceService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.maintenanceService.getTenderNoRunningNo().subscribe({
      next: (response: any) => {
        console.log('Tender No Running No Response:', response);
        
        let items: any[] = [];
        
        // Handle different response formats
        if (Array.isArray(response)) {
          items = response;
        } else if (response && response.items && Array.isArray(response.items)) {
          items = response.items;
        } else if (response && response.data && Array.isArray(response.data)) {
          items = response.data;
        } else if (response && typeof response === 'object') {
          // If response is an object, try to extract array properties
          const keys = Object.keys(response);
          for (const key of keys) {
            if (Array.isArray(response[key])) {
              items = response[key];
              break;
            }
          }
        }
        
        if (items && items.length > 0) {
          this.dataSource = items.map((item: any) => ({
            tenderYear: item.tenderYear || item.year || 0,
            lastNo: item.lastNo || item.runningNo || 0,
            _originalYear: item.tenderYear || item.year || 0,
            _originalLastNo: item.lastNo || item.runningNo || 0,
          }));
        } else {
          this.dataSource = [];
          console.log('No data found in response');
        }
      },
      error: (error: any) => {
        console.error('Error loading Tender No Running No:', error);
        this.dataSource = [];
      }
    });
  }

  update(element: RunningNoItem): void {
    console.log('Updating:', element);
    
    // TODO: Replace with actual API call
    // For now, just update the original values to match current
    element._originalYear = element.control ? element.control.value || element.tenderYear : element.tenderYear;
    element._originalLastNo = element.lastNo;
    
    if (element.control) {
      element.tenderYear = element.control.value || element.tenderYear;
      element.control = undefined;
    }
    
    console.log('Updated successfully');
  }

  disableSaveButton(element: RunningNoItem): boolean {
    const yearChanged = element.control && element.control.value !== element._originalYear;
    const lastNoChanged = element.lastNo !== element._originalLastNo;
    return !yearChanged && !lastNoChanged;
  }

  addRunningNoYear(): void {
    const currentYear = new Date().getFullYear();
    const maxYear = Math.max(...this.dataSource.map(item => item.tenderYear));
    const newYear = maxYear >= currentYear ? maxYear + 1 : currentYear;
    
    const newItem: RunningNoItem = {
      tenderYear: newYear,
      lastNo: 0,
      control: new FormControl(newYear),
      _originalYear: newYear,
      _originalLastNo: 0,
    };
    
    this.dataSource = [...this.dataSource, newItem];
  }

  canAdd(): boolean {
    // Can add if there's no row currently being edited with a control
    return !this.dataSource.some(item => item.control);
  }

  close(): void {
    this.dialogRef.close();
  }
}
