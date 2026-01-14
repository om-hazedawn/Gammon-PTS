import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface TenderValueItem {
  tenderNo: string;
  approximateValue: number | null;
  approximateValueRemark: string;
  currency: string;
  _originalValue?: number | null;
  _originalRemark?: string;
  _originalCurrency?: string;
}

@Component({
  selector: 'app-tender-value-remark',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <div class="title-container">
      <h1 mat-dialog-title>Tender approximate value</h1>
      <button mat-icon-button color="primary" (click)="saveAll()">
        <mat-icon>save</mat-icon>
      </button>
    </div>
    <div mat-dialog-content>
      <mat-card class="content-card">
        <mat-table [dataSource]="datasource" class="mat-elevation-z8">
          <ng-container matColumnDef="tenderno">
            <mat-header-cell *matHeaderCellDef> Tender No </mat-header-cell>
            <mat-cell *matCellDef="let element">
              <button mat-icon-button color="primary" (click)="save(element)">
                <mat-icon>save</mat-icon>
              </button> 
              {{element.tenderNo}}
            </mat-cell>
          </ng-container>
          <ng-container matColumnDef="approximateValue">
            <mat-header-cell *matHeaderCellDef> Tender Value </mat-header-cell>
            <mat-cell *matCellDef="let element">
              <mat-form-field> 
                <input matInput [(ngModel)]="element.approximateValue" type="number" autocomplete="off">
              </mat-form-field>
            </mat-cell>
          </ng-container>
          <ng-container matColumnDef="approximateValueRemark">
            <mat-header-cell *matHeaderCellDef> Tender Value Remark </mat-header-cell>
            <mat-cell *matCellDef="let element">
              <mat-form-field> 
                <input matInput [(ngModel)]="element.approximateValueRemark" autocomplete="off">
              </mat-form-field>
            </mat-cell>
          </ng-container>
          <ng-container matColumnDef="currency">
            <mat-header-cell *matHeaderCellDef> Currency </mat-header-cell>
            <mat-cell *matCellDef="let element">
              <mat-form-field> 
                <input matInput [(ngModel)]="element.currency" autocomplete="off">
              </mat-form-field>
            </mat-cell>
          </ng-container>
          <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
          <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
        </mat-table>
      </mat-card>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="close()">Close</button>
    </div>
  `,
  styles: [
    `
      .title-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 8px;
      }

      h1[mat-dialog-title] {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        flex: 1;
      }

      [mat-dialog-content] {
        padding: 0 24px 24px 24px;
        min-width: 800px;
      }

      .content-card {
        padding: 16px;
        height: 100%;
      }

      mat-table {
        width: 100%;
        max-height: 500px;
        overflow-y: auto;
      }

      mat-header-cell {
        font-weight: 600;
        font-size: 14px;
      }

      mat-cell {
        font-size: 13px;
      }

      mat-form-field {
        width: 100%;
      }

      mat-form-field input {
        font-size: 13px;
      }

      [mat-dialog-actions] {
        padding-top: 16px;
        border-top: 1px solid #eee;
      }
    `,
  ],
})
export class TenderValueRemarkComponent implements OnInit {
  displayedColumns: string[] = ['tenderno', 'approximateValue', 'approximateValueRemark', 'currency'];
  datasource: TenderValueItem[] = [];

  constructor(private dialogRef: MatDialogRef<TenderValueRemarkComponent>) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // TODO: Replace with actual API call
    // Sample data for demonstration
    this.datasource = [
      {
        tenderNo: 'TND-2024-001',
        approximateValue: 1000000,
        approximateValueRemark: 'Initial estimate',
        currency: 'HKD',
        _originalValue: 1000000,
        _originalRemark: 'Initial estimate',
        _originalCurrency: 'HKD',
      },
      {
        tenderNo: 'TND-2024-002',
        approximateValue: 2500000,
        approximateValueRemark: 'Based on market analysis',
        currency: 'HKD',
        _originalValue: 2500000,
        _originalRemark: 'Based on market analysis',
        _originalCurrency: 'HKD',
      },
      {
        tenderNo: 'TND-2024-003',
        approximateValue: null,
        approximateValueRemark: '',
        currency: 'HKD',
        _originalValue: null,
        _originalRemark: '',
        _originalCurrency: 'HKD',
      },
    ];
  }

  save(element: TenderValueItem): void {
    console.log('Saving tender value for:', element.tenderNo);
    
    // TODO: Replace with actual API call
    // Example:
    // this.tenderService.updateTenderValue(element).subscribe({
    //   next: (response) => {
    //     console.log('Saved successfully', response);
    //     element._originalValue = element.approximateValue;
    //     element._originalRemark = element.approximateValueRemark;
    //     element._originalCurrency = element.currency;
    //   },
    //   error: (error) => {
    //     console.error('Error saving:', error);
    //   }
    // });
    
    // For now, just update the original values
    element._originalValue = element.approximateValue;
    element._originalRemark = element.approximateValueRemark;
    element._originalCurrency = element.currency;
  }

  saveAll(): void {
    console.log('Saving all tender values');
    
    // TODO: Replace with actual API call
    // Example:
    // this.tenderService.updateAllTenderValues(this.datasource).subscribe({
    //   next: (response) => {
    //     console.log('All saved successfully', response);
    //     this.datasource.forEach(element => {
    //       element._originalValue = element.approximateValue;
    //       element._originalRemark = element.approximateValueRemark;
    //       element._originalCurrency = element.currency;
    //     });
    //   },
    //   error: (error) => {
    //     console.error('Error saving all:', error);
    //   }
    // });
    
    // For now, just update all original values
    this.datasource.forEach(element => {
      element._originalValue = element.approximateValue;
      element._originalRemark = element.approximateValueRemark;
      element._originalCurrency = element.currency;
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
