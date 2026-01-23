import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { FORM_DETAIL_STEP_IMPORTS } from '../form-detail-step-imports';
import {
  Form20ListDropdownService,
  ObtainRegion,
} from '../../../../../core/services/Form20/form20listdropdown.service';

@Component({
  providers: [Form20ListDropdownService],
  selector: 'app-form-detail-insurance-step',
  standalone: true,
  imports: FORM_DETAIL_STEP_IMPORTS,
  templateUrl: './form-detail-insurance-step.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDetailInsuranceStepComponent implements OnInit {
  yesNo: ObtainRegion = {};

  constructor(
    private form20ListDropdownService: Form20ListDropdownService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadYesNoNA();
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
}
