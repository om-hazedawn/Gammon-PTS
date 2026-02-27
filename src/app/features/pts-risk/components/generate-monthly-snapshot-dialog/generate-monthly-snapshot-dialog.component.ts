import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MomentDateAdapter, MatMomentDateModule } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { TenderListApiService } from '../../../../core/services/tender-list-api.service';

export const MY_FORMATS = {
    parse: {
        dateInput: 'YYYY-MM-DD',
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'YYYY-MM-DD',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-generate-monthly-snapshot-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatButtonModule,
        MatDialogModule,
        MatSelectModule,
    ],
    template: `
        <h1 mat-dialog-title style="color: #1976d2; font-weight: 600;">Generate Monthly Snapshot</h1>
        <div mat-dialog-content>
            <mat-card class="edit-base-card" style="padding: 16px;">
                <div style="display: flex; align-items: center; margin-bottom: 24px; gap: 16px;">
                    <div style="flex: 0 0 120px; font-weight: 500;">As of:</div>
                    <mat-form-field style="flex: 1; min-width: 200px;">
                        <mat-label>Select Month</mat-label>
                        <mat-select [formControl]="asOfDateFC">
                            @for (date of asOfDate; track date.value) {
                                <mat-option [value]="date.value">{{ date.name }}</mat-option>
                            }
                        </mat-select>
                    </mat-form-field>
                </div>
                @if (!hideDivision) {
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="flex: 0 0 120px; font-weight: 500;">Division:</div>
                        <mat-form-field style="flex: 1; min-width: 200px;">
                            <mat-label>Select Division</mat-label>
                            <mat-select [formControl]="divisionFC">
                                @for (division of divisions; track division) {
                                    <mat-option [value]="division">{{ division }}</mat-option>
                                }
                            </mat-select>
                        </mat-form-field>
                    </div>
                }
            </mat-card>
        </div>
        <div mat-dialog-actions style="display: flex; justify-content: space-between; padding: 16px 0 2 0;">
            <button mat-raised-button [mat-dialog-close]="" cdkFocusInitial>Cancel</button>
            <button mat-raised-button color="primary" (click)="confirm()" [disabled]="!isFormValid()">
                Generate
            </button>
        </div>
    `,
    styles: [`
        :host {
            display: block;
        }
        mat-card {
            box-shadow: none !important;
            background-color: #f9f9f9;
        }
        .edit-base-card {
            padding: 16px;
            border-radius: 8px;
        }
    `],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class GenerateMonthlySnapshotDialogComponent implements OnInit {
    asOfDateFC: FormControl = new FormControl('', { validators: Validators.required });
    divisionFC: FormControl = new FormControl('', { validators: Validators.required });
    asOfDate: any[] = [];
    divisions: string[] = [];
    hideDivision = false;

    constructor(
        public dialogRef: MatDialogRef<GenerateMonthlySnapshotDialogComponent>,
        private tenderListApiService: TenderListApiService,
        @Inject(MAT_DIALOG_DATA) public data?: { hideDivision?: boolean }
    ) {
        if (this.data?.hideDivision) {
            this.hideDivision = true;
        }
    }

    ngOnInit() {
        // Only fetch divisions if not hidden
        if (!this.hideDivision) {
            this.tenderListApiService.generateSnapshotDivisionList().subscribe({
                next: (response) => {
                    // Handle the response - assuming it returns array or object with divisions
                    if (Array.isArray(response)) {
                        this.divisions = response;
                    } else if (response.data && Array.isArray(response.data)) {
                        this.divisions = response.data;
                    } else if (response.divisions && Array.isArray(response.divisions)) {
                        this.divisions = response.divisions;
                    }
                },
                error: (error) => {
                    console.error('Error fetching divisions:', error);
                },
            });
        }

        // Fetch period dropdown dates from API (Monthly)
        this.tenderListApiService.periodDropdownMonthly().subscribe({
            next: (response) => {
                // Handle the response - data property contains array of { name, value }
                if (response.data && Array.isArray(response.data)) {
                    this.asOfDate = response.data;
                } else if (Array.isArray(response)) {
                    this.asOfDate = response;
                }
            },
            error: (error) => {
                console.error('Error fetching period dropdown monthly:', error);
            },
        });
    }

    isFormValid(): boolean {
        if (this.hideDivision) {
            return this.asOfDateFC.valid;
        }
        return this.asOfDateFC.valid && this.divisionFC.valid;
    }

    confirm() {
        if (this.isFormValid()) {
            this.dialogRef.close({
                asOfDate: this.asOfDateFC.value,
                division: this.divisionFC.value,
            });
        }
    }
}
