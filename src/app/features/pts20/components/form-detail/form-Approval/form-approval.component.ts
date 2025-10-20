import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FORM_DETAIL_STEP_IMPORTS } from '../form-detail-step-imports';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Form20ListDropdownService,
  ApprovalUser,
} from '../../../../../core/services/Form20/form20listdropdown.service';

@Component({
  selector: 'app-form-approval',
  standalone: true,
  imports: [...FORM_DETAIL_STEP_IMPORTS],
  templateUrl: './form-approval.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormApprovalComponent implements OnInit {
  isSubmitting = false;

  // Head of Estimating
  FORM20_CSD_HOE: ApprovalUser[] = [];
  selectedHeadOfEstimating: ApprovalUser[] = [];
  hoeSearchCtrl = new FormControl('');
  filteredHeadOfEstimatingOptions: ApprovalUser[] = [];

  // Contract Manager
  FORM20_CSD_CM: ApprovalUser[] = [];
  selectedContractManager: ApprovalUser[] = [];
  cmSearchCtrl = new FormControl('');
  filteredContractManagerOptions: ApprovalUser[] = [];

  // Director
  FORM20_CSD_DIR: ApprovalUser[] = [];
  selectedDirector: ApprovalUser[] = [];
  dirSearchCtrl = new FormControl('');
  filteredDirectorOptions: ApprovalUser[] = [];

  // Executive Director
  FORM20_CSD_ED: ApprovalUser[] = [];
  selectedExecutiveDirector: ApprovalUser[] = [];
  edSearchCtrl = new FormControl('');
  filteredExecutiveDirectorOptions: ApprovalUser[] = [];

  // CEO
  FORM20_CEO: ApprovalUser[] = [];
  selectedCEO: ApprovalUser[] = [];
  ceoSearchCtrl = new FormControl('');
  filteredCEOOptions: ApprovalUser[] = [];

  approvalForm = new FormGroup({
    headOfEstimating: new FormControl<string>('', [Validators.required]),
    contractManager: new FormControl<string>('', [Validators.required]),
    director: new FormControl<string>('', [Validators.required]),
    executiveDirector: new FormControl<string>('', [Validators.required]),
    ceo: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private form20ListDropdownService: Form20ListDropdownService,
    public dialogRef: MatDialogRef<FormApprovalComponent>
  ) {}

  ngOnInit(): void {
    this.loadForm20_CSD_HOE();
    this.loadForm20_CSD_CM();
    this.loadForm20_CSD_DIR();
    this.loadForm20_CSD_ED();
    this.loadForm20_CEO();
    this.setupSearchControls();
  }

  private loadForm20_CEO(): void {
    // Since there's no specific CEO endpoint, we'll use ED data for demonstration
    // Replace this with the actual CEO data endpoint when available
    this.form20ListDropdownService.FORM20_CSD_ED().subscribe({
      next: (data: ApprovalUser[]) => {
        this.FORM20_CEO = data;
        this.filteredCEOOptions = data;
      },
      error: (error) => {
        console.error('Error loading CEO options:', error);
      }
    });
  }

  displayFn(user: ApprovalUser): string {
    return user ? `${user.fullName} (${user.employeeNo})` : '';
  }

  onOptionSelected(event: any, controlName: string): void {
    const selectedUser = event.option.value;
    this.approvalForm.get(controlName)?.setValue(selectedUser.employeeNo);
  }

  private loadForm20_CSD_HOE(): void {
    this.form20ListDropdownService.FORM20_CSD_HOE().subscribe({
      next: (data: ApprovalUser[]) => {
        this.FORM20_CSD_HOE = data;
        this.filteredHeadOfEstimatingOptions = data;
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
        this.filteredContractManagerOptions = data;
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

  private setupSearchControls(): void {
    this.hoeSearchCtrl.valueChanges.subscribe(value => {
      const searchValue = typeof value === 'string' ? value : '';
      this.filterOptions(searchValue, this.FORM20_CSD_HOE, this.filteredHeadOfEstimatingOptions);
    });

    this.cmSearchCtrl.valueChanges.subscribe(value => {
      const searchValue = typeof value === 'string' ? value : '';
      this.filterOptions(searchValue, this.FORM20_CSD_CM, this.filteredContractManagerOptions);
    });

    this.dirSearchCtrl.valueChanges.subscribe(value => {
      const searchValue = typeof value === 'string' ? value : '';
      this.filterOptions(searchValue, this.FORM20_CSD_DIR, this.filteredDirectorOptions);
    });

    this.edSearchCtrl.valueChanges.subscribe(value => {
      const searchValue = typeof value === 'string' ? value : '';
      this.filterOptions(searchValue, this.FORM20_CSD_ED, this.filteredExecutiveDirectorOptions);
    });

    this.ceoSearchCtrl.valueChanges.subscribe(value => {
      const searchValue = typeof value === 'string' ? value : '';
      this.filterOptions(searchValue, this.FORM20_CEO, this.filteredCEOOptions);
    });
  }

  private filterOptions(searchValue: string, sourceArray: ApprovalUser[], targetArray: ApprovalUser[]): void {
    const search = searchValue.toLowerCase();
    const filtered = sourceArray.filter(user =>
      user.fullName.toLowerCase().includes(search) ||
      user.employeeNo.toLowerCase().includes(search)
    );
    targetArray.length = 0;
    targetArray.push(...filtered);
  }

  private filterHeadOfEstimatingOptions(searchValue: string): void {
    this.filterOptions(searchValue, this.FORM20_CSD_HOE, this.filteredHeadOfEstimatingOptions);
  }

  onSubmit(): void {
    if (this.approvalForm.valid) {
      this.isSubmitting = true;
      this.dialogRef.close(this.approvalForm.value);
      this.isSubmitting = false;
    }
  }
}
