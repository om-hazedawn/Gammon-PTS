import { ChangeDetectionStrategy, Component, OnInit, Inject } from '@angular/core';
import { FORM_DETAIL_STEP_IMPORTS } from '../form-detail-step-imports';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  styles: [`
    .readonly-banner {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      margin-bottom: 16px;
      background-color: #fff3cd;
      border: 1px solid #ffc107;
      border-radius: 4px;
      color: #856404;
    }
    .readonly-banner mat-icon {
      color: #856404;
    }
  `]
})
export class FormApprovalComponent implements OnInit {
  // Check if user can edit approvers based on form status and edit rights
  get isReadOnly(): boolean {
    const status = this.data?.formData?.status;
    const businessUnitCode = this.data?.formData?.businessUnitCode;
    const hasEditRight = this.form20ListDropdownService.hasEditRight(businessUnitCode);
    return !hasEditRight;
  }

  // Enable submit if any approval field has at least one entry AND user has edit rights
  get canSubmit(): boolean {
    if (this.isReadOnly) return false;
    return (
      (this.approvalForm.get('ceo')?.value?.length ?? 0) > 0 ||
      (this.approvalForm.get('contractManager')?.value?.length ?? 0) > 0 ||
      (this.approvalForm.get('director')?.value?.length ?? 0) > 0 ||
      (this.approvalForm.get('executiveDirector')?.value?.length ?? 0) > 0 ||
      (this.approvalForm.get('headOfEstimating')?.value?.length ?? 0) > 0
    );
  }
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
  headOfEstimating: new FormControl<ApprovalUser[]>([]),
  contractManager: new FormControl<ApprovalUser[]>([]),
  director: new FormControl<ApprovalUser[]>([]),
  executiveDirector: new FormControl<ApprovalUser[]>([]),
  ceo: new FormControl<ApprovalUser[]>([]),
  });

  constructor(
    private form20ListDropdownService: Form20ListDropdownService,
    public dialogRef: MatDialogRef<FormApprovalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  // Debug: Log incoming ceApproval data
    this.loadForm20_CSD_HOE();
    
    // In readonly mode, we hide interactive elements in template instead of disabling
    // This allows the form to remain valid for viewing existing approvers
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

    // Patch CEO field from ceApproval data if available
    if (this.data && Array.isArray(this.data.ceApproval)) {
      // Map ceApproval to ApprovalUser[] for chips input
      const ceoUsers: ApprovalUser[] = this.data.ceApproval
        .filter((a: any) => a && a.staffNo)
        .map((a: any) => ({
          employeeNo: a.staffNo,
          fullName: a.approverName || '',
          title: a.title || '',
        }));
      console.log('Mapped ceoUsers for CEO field:', ceoUsers);
      if (ceoUsers.length) {
        this.ceoControl.setValue(ceoUsers);
        console.log('Set CEO field value:', this.ceoControl.value);
      }
    }

    // Patch Executive Director field from edApproval data if available
    if (this.data && Array.isArray(this.data.edApproval)) {
      const edUsers: ApprovalUser[] = this.data.edApproval
        .filter((a: any) => a && a.staffNo)
        .map((a: any) => ({
          employeeNo: a.staffNo,
          fullName: a.approverName || '',
          title: a.title || '',
        }));
      console.log('Mapped edUsers for Executive Director field:', edUsers);
      if (edUsers.length) {
        this.executiveDirectorControl.setValue(edUsers);
        console.log('Set Executive Director field value:', this.executiveDirectorControl.value);
      }
    }

    // Patch Director field from dirApproval data if available
    if (this.data && Array.isArray(this.data.dirApproval)) {
      const dirUsers: ApprovalUser[] = this.data.dirApproval
        .filter((a: any) => a && a.staffNo)
        .map((a: any) => ({
          employeeNo: a.staffNo,
          fullName: a.approverName || '',
          title: a.title || '',
        }));
      console.log('Mapped dirUsers for Director field:', dirUsers);
      if (dirUsers.length) {
        this.directorControl.setValue(dirUsers);
        console.log('Set Director field value:', this.directorControl.value);
      }
    }
    
    // Patch Contract Manager field from cmApproval data if available
    if (this.data && Array.isArray(this.data.cmApproval)) {
      const cmUsers: ApprovalUser[] = this.data.cmApproval
        .filter((a: any) => a && a.staffNo)
        .map((a: any) => ({
          employeeNo: a.staffNo,
          fullName: a.approverName || '',
          title: a.title || '',
        }));
      console.log('Mapped cmUsers for Contract Manager field:', cmUsers);
      if (cmUsers.length) {
        this.contractManagerControl.setValue(cmUsers);
        console.log('Set Contract Manager field value:', this.contractManagerControl.value);
      }
    }

    // Patch Head of Estimating field from hoEApproval data if available
    if (this.data && Array.isArray(this.data.hoEApproval)) {
      const hoeUsers: ApprovalUser[] = this.data.hoEApproval
        .filter((a: any) => a && a.staffNo)
        .map((a: any) => ({
          employeeNo: a.staffNo,
          fullName: a.approverName || '',
          title: a.title || '',
        }));
      console.log('Mapped hoeUsers for Head of Estimating field:', hoeUsers);
      if (hoeUsers.length) {
        this.headOfEstimatingControl.setValue(hoeUsers);
        console.log('Set Head of Estimating field value:', this.headOfEstimatingControl.value);
      }
    }
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
    if (this.approvalForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      // Map selected ApprovalUser[] to approval arrays for saving, preserving comments, decision, id if present
      const mapApproval = (u: ApprovalUser & { comments?: string; decision?: string; id?: any }) => ({
        staffNo: u.employeeNo,
        approverName: u.fullName,
        title: u.title || '',
        comments: u.comments ?? '',
        decision: u.decision ?? '',
        id: u.id ?? null
      });
      const result = {
        hoEApproval: (this.approvalForm.value.headOfEstimating ?? []).map(mapApproval),
        cmApproval: (this.approvalForm.value.contractManager ?? []).map(mapApproval),
        dirApproval: (this.approvalForm.value.director ?? []).map(mapApproval),
        edApproval: (this.approvalForm.value.executiveDirector ?? []).map(mapApproval),
        ceApproval: (this.approvalForm.value.ceo ?? []).map(mapApproval),
      };
      // Delay closing dialog to show loading state
      setTimeout(() => {
        this.dialogRef.close(result);
      }, 500);
    }
  }
}
