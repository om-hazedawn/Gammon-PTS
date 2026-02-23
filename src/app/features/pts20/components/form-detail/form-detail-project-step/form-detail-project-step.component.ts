import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlContainer, FormGroupDirective, FormGroup, FormControl } from '@angular/forms';
import { FORM_DETAIL_STEP_IMPORTS } from '../form-detail-step-imports';
import {
  Form20ListDropdownService,
  ObtainRegion,
  BusinessUnitDisplay,
  ApprovalUser,
} from '../../../../../core/services/Form20/form20listdropdown.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Form30LinkPopupComponent } from '../form30link-component/form30Linkpopup.components';

@Component({
  providers: [Form20ListDropdownService],
  selector: 'app-form-detail-project-step',
  standalone: true,
  imports: [...FORM_DETAIL_STEP_IMPORTS, MatDialogModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './form-detail-project-step.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDetailProjectStepComponent implements OnInit, AfterViewInit {
  @Output() allocateTenderNoRequest = new EventEmitter<void>();
  @Input() formId: number | null = null;
  // @Input() formId: number | null = null; (removed duplicate)
  allocatingTenderNo = false;

  allocateTenderNo(): void {
    console.log(
      'Allocate Tender No button clicked. Requesting parent to save form and allocate tender no.'
    );
    this.allocateTenderNoRequest.emit();
  }
  @Input() isEditMode = false;

  // Getter to access the parent form
  get formGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  // ...existing code...

  // Debugging: Log when isJointVentureBid is accessed
  get isJointVentureBid(): boolean {
    const isJV = this.formGroup?.get('BidType')?.value === 2;
    console.log('isJointVentureBid accessed. Value:', isJV);
    return isJV;
  }

  businessUnitMapping: { [key: string]: string } = {
    ALL: 'All',
    BDG: 'Building',
    CSD: 'CSD',
    BU1: 'BU1',
    BU2: 'BU2',
    BU3: 'BU3',
    BU4: 'BU4',
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
  
  // Bid Manager search
  bidManagerSearchResults: ApprovalUser[] = [];
  bidManagerSearchCtrl = new FormControl('');
  
  // Planner search
  plannerSearchResults: ApprovalUser[] = [];
  plannerSearchCtrl = new FormControl('');

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
    } else if (trimmedVal.endsWith('M')) {
      return Math.round(+trimmedVal.replace('M', '') * 1000000);
    } else if (trimmedVal.endsWith('B') || trimmedVal.endsWith('BN')) {
      return Math.round(+trimmedVal.replace('BN', '').replace('B', '') * 1000000000);
    }

    return Math.round(+trimmedVal) || 0;
  }

  ngAfterViewInit() {
    const form = this.controlContainer.control as FormGroup;
    if (form) {
      const approximateValueControl = form.get('ApproximateValueInput');
      if (approximateValueControl) {
        approximateValueControl.valueChanges.subscribe((val) => {
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

      // Add similar logic for Approxmargin, but store as number
      const approxMarginControl = form.get('Approxmargin');
      if (approxMarginControl) {
        approxMarginControl.valueChanges.subscribe((val) => {
          if (val) {
            const parsedValue = this.parseApproximateValue(val);
            if (!isNaN(parsedValue) && parsedValue > 0 && val !== parsedValue) {
              approxMarginControl.setValue(parsedValue, { emitEvent: false });
            }
          }
        });
      }

      // Listen to BidType changes to show/hide JV Partners field
      const bidTypeControl = form.get('BidType');
      if (bidTypeControl) {
        bidTypeControl.valueChanges.subscribe((value) => {
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
    
    // Initialize Bid Manager search
    this.initializeBidManagerSearch();
    
    // Initialize Planner search
    this.initializePlannerSearch();

    // Listen to TenderMarketScheme changes - no conversion needed as backend sends string values
    const tenderMarketSchemeControl = this.formGroup.get('TenderMarketScheme');
    if (tenderMarketSchemeControl) {
      tenderMarketSchemeControl.valueChanges.subscribe((value) => {
        // Value is already in the correct format (Yes/No/NA) from backend, no conversion needed
        if (value === null || value === undefined || value === '') {
          console.log('TenderMarketScheme value cleared');
        }
      });
    }

    this.formGroup.get('dueDate')?.valueChanges.subscribe((date) => {
      const tenderNoControl = this.formGroup.get('tenderNo');
      if (date) {
        tenderNoControl?.enable();
      } else {
        tenderNoControl?.disable();
      }
    });

    // Optionally, disable tenderNo initially if dueDate is empty
    if (!this.formGroup.get('dueDate')?.value) {
      this.formGroup.get('tenderNo')?.disable();
    }

    // Subscribe to BidType changes to trigger change detection
    this.formGroup.get('BidType')?.valueChanges.subscribe(() => {
      this.cdr.markForCheck();
    });
  }
  
  initializeBidManagerSearch(): void {
    // Sync existing BidManager value to search control
    const existingValue = this.formGroup.get('BidManager')?.value;
    if (existingValue) {
      this.bidManagerSearchCtrl.setValue(existingValue, { emitEvent: false });
    }
    
    // Subscribe to search control changes
    this.bidManagerSearchCtrl.valueChanges.subscribe((searchTerm: string | null) => {
      const value = searchTerm ? searchTerm.trim() : '';
      if (value.length >= 4) {
        this.searchBidManagers(value);
      } else {
        this.bidManagerSearchResults = [];
        this.cdr.markForCheck();
      }
    });
    
    // Also listen to form control changes to keep search control in sync
    this.formGroup.get('BidManager')?.valueChanges.subscribe((value) => {
      if (value && value !== this.bidManagerSearchCtrl.value) {
        this.bidManagerSearchCtrl.setValue(value, { emitEvent: false });
      }
    });
  }
  
  searchBidManagers(searchTerm: string): void {
    this.form20ListDropdownService.searchPeople(searchTerm).subscribe({
      next: (data: ApprovalUser[]) => {
        this.bidManagerSearchResults = data || [];
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        console.error('Error searching bid managers:', error);
        this.bidManagerSearchResults = [];
        this.cdr.markForCheck();
      },
    });
  }
  
  selectBidManager(user: ApprovalUser): void {
    // Set the full name in the form control
    this.formGroup.get('BidManager')?.setValue(user.fullName);
    // Update the search control to show the selected name
    this.bidManagerSearchCtrl.setValue(user.fullName, { emitEvent: false });
    // Clear the search results
    this.bidManagerSearchResults = [];
    this.cdr.markForCheck();
  }
  
  initializePlannerSearch(): void {
    // Sync existing Planner value to search control
    const existingValue = this.formGroup.get('Planner')?.value;
    if (existingValue) {
      this.plannerSearchCtrl.setValue(existingValue, { emitEvent: false });
    }
    
    // Subscribe to search control changes
    this.plannerSearchCtrl.valueChanges.subscribe((searchTerm: string | null) => {
      const value = searchTerm ? searchTerm.trim() : '';
      if (value.length >= 4) {
        this.searchPlanners(value);
      } else {
        this.plannerSearchResults = [];
        this.cdr.markForCheck();
      }
    });
    
    // Also listen to form control changes to keep search control in sync
    this.formGroup.get('Planner')?.valueChanges.subscribe((value) => {
      if (value && value !== this.plannerSearchCtrl.value) {
        this.plannerSearchCtrl.setValue(value, { emitEvent: false });
      }
    });
  }
  
  searchPlanners(searchTerm: string): void {
    this.form20ListDropdownService.searchPeople(searchTerm).subscribe({
      next: (data: ApprovalUser[]) => {
        this.plannerSearchResults = data || [];
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        console.error('Error searching planners:', error);
        this.plannerSearchResults = [];
        this.cdr.markForCheck();
      },
    });
  }
  
  selectPlanner(user: ApprovalUser): void {
    // Set the full name in the form control
    this.formGroup.get('Planner')?.setValue(user.fullName);
    // Update the search control to show the selected name
    this.plannerSearchCtrl.setValue(user.fullName, { emitEvent: false });
    // Clear the search results
    this.plannerSearchResults = [];
    this.cdr.markForCheck();
  }

  openForm30Popup(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const dialogRef = this.dialog.open(Form30LinkPopupComponent, {
      width: '900px',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result) {
        console.log('Form 30 URL:', result);
      }
    });
  }

  onBidTypeChange(event: Event): void {
    const value = +(event.target as HTMLSelectElement).value;
    this.formGroup.get('BidType')?.setValue(value);
    this.cdr.markForCheck();
  }

  private loadBuildingUnits(): void {
    this.form20ListDropdownService.obtainBuildingUnit().subscribe({
      next: (data: ObtainRegion) => {
        // Create a display object with just the keys and their mapped display names
        const mappedData: BusinessUnitDisplay = {};
        Object.keys(data).forEach((key) => {
          mappedData[key] = this.businessUnitMapping[key] || key;
        });
        this.BuildingUnit = mappedData;
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        console.error('Error loading building units:', error);
      },
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
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        console.error('Error loading regions:', error);
      },
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
        this.cdr.markForCheck(); // Trigger change detection
      },
      error: (error: unknown) => {
        console.error('Error loading currencies:', error);
      },
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
        this.cdr.markForCheck(); // Trigger change detection
      },
      error: (error: unknown) => {
        console.error('Error loading tender types:', error);
      },
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
        this.cdr.markForCheck(); // Trigger change detection
      },
      error: (error: unknown) => {
        console.error('Error loading maintenance defects:', error);
      },
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
        this.cdr.markForCheck(); // Trigger change detection
      },
      error: (error: unknown) => {
        console.error('Error loading finance standings:', error);
      },
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
        this.cdr.markForCheck(); // Trigger change detection
      },
      error: (error: unknown) => {
        console.error('Error loading finance/technical splits:', error);
      },
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
        this.cdr.markForCheck(); // Trigger change detection
      },
      error: (error: unknown) => {
        console.error('Error loading bid types:', error);
      },
    });
  }

  private loadYesNoNA(): void {
    this.form20ListDropdownService.obtainYesNoNA().subscribe({
      next: (data: ObtainRegion) => {
        // Filter out empty strings and convert values to uppercase to match backend data format
        this.yesNo = Object.keys(data)
          .filter((key) => (data[key] as unknown as string) !== '')
          .reduce((obj, key) => {
            const value = data[key] as unknown as string;
            obj[key] = value.toUpperCase() as unknown as string[];
            return obj;
          }, {} as ObtainRegion);
        this.cdr.detectChanges();
      },
      error: (error: unknown) => {
        console.error('Error loading Yes/No/NA options:', error);
      },
    });
  }

  private loadJVAgreementOptions(): void {
    this.form20ListDropdownService.obtainJVAgreement().subscribe({
      next: (data: ObtainRegion) => {
        this.jvAgreementOptions = data;
        this.cdr.detectChanges();
      },
      error: (error: unknown) => {
        console.error('Error loading JV Agreement options:', error);
      },
    });
  }
}
