import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-business-unit-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
  ],
  template: `
    <div class="filter-dialog">
      <h2 mat-dialog-title>Filter by Business Unit</h2>
      <mat-dialog-content>
        <div class="business-unit-list">
          @for (unit of data.availableUnits; track unit) {
            <div class="unit-option">
              <mat-checkbox
                [(ngModel)]="selectedUnits[unit]"
                (change)="onUnitChange(unit, $event)"
              >
                {{ unit }}
              </mat-checkbox>
            </div>
          }
        </div>
        @if (data.availableUnits.length === 0) {
          <p class="no-units">No business units available</p>
        }
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="onClear()">Clear</button>
        <button mat-raised-button color="primary" (click)="onApply()">Apply</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      .filter-dialog {
        min-width: 300px;
        padding: 0;
      }

      mat-dialog-content {
        padding: 20px;
        max-height: 400px;
        overflow-y: auto;
      }

      .business-unit-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .unit-option {
        display: flex;
        align-items: center;
      }

      .no-units {
        text-align: center;
        color: #999;
        padding: 20px;
      }

      mat-dialog-actions {
        padding: 16px 20px;
        border-top: 1px solid #e0e0e0;
      }

      h2 {
        margin: 0;
        padding: 16px 20px;
        border-bottom: 1px solid #e0e0e0;
        font-size: 18px;
        font-weight: 500;
      }
    `,
  ],
})
export class BusinessUnitFilterComponent implements OnInit {
  selectedUnits: { [key: string]: boolean } = {};

  constructor(
    public dialogRef: MatDialogRef<BusinessUnitFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      availableUnits: string[];
      selectedUnits: string[];
    }
  ) {}

  ngOnInit(): void {
    // Initialize the selected units object
    this.data.availableUnits.forEach(unit => {
      this.selectedUnits[unit] = this.data.selectedUnits.includes(unit);
    });
  }

  onUnitChange(unit: string, event: any): void {
    this.selectedUnits[unit] = event.checked;
  }

  onApply(): void {
    const selected = Object.keys(this.selectedUnits).filter(
      unit => this.selectedUnits[unit]
    );
    this.dialogRef.close(selected);
  }

  onClear(): void {
    // Clear all selections
    Object.keys(this.selectedUnits).forEach(unit => {
      this.selectedUnits[unit] = false;
    });
    this.dialogRef.close([]);
  }
}
