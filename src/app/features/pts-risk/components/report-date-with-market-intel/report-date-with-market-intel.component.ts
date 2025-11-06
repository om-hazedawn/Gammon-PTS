import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { TenderItem } from '../../../../core/services/tender-list-api.service';
import { TenderListApiService, UpdateTenderMarketIntelligenceRequest } from '../../../../core/services/tender-list-api.service';
import { AlertDialog } from '../alert-dialog/alert-dialog.component';
import { MatButtonModule } from '@angular/material/button';


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
    selector: 'app-report-date-with-market-intel',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatProgressSpinnerModule,
        MatButtonModule,
    ],
    templateUrl: './report-date-with-market-intel.component.html',
    styleUrls: ['./report-date-with-market-intel.component.sass'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },]
})
export class ReportDateWithMarketIntelDialog implements OnInit {
    winningCompetitorMaxLength = 300;
    otherReasonsForLossMaxLength = 1000;

    tenderForm!: FormGroup;

    private isSaving = false;

    subject: TenderItem | null = null;

    constructor(
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: ReportDateWithMarketIntelDialogData,
        public dialogRef: MatDialogRef<ReportDateWithMarketIntelDialog>,
        private tenderApi: TenderListApiService,
    ) {}


    ngOnInit() {
        this.buildForm();
        if (this.data?.tenderId) {
            this.tenderApi
                .getTenderById(this.data.tenderId)
                .subscribe((remoteTender) => {
                    var remoteTenderData = remoteTender.data;
                    this.subject = remoteTenderData;

                    this.tenderForm.patchValue({
                        tenderId: remoteTenderData.id,
                        winningCompetitor: remoteTenderData.winningCompetitor,
                        marginLostPercentage: remoteTenderData.marginLostPercentage,
                        otherReasonsForLoss: remoteTenderData.otherReasonsForLoss,
                        reportDate: remoteTenderData.reportDate,
                    })
                });
        }
    }

    private buildForm() {
        this.tenderForm = this.formBuilder.group({
            tenderId: [
              undefined,
              [
                Validators.required,
              ],
            ],
            winningCompetitor: [
              '',
              [
                Validators.required,
                Validators.maxLength(this.winningCompetitorMaxLength),
              ],
            ],
            marginLostPercentage: [
              undefined, // decimal
              [
                //Validators.required,
                Validators.maxLength(this.winningCompetitorMaxLength),
              ],
            ],
            otherReasonsForLoss: [
              '',
              [
                //Validators.required,
                Validators.maxLength(this.otherReasonsForLossMaxLength),
              ],
            ],
            reportDate: [
                '',
                [Validators.required]
            ],
          });        
    }

    get winningCompetitorControl(): FormControl {
        return this.tenderForm.get('winningCompetitor') as FormControl;
    }

    get marginLostPercentageControl(): FormControl {
        return this.tenderForm.get('marginLostPercentage') as FormControl;
    }

    get otherReasonsForLossControl(): FormControl {
        return this.tenderForm.get('otherReasonsForLoss') as FormControl;
    }

    get reportDateControl(): FormControl {
        return this.tenderForm.get('reportDate') as FormControl;
    }

    isBusy() {
        return this.isSaving;
    }

    handleSubmit() {
        this.update();
    }

    private update() {
        const request = this.tenderForm.value as UpdateTenderMarketIntelligenceRequest;
        this.isSaving = true;

        this.tenderApi
            .putTenderMarketIntelligence(request)
            .pipe(
                finalize(() => {
                    this.isSaving = false;
                })
            )
            .subscribe({
                next: (presistedMarketSector) => {
                    this.subject = presistedMarketSector;

                    this.dialog
                        .open(AlertDialog, {
                            data: {
                                title: 'Tender',
                                message: 'Tender saved',
                            },
                        })
                        .afterClosed()
                        .subscribe(() => {
                            this.dialogRef.close(this.subject);
                        });
                },
                error: (ex) => {
                    if (ex.status === 422) {
                        const response = ex.error;
                        if (response?.validationErrors) {
                            const validationErrors = response?.validationErrors;

                            Object.keys(validationErrors).forEach((key: string) => {
                                // Note: The "?." is important for preventing referencing not-exist form control.
                                this.tenderForm?.get(key)?.setErrors({
                                  error422: validationErrors[key].join('\n'),
                                });
                              });                            
                        }
                    }
                }
            });
        
    }

}

export interface ReportDateWithMarketIntelDialogData {
    tenderId?: number;
}
