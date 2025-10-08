import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FORM_DETAIL_STEP_IMPORTS } from '../form-detail-step-imports';

@Component({
  selector: 'app-form-detail-attachment-step',
  standalone: true,
  imports: FORM_DETAIL_STEP_IMPORTS,
  templateUrl: './form-detail-attachment-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDetailAttachmentStepComponent {}
