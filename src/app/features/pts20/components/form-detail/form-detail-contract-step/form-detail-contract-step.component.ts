import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { FORM_DETAIL_STEP_IMPORTS } from '../form-detail-step-imports';
import { Form20ListDropdownService, ObtainRegion } from '../../../../../core/services/Form20/form20listdropdown.service';

@Component({
  selector: 'app-form-detail-contract-step',
  standalone: true,
  imports: FORM_DETAIL_STEP_IMPORTS,
  templateUrl: './form-detail-contract-step.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDetailContractStepComponent {

  contractTypes: ObtainRegion = {};
  measurementDetails: ObtainRegion = {};
  fluctuation: ObtainRegion = {};

  constructor(
    private form20ListDropdownService: Form20ListDropdownService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadContractTypes();
    this.loadMeasurementDetails();
    this.loadFluctuation();
  }

  private loadContractTypes(): void {
    this.form20ListDropdownService.obtainContractType().subscribe({
      next: (data: ObtainRegion) => {
        const contractData : ObtainRegion = {};
        Object.entries(data).forEach(([key, value]) => {
          contractData[+key] = value;     
        });
        this.contractTypes = contractData;
        this.cdr.markForCheck(); // Trigger change detection
      },
      error: (error: unknown) => {
        console.error('Error loading contract types:', error);
      } 
    });
  }

  private loadMeasurementDetails(): void {
    this.form20ListDropdownService.obtainMeasurementDetails().subscribe({
      next: (data: ObtainRegion) => {
        const measurementData : ObtainRegion = {};
        Object.entries(data).forEach(([key, value]) => {
          measurementData[+key] = value;
        });
        this.measurementDetails = measurementData;
        this.cdr.markForCheck(); // Trigger change detection
      },
      error: (error: unknown) => {
        console.error('Error loading measurement details:', error);
      } 
    });
  }
  private loadFluctuation(): void {
    this.form20ListDropdownService.obtainFluctuation().subscribe({
      next: (data: ObtainRegion) => {
        const fluctuationData : ObtainRegion = {};
        Object.entries(data).forEach(([key, value]) => {
          fluctuationData[+key] = value;
        });
        this.fluctuation = fluctuationData;
        this.cdr.markForCheck(); // Trigger change detection
      },
      error: (error: unknown) => {
        console.error('Error loading fluctuation details:', error);
      }
    });
  }

}
