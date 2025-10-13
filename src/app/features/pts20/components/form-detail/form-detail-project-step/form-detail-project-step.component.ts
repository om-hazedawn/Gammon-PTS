import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { FORM_DETAIL_STEP_IMPORTS } from '../form-detail-step-imports';
import { Form20ListDropdownService, ObtainRegion } from '../../../../../core/services/Form20/form20listdropdown.service';

@Component({
  providers: [Form20ListDropdownService],
  selector: 'app-form-detail-project-step',
  standalone: true,
  imports: FORM_DETAIL_STEP_IMPORTS,
  templateUrl: './form-detail-project-step.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDetailProjectStepComponent implements OnInit {
  @Input() isEditMode = false;
  
  regions: ObtainRegion = {};
  currencies: ObtainRegion = {};
  tenderTypes: ObtainRegion = {};
  maintenanceDefects: ObtainRegion = {};
  financeStandings: ObtainRegion = {};
  financeTechnicalSplits: ObtainRegion = {};
  bidTypes: ObtainRegion = {};
  yesNo: ObtainRegion = {};

  constructor(private form20ListDropdownService: Form20ListDropdownService) {}

  ngOnInit(): void {
    this.loadRegions();
    this.loadCurrencies();
    this.loadTenderTypes();
    this.loadMaintenanceDefects();
    this.loadFinanceStandings();
    this.loadFinanceTechnicalSplits();
    this.loadBidTypes();
    this.loadYesNoNA();
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
