import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FORM_DETAIL_STEP_IMPORTS } from '../form-detail-step-imports';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { Form20ListDropdownService, ApprovalUser } from '../../../../../core/services/Form20/form20listdropdown.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-form-approval',
  standalone: true,
  imports: [...FORM_DETAIL_STEP_IMPORTS , MatAutocompleteModule, MatChipsModule, MatFormFieldModule],
  templateUrl: './form-approval.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormApprovalComponent implements OnInit {
  // Director chips/autocomplete logic
  get selectedDirector(): ApprovalUser[] {
    return this.directorControl.value || [];
  }
  removeDirector(user: ApprovalUser): void {
    const current = this.selectedDirector.filter(u => u.employeeNo !== user.employeeNo);
    this.directorControl.setValue(current);
  }
  addDirector(event: any): void {
    const user: ApprovalUser = event.option.value;
    if (!this.selectedDirector.some(u => u.employeeNo === user.employeeNo)) {
      this.directorControl.setValue([...this.selectedDirector, user]);
    }
    this.dirSearchCtrl.setValue('');
  }
  filteredDirectorOptions$!: Observable<ApprovalUser[]>;

  // Executive Director chips/autocomplete logic
  get selectedExecutiveDirector(): ApprovalUser[] {
    return this.executiveDirectorControl.value || [];
  }
  removeExecutiveDirector(user: ApprovalUser): void {
    const current = this.selectedExecutiveDirector.filter(u => u.employeeNo !== user.employeeNo);
    this.executiveDirectorControl.setValue(current);
  }
  addExecutiveDirector(event: any): void {
    const user: ApprovalUser = event.option.value;
    if (!this.selectedExecutiveDirector.some(u => u.employeeNo === user.employeeNo)) {
      this.executiveDirectorControl.setValue([...this.selectedExecutiveDirector, user]);
    }
    this.edSearchCtrl.setValue('');
  }

  filteredExecutiveDirectorOptions$!: Observable<ApprovalUser[]>;
  // CEO chips/autocomplete logic
  get selectedCEO(): ApprovalUser[] {
    return this.ceoControl.value || [];
  }

  removeCEO(user: ApprovalUser): void {
    const current = this.selectedCEO.filter(u => u.employeeNo !== user.employeeNo);
    this.ceoControl.setValue(current);
  }
  addCEO(event: any): void {
    const user: ApprovalUser = event.option.value;
    if (!this.selectedCEO.some(u => u.employeeNo === user.employeeNo)) {
      this.ceoControl.setValue([...this.selectedCEO, user]);
    }
    this.ceoSearchCtrl.setValue('');
  }
  
  isSubmitting = false;

  // Head of Estimating chips/autocomplete logic
  FORM20_CSD_HOE: ApprovalUser[] = [];
  hoeSearchCtrl = new FormControl('');
  filteredHeadOfEstimatingOptions$!: Observable<ApprovalUser[]>;

  get selectedHeadOfEstimating(): ApprovalUser[] {
    return this.headOfEstimatingControl.value || [];
  }
  removeHeadOfEstimating(user: ApprovalUser): void {
    const current = this.selectedHeadOfEstimating.filter(u => u.employeeNo !== user.employeeNo);
    this.headOfEstimatingControl.setValue(current);
  }
  addHeadOfEstimating(event: any): void {
    const user: ApprovalUser = event.option.value;
    if (!this.selectedHeadOfEstimating.some(u => u.employeeNo === user.employeeNo)) {
      this.headOfEstimatingControl.setValue([...this.selectedHeadOfEstimating, user]);
    }
    this.hoeSearchCtrl.setValue('');
  }

  // Contract Manager chips/autocomplete logic
  FORM20_CSD_CM: ApprovalUser[] = [];
  cmSearchCtrl = new FormControl('');
  filteredContractManagerOptions$!: Observable<ApprovalUser[]>;
  get selectedContractManager(): ApprovalUser[] {
    return this.contractManagerControl.value || [];
  }
  removeContractManager(user: ApprovalUser): void {
    const current = this.selectedContractManager.filter(u => u.employeeNo !== user.employeeNo);
    this.contractManagerControl.setValue(current);
  }
  addContractManager(event: any): void {
    const user: ApprovalUser = event.option.value;
    if (!this.selectedContractManager.some(u => u.employeeNo === user.employeeNo)) {
      this.contractManagerControl.setValue([...this.selectedContractManager, user]);
    }
    this.cmSearchCtrl.setValue('');
  }

  // Director
  FORM20_CSD_DIR: ApprovalUser[] = [];
  dirSearchCtrl = new FormControl('');
  filteredDirectorOptions: ApprovalUser[] = [];

  // Executive Director
  FORM20_CSD_ED: ApprovalUser[] = [];
  edSearchCtrl = new FormControl('');
  filteredExecutiveDirectorOptions: ApprovalUser[] = [];

  // CEO
  FORM20_CEO: ApprovalUser[] = [];
  ceoSearchCtrl = new FormControl('');
  filteredCEOOptions$!: Observable<ApprovalUser[]>;
    get headOfEstimatingControl(): FormControl {
      return this.approvalForm.get('headOfEstimating') as FormControl;
    }
    get contractManagerControl(): FormControl {
      return this.approvalForm.get('contractManager') as FormControl;
    }
    get directorControl(): FormControl {
      return this.approvalForm.get('director') as FormControl;
    }
    get executiveDirectorControl(): FormControl {
      return this.approvalForm.get('executiveDirector') as FormControl;
    }
    get ceoControl(): FormControl {
      return this.approvalForm.get('ceo') as FormControl;
    }

    approvalForm = new FormGroup({
    headOfEstimating: new FormControl<ApprovalUser[]>([], [Validators.required]),
    contractManager: new FormControl<ApprovalUser[]>([], [Validators.required]),
    director: new FormControl<ApprovalUser[]>([], [Validators.required]),
    executiveDirector: new FormControl<ApprovalUser[]>([], [Validators.required]),
    ceo: new FormControl<ApprovalUser[]>([], [Validators.required]),
  });

  constructor(
    private form20ListDropdownService: Form20ListDropdownService,
    public dialogRef: MatDialogRef<FormApprovalComponent>
  ) {}

  ngOnInit(): void {
    this.loadForm20_CSD_HOE();
    // Head of Estimating autocomplete filtering
    this.filteredHeadOfEstimatingOptions$ = this.hoeSearchCtrl.valueChanges.pipe(
      startWith(''),
      map(searchValue => {
        const search = (typeof searchValue === 'string' ? searchValue : '').toLowerCase();
        return this.FORM20_CSD_HOE.filter(user =>
          user.fullName.toLowerCase().includes(search) ||
          user.employeeNo.toLowerCase().includes(search)
        );
      })
    );
    this.loadForm20_CSD_CM();
    // Contract Manager autocomplete filtering
    this.filteredContractManagerOptions$ = this.cmSearchCtrl.valueChanges.pipe(
      startWith(''),
      map(searchValue => {
        const search = (typeof searchValue === 'string' ? searchValue : '').toLowerCase();
        return this.FORM20_CSD_CM.filter(user =>
          user.fullName.toLowerCase().includes(search) ||
          user.employeeNo.toLowerCase().includes(search)
        );
      })
    );
    this.loadForm20_CSD_DIR();
    // Director autocomplete filtering
    this.filteredDirectorOptions$ = this.dirSearchCtrl.valueChanges.pipe(
      startWith(''),
      map(searchValue => {
        const search = (typeof searchValue === 'string' ? searchValue : '').toLowerCase();
        return this.FORM20_CSD_DIR.filter(user =>
          user.fullName.toLowerCase().includes(search) ||
          user.employeeNo.toLowerCase().includes(search)
        );
      })
    );
    this.loadForm20_CSD_ED();
    // Executive Director autocomplete filtering
    this.filteredExecutiveDirectorOptions$ = this.edSearchCtrl.valueChanges.pipe(
      startWith(''),
      map(searchValue => {
        const search = (typeof searchValue === 'string' ? searchValue : '').toLowerCase();
        return this.FORM20_CSD_ED.filter(user =>
          user.fullName.toLowerCase().includes(search) ||
          user.employeeNo.toLowerCase().includes(search)
        );
      })
    );
    this.loadForm20_CEO();
    // CEO autocomplete filtering
    this.filteredCEOOptions$ = this.ceoSearchCtrl.valueChanges.pipe(
      startWith(''),
      map(searchValue => {
        const search = (typeof searchValue === 'string' ? searchValue : '').toLowerCase();
        return this.FORM20_CEO.filter(user =>
          user.fullName.toLowerCase().includes(search) ||
          user.employeeNo.toLowerCase().includes(search)
        );
      })
    );
  }

  private loadForm20_CEO(): void {
    // Use the correct CEO endpoint
  this.form20ListDropdownService.FORM20_CE().subscribe({
      next: (data: ApprovalUser[]) => {
        this.FORM20_CEO = data;
        // No need to set filteredCEOOptions, handled by observable
      },
      error: (error) => {
        console.error('Error loading CEO options:', error);
      }
    });
  }

  displayFn(user: ApprovalUser): string {
    return user ? `${user.fullName} (${user.employeeNo})` : '';
  }

  // onOptionSelected removed: not needed for mat-select multiple

  private loadForm20_CSD_HOE(): void {
    this.form20ListDropdownService.FORM20_CSD_HOE().subscribe({
      next: (data: ApprovalUser[]) => {
        this.FORM20_CSD_HOE = data;
        // No need to set filteredHeadOfEstimatingOptions, handled by observable
      },
      error: (error) => {
        console.error('Error loading Head of Estimating options:', error);
      }
    });
  }

  private loadForm20_CSD_CM(): void {
    this.form20ListDropdownService.FORM20_CSD_CM().subscribe({
      next: (data: ApprovalUser[]) => {
        this.FORM20_CSD_CM = data;
        // No need to set filteredContractManagerOptions, handled by observable
      },
      error: (error) => {
        console.error('Error loading Contract Manager options:', error);
      }
    });
  }

  private loadForm20_CSD_DIR(): void {
    this.form20ListDropdownService.FORM20_CSD_DIR().subscribe({
      next: (data: ApprovalUser[]) => {
        this.FORM20_CSD_DIR = data;
        this.filteredDirectorOptions = data;
      },
      error: (error) => {
        console.error('Error loading Director options:', error);
      }
    });
  }

  private loadForm20_CSD_ED(): void {
    this.form20ListDropdownService.FORM20_CSD_ED().subscribe({
      next: (data: ApprovalUser[]) => {
        this.FORM20_CSD_ED = data;
        this.filteredExecutiveDirectorOptions = data;
      },
      error: (error) => {
        console.error('Error loading Executive Director options:', error);
      }
    });
  }


  onSubmit(): void {
    if (this.approvalForm.valid) {
      this.isSubmitting = true;
      // Map selected ApprovalUser[] to employeeNo[] for each field
      const result = {
        headOfEstimating: (this.approvalForm.value.headOfEstimating ?? []).map((u: ApprovalUser) => u.employeeNo),
        contractManager: (this.approvalForm.value.contractManager ?? []).map((u: ApprovalUser) => u.employeeNo),
        director: (this.approvalForm.value.director ?? []).map((u: ApprovalUser) => u.employeeNo),
        executiveDirector: (this.approvalForm.value.executiveDirector ?? []).map((u: ApprovalUser) => u.employeeNo),
        ceo: (this.approvalForm.value.ceo ?? []).map((u: ApprovalUser) => u.employeeNo),
      };
      this.dialogRef.close(result);
      this.isSubmitting = false;
    }
  }
}
