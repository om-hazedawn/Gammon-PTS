import { ChangeDetectionStrategy, Component, Input, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormGroup } from '@angular/forms';
import { FORM_DETAIL_STEP_IMPORTS } from '../form-detail-step-imports';
import { Form20ListDropdownService, ObtainRegion, BusinessUnitDisplay } from '../../../../../core/services/Form20/form20listdropdown.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Form30LinkPopupComponent } from '../form30link-component/form30Linkpopup.components';

@Component({
  providers: [Form20ListDropdownService],
  selector: 'app-form-detail-project-step',
  standalone: true,
  imports: [
    ...FORM_DETAIL_STEP_IMPORTS,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './form-detail-project-step.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDetailProjectStepComponent implements OnInit, AfterViewInit {
  @Input() isEditMode = false;
  
  // Getter to access the parent form
  get formGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  // Check if bid type is Joint Venture Bid (value 2)
  get isJointVentureBid(): boolean {
    return this.formGroup?.get('BidType')?.value === 2;
  }
  
  businessUnitMapping: { [key: string]: string } = {
    'ALL': 'All',
    'BDG': 'Building',
    'CSD': 'CSD',
    'BU1': 'BU1',
    'BU2': 'BU2',
    'BU3': 'BU3',
    'BU4': 'BU4'
  };
  BuildingUnit: BusinessUnitDisplay = {};
  regions: ObtainRegion = {};
  currencies: ObtainRegion = {};
  tenderTypes: ObtainRegion = {};
  maintenanceDefects: ObtainRegion = {};
  financeStandings: ObtainRegion = {};
  financeTechnicalSplits: ObtainRegion = {};
  bidTypes: ObtainRegion = {};
  yesNo: ObtainRegion = {};
  jvAgreementOptions: ObtainRegion = {};

  constructor(
    private form20ListDropdownService: Form20ListDropdownService,
    private dialog: MatDialog,
    private controlContainer: ControlContainer,
    private cdr: ChangeDetectorRef
  ) {}

  // Helper method to format numbers with commas
  private formatWithCommas(value: number): string {
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  // Helper method to parse approximate value input
  private parseApproximateValue(val: string): number {
    if (!val) return 0;
    
    let trimmedVal = val.toString().trim().replace(/,/g, '').toUpperCase();
    
    if (trimmedVal.endsWith('K')) {
      return Math.round(+trimmedVal.replace('K', '') * 1000);
    }
    else if (trimmedVal.endsWith('M')) {
      return Math.round(+trimmedVal.replace('M', '') * 1000000);
    }
    else if (trimmedVal.endsWith('B') || trimmedVal.endsWith('BN')) {
      return Math.round(+trimmedVal.replace('BN', '').replace('B', '') * 1000000000);
    }
    
    return Math.round(+trimmedVal) || 0;
  }

  ngAfterViewInit() {
    const form = this.controlContainer.control as FormGroup;
    if (form) {
      const approximateValueControl = form.get('ApproximateValueInput');
      if (approximateValueControl) {
        approximateValueControl.valueChanges.subscribe(val => {
          if (val) {
            const parsedValue = this.parseApproximateValue(val);
            if (parsedValue > 0) {
              const formattedValue = this.formatWithCommas(parsedValue);
              if (val !== formattedValue) {
                approximateValueControl.setValue(formattedValue, { emitEvent: false });
              }
            }
          }
        });
      }

      // Listen to BidType changes to show/hide JV Partners field
      const bidTypeControl = form.get('BidType');
      if (bidTypeControl) {
        bidTypeControl.valueChanges.subscribe(value => {
          this.cdr.detectChanges(); // Trigger change detection when bid type changes
        });
      }
    }
  }

  ngOnInit(): void {
    this.loadBuildingUnits();
    this.loadRegions();
    this.loadCurrencies();
    this.loadTenderTypes();
    this.loadMaintenanceDefects();
    this.loadFinanceStandings();
    this.loadFinanceTechnicalSplits();
    this.loadBidTypes();
    this.loadYesNoNA();
    this.loadJVAgreementOptions();
  }

  openForm30Popup(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    const dialogRef = this.dialog.open(Form30LinkPopupComponent, {
      width: '900px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result) {
        console.log('Form 30 URL:', result);
      }
    });
  }
  private loadBuildingUnits(): void {
    this.form20ListDropdownService.obtainBuildingUnit().subscribe({
      next: (data: ObtainRegion) => {
        // Create a display object with just the keys and their mapped display names
        const mappedData: BusinessUnitDisplay = {};
        Object.keys(data).forEach(key => {
          mappedData[key] = this.businessUnitMapping[key] || key;
        });
        this.BuildingUnit = mappedData;
        this.cdr.detectChanges();
      },
      error: (error: unknown) => {
        console.error('Error loading building units:', error);
      }
    });
  }

  private loadRegions(): void {
    this.form20ListDropdownService.obtainRegion().subscribe({
      next: (data: ObtainRegion) => {
        // Convert keys to numbers to match the numeric regionId
        const numericRegions: ObtainRegion = {};
        Object.entries(data).forEach(([key, value]) => {
          numericRegions[+key] = value;
        });
        this.regions = numericRegions;
        this.cdr.detectChanges();
      },
      error: (error: unknown) => {
        console.error('Error loading regions:', error);
      }
    });
  }

  private loadCurrencies(): void {
    this.form20ListDropdownService.obtainCurrency().subscribe({
      next: (data: ObtainRegion) => {
        //convert keys to numbers to match the numeric currencyId
        const numericCurrencies: ObtainRegion = {};
        Object.entries(data).forEach(([key, value]) => {
          numericCurrencies[+key] = value;
        });
        this.currencies = numericCurrencies;
      },
      error: (error: unknown) => {
        console.error('Error loading currencies:', error);
      } 
    });
  }

  private loadTenderTypes(): void {
    this.form20ListDropdownService.obtainTenderType().subscribe({
      next: (data: ObtainRegion) => {
        // Convert keys to numbers to match the numeric tenderTypeId
        const numericTenderTypes: ObtainRegion = {};
        Object.entries(data).forEach(([key, value]) => {
          numericTenderTypes[+key] = value;
        });
        this.tenderTypes = numericTenderTypes;
      },
      error: (error: unknown) => {
        console.error('Error loading tender types:', error);
      }
    });
  }

  private loadMaintenanceDefects(): void {
    this.form20ListDropdownService.obtainMaintenanceDefect().subscribe({
      next: (data: ObtainRegion) => {
        const numericMaintenanceDefects: ObtainRegion = {};
        Object.entries(data).forEach(([key, value]) => {
          numericMaintenanceDefects[+key] = value;
        });
        this.maintenanceDefects = numericMaintenanceDefects;
      },
      error: (error: unknown) => {
        console.error('Error loading maintenance defects:', error);
      }
    });
  }
  
  private loadFinanceStandings(): void {
    this.form20ListDropdownService.obtainFinanceStanding().subscribe({
      next: (data: ObtainRegion) => {
        const numericFinanceStandings: ObtainRegion = {};
        Object.entries(data).forEach(([key, value]) => {
          numericFinanceStandings[+key] = value;
        });
        this.financeStandings = numericFinanceStandings;
      },
      error: (error: unknown) => {
        console.error('Error loading finance standings:', error);
      }
    });
  }

  private loadFinanceTechnicalSplits(): void {
    this.form20ListDropdownService.obtainFinanceTechnicalSplit().subscribe({
      next: (data: ObtainRegion) => {
        const numericFinanceTechnicalSplits: ObtainRegion = {};
        Object.entries(data).forEach(([key, value]) => {
          numericFinanceTechnicalSplits[+key] = value;
        });
        this.financeTechnicalSplits = numericFinanceTechnicalSplits;
      },
      error: (error: unknown) => {
        console.error('Error loading finance/technical splits:', error);
      }
    });
  }

  private loadBidTypes(): void {
    this.form20ListDropdownService.obtainBidType().subscribe({
      next: (data: ObtainRegion) => {
        const numericBidTypes: ObtainRegion = {};
        Object.entries(data).forEach(([key, value]) => {
          numericBidTypes[+key] = value;
        });
        this.bidTypes = numericBidTypes;
      },
      error: (error: unknown) => {
        console.error('Error loading bid types:', error);
      }
    });
  }

  private loadYesNoNA(): void {
    this.form20ListDropdownService.obtainYesNoNA().subscribe({
      next: (data: ObtainRegion) => {
        this.yesNo = data;
        this.cdr.detectChanges();
      },
      error: (error: unknown) => {
        console.error('Error loading Yes/No/NA options:', error);
      }
    });
  }

  private loadJVAgreementOptions(): void {
    this.form20ListDropdownService.obtainJVAgreement().subscribe({
      next: (data: ObtainRegion) => {
        this.jvAgreementOptions = data;
        // Debug: Log the JV Agreement options
        console.log('JV Agreement options loaded:', data);
        this.cdr.detectChanges();
      },
      error: (error: unknown) => {
        console.error('Error loading JV Agreement options:', error);
      }
    });
  }
}
