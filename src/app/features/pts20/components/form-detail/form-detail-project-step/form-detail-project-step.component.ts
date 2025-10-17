import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
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
export class FormDetailProjectStepComponent implements OnInit {
  @Input() isEditMode = false;
  
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

  constructor(
    private form20ListDropdownService: Form20ListDropdownService,
    private dialog: MatDialog
  ) {}

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
      },
      error: (error: unknown) => {
        console.error('Error loading building units:', error);
      }
    });
  }

  private loadRegions(): void {
    this.form20ListDropdownService.obtainRegion().subscribe({
      next: (data: ObtainRegion) => {
        this.regions = data;
      },
      error: (error: unknown) => {
        console.error('Error loading regions:', error);
      }
    });
  }

  private loadCurrencies(): void {
    this.form20ListDropdownService.obtainCurrency().subscribe({
      next: (data: ObtainRegion) => {
        this.currencies = data;
      },
      error: (error: unknown) => {
        console.error('Error loading currencies:', error);
      } 
    });
  }

  private loadTenderTypes(): void {
    this.form20ListDropdownService.obtainTenderType().subscribe({
      next: (data: ObtainRegion) => {
        this.tenderTypes = data;
      },
      error: (error: unknown) => {
        console.error('Error loading tender types:', error);
      }
    });
  }

  private loadMaintenanceDefects(): void {
    this.form20ListDropdownService.obtainMaintenanceDefect().subscribe({
      next: (data: ObtainRegion) => {
        this.maintenanceDefects = data;
      },
      error: (error: unknown) => {
        console.error('Error loading maintenance defects:', error);
      }
    });
  }
  
  private loadFinanceStandings(): void {
    this.form20ListDropdownService.obtainFinanceStanding().subscribe({
      next: (data: ObtainRegion) => {
        this.financeStandings = data;
      },
      error: (error: unknown) => {
        console.error('Error loading finance standings:', error);
      }
    });
  }

  private loadFinanceTechnicalSplits(): void {
    this.form20ListDropdownService.obtainFinanceTechnicalSplit().subscribe({
      next: (data: ObtainRegion) => {
        this.financeTechnicalSplits = data;
      },
      error: (error: unknown) => {
        console.error('Error loading finance/technical splits:', error);
      }
    });
  }

  private loadBidTypes(): void {
    this.form20ListDropdownService.obtainBidType().subscribe({
      next: (data: ObtainRegion) => {
        this.bidTypes = data;
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
      },
      error: (error: unknown) => {
        console.error('Error loading Yes/No/NA options:', error);
      }
    });
  }
}
