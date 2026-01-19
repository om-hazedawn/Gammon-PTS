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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Form20ListService } from '../../../../core/services/Form20/form20list.service';
import { Form20MaintenanceService } from '../../../../core/services/Form20/form20Maintainance.service';

interface TenderValueItem {
  id: number;
  status: string;
  tenderNo: string;
  businessUnitCode: string;
  title: string;
  country: string;
  location: string;
  client: string;
  approximateValue: number | null;
  currency: string;
  period: number;
  periodUnit: string;
  bidTypeId: number;
  dueDate: string;
  approximateValueRemark: string;
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
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="title-container">
      <h1 mat-dialog-title>Tender approximate value</h1>
      @if (hasAnyChanges()) {
        <button mat-icon-button color="primary" (click)="saveAll()">
          <mat-icon>save</mat-icon>
        </button>
      }
    </div>
    <div mat-dialog-content>
      <mat-card class="content-card">
        @if (isLoading) {
          <div class="loading-container">
            <mat-spinner diameter="50"></mat-spinner>
            <p>Loading tender values...</p>
          </div>
        }
        @if (!isLoading) {
          <mat-table [dataSource]="datasource" class="mat-elevation-z8">
            <ng-container matColumnDef="tenderno">
              <mat-header-cell *matHeaderCellDef> Tender No </mat-header-cell>
              <mat-cell *matCellDef="let element">
                @if (hasChanges(element)) {
                  <button mat-icon-button color="primary" (click)="save(element)">
                    <mat-icon>save</mat-icon>
                  </button>
                }
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
        }
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

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 20px;
        min-height: 300px;
      }

      .loading-container p {
        margin-top: 20px;
        font-size: 14px;
        color: #666;
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
  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<TenderValueRemarkComponent>,
    private form20ListService: Form20ListService,
    private maintenanceService: Form20MaintenanceService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.form20ListService.getForm20List().subscribe({
      next: (response: any) => {
        console.log('Form20 List Response:', response);
        
        let items: any[] = [];
        
        // Handle different response formats
        if (Array.isArray(response)) {
          items = response;
        } else if (response && response.items && Array.isArray(response.items)) {
          items = response.items;
        } else if (response && response.data && Array.isArray(response.data)) {
          items = response.data;
        }
        
        if (items && items.length > 0) {
          this.datasource = items.map((item: any) => ({
            id: item.id ?? 0,
            status: item.status || '',
            tenderNo: item.tenderNo || '',
            businessUnitCode: item.businessUnitCode || '',
            title: item.title || '',
            country: item.country || '',
            location: item.location || '',
            client: item.client || '',
            approximateValue: item.approximateValue ?? null,
            currency: item.currency || 'HKD',
            period: item.period ?? 0,
            periodUnit: item.periodUnit || '',
            bidTypeId: item.bidTypeId ?? 0,
            dueDate: item.dueDate || '',
            approximateValueRemark: item.approximateValueRemark || '',
            _originalValue: item.approximateValue ?? null,
            _originalRemark: item.approximateValueRemark || '',
            _originalCurrency: item.currency || 'HKD',
          }));
        } else {
          this.datasource = [];
          console.log('No data found in response');
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading form list:', error);
        this.datasource = [];
        this.isLoading = false;
      }
    });
  }

  save(element: TenderValueItem): void {
    console.log('Saving tender value for:', element.tenderNo);
    
    const updateData = {
      id: element.id,
      status: element.status,
      tenderNo: element.tenderNo,
      businessUnitCode: element.businessUnitCode,
      title: element.title,
      country: element.country,
      location: element.location,
      client: element.client,
      approximateValue: element.approximateValue,
      currency: element.currency,
      period: element.period,
      periodUnit: element.periodUnit,
      bidTypeId: element.bidTypeId,
      dueDate: element.dueDate,
      approximateValueRemark: element.approximateValueRemark
    };
    
    this.maintenanceService.updateTenderValue(updateData).subscribe({
      next: (response) => {
        console.log('Saved successfully', response);
        element._originalValue = element.approximateValue;
        element._originalRemark = element.approximateValueRemark;
        element._originalCurrency = element.currency;
      },
      error: (error) => {
        console.error('Error saving:', error);
      }
    });
  }

  saveAll(): void {
    console.log('Saving all tender values');
    
    const updates = this.datasource.map(element => ({
      id: element.id,
      status: element.status,
      tenderNo: element.tenderNo,
      businessUnitCode: element.businessUnitCode,
      title: element.title,
      country: element.country,
      location: element.location,
      client: element.client,
      approximateValue: element.approximateValue,
      currency: element.currency,
      period: element.period,
      periodUnit: element.periodUnit,
      bidTypeId: element.bidTypeId,
      dueDate: element.dueDate,
      approximateValueRemark: element.approximateValueRemark
    }));
    
    // Save each tender value individually
    let completedCount = 0;
    let errorCount = 0;
    
    updates.forEach((updateData, index) => {
      this.maintenanceService.updateTenderValue(updateData).subscribe({
        next: (response) => {
          completedCount++;
          const element = this.datasource[index];
          element._originalValue = element.approximateValue;
          element._originalRemark = element.approximateValueRemark;
          element._originalCurrency = element.currency;
          
          if (completedCount + errorCount === updates.length) {
            console.log(`Save complete: ${completedCount} succeeded, ${errorCount} failed`);
          }
        },
        error: (error) => {
          errorCount++;
          console.error(`Error saving ${updateData.tenderNo}:`, error);
          
          if (completedCount + errorCount === updates.length) {
            console.log(`Save complete: ${completedCount} succeeded, ${errorCount} failed`);
          }
        }
      });
    });
  }

  hasChanges(element: TenderValueItem): boolean {
    return (
      element.approximateValue !== element._originalValue ||
      element.approximateValueRemark !== element._originalRemark ||
      element.currency !== element._originalCurrency
    );
  }

  hasAnyChanges(): boolean {
    return this.datasource.some(element => this.hasChanges(element));
  }

  close(): void {
    this.dialogRef.close();
  }
}
