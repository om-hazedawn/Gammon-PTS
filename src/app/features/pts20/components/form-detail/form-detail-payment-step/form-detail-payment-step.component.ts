import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { FORM_DETAIL_STEP_IMPORTS } from '../form-detail-step-imports';

@Component({
  selector: 'app-form-detail-payment-step',
  standalone: true,
  imports: FORM_DETAIL_STEP_IMPORTS,
  templateUrl: './form-detail-payment-step.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDetailPaymentStepComponent {
  constructor(private controlContainer: ControlContainer) {}

  // Getter to access the parent form
  get formGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }
}
