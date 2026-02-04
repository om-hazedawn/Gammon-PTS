import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective } from '@angular/forms';
import { FORM_DETAIL_STEP_IMPORTS } from '../form-detail-step-imports';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  Form20ListDropdownService,
  ApprovalUser,
} from '../../../../../core/services/Form20/form20listdropdown.service';


@Component({
  selector: 'app-form-detail-distribution-step',

  standalone: true,

  imports: [
    ...FORM_DETAIL_STEP_IMPORTS,
    MatDialogModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],

  templateUrl: './form-detail-distribution-step.component.html',

  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDetailDistributionStepComponent implements OnInit {
  // Chief Executive Selection

  Form20_CE: ApprovalUser[] = [];
  selectedCE: ApprovalUser[] = [];
  ceSearchCtrl = new FormControl('');
  filteredCE!: Observable<ApprovalUser[]>; 
  
  // division commercial Manager

  FORM20_BDG_DCM: ApprovalUser[] = [];
  selectedBDGDCM: ApprovalUser[] = [];
  bdgDcmSearchCtrl = new FormControl('');
  filteredBDGDCM!: Observable<ApprovalUser[]>; 
  
  // Executive director Selection
  Form20_ALL_ED: ApprovalUser[] = [];
  selectedED: ApprovalUser[] = [];
  edSearchCtrl = new FormControl('');
  filteredED!: Observable<ApprovalUser[]>;

  // Insurance Manager
  FORM20_INS_MGR: ApprovalUser[] = [];
  selectedINS_MGR: ApprovalUser[] = [];
  insMgrSearchCtrl = new FormControl('');
  filteredINS_MGR!: Observable<ApprovalUser[]>;

  //Director Selection
  FORM20_BDG_DIR: ApprovalUser[] = [];
  selectedDIR: ApprovalUser[] = [];
  dirSearchCtrl = new FormControl('');
  filteredDIR!: Observable<ApprovalUser[]>;

  //head of lembth
  FORM20_LAM: ApprovalUser[] = [];
  selectedLAM: ApprovalUser[] = []
  lamSearchCtrl = new FormControl('');
  filteredLAM!: Observable<ApprovalUser[]>;

  // head of procurement
  FORM20_PRO: ApprovalUser[] = [];
  selectedPRO: ApprovalUser[] = []
  proSearchCtrl = new FormControl('');
  filteredPRO!: Observable<ApprovalUser[]>;

  //finance director
  FORM20_FIN_DIR: ApprovalUser[] = [];
  selectedFIN_DIR: ApprovalUser[] = []
  finDirSearchCtrl = new FormControl('');
  filteredFIN_DIR!: Observable<ApprovalUser[]>;

  //Risk oppprtunity
  FORM20_RISK_OPP: ApprovalUser[] = [];
  selectedRISK_OPP: ApprovalUser[] = []
  riskOppSearchCtrl = new FormControl('')
  filteredRISK_OPP!: Observable<ApprovalUser[]>;

  //commercial director
  FORM20_COM_DIR: ApprovalUser[] = [];
  selectedCOM_DIR: ApprovalUser[] = []
  comDirSearchCtrl = new FormControl('')
  filteredCOM_DIR!: Observable<ApprovalUser[]>;

  //HSEQ
  FORM20_HSEQ: ApprovalUser[] = [];
  selectedHSEQ: ApprovalUser[] = []
  hseqSearchCtrl = new FormControl('')
  filteredHSEQ!: Observable<ApprovalUser[]>;

  //general counsel
  FORM20_GEN_COUN: ApprovalUser[] = [];
  selectedGEN_COUN: ApprovalUser[] = []
  genCounSearchCtrl = new FormControl('')
  filteredGEN_COUN!: Observable<ApprovalUser[]>;


  // Bid Managers
  FORM20_BID_MGR: ApprovalUser[] = [];
  selectedBidManagers: ApprovalUser[] = [];
  bidManagerSearchCtrl = new FormControl('');
  filteredBidManagers!: Observable<ApprovalUser[]>;


  constructor(
    private form20ListDropdownService: Form20ListDropdownService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private formGroupDirective: FormGroupDirective
  ) {
    this.filteredCE = this.ceSearchCtrl.valueChanges.pipe(
      startWith(''),

      map((value) => this._filterCE(value))
    );

    this.filteredBDGDCM = this.bdgDcmSearchCtrl.valueChanges.pipe(
      startWith(''),

      map((value) => this._filterBDGDCM(value))
    );

    this.filteredED = this.edSearchCtrl.valueChanges.pipe(
      startWith(''),

      map((value) => this._filterED(value))
    );

    this.filteredINS_MGR = this.insMgrSearchCtrl.valueChanges.pipe(
      startWith(''),

      map((value) => this._filteredINS_MGR(value))
    );

    this.filteredDIR = this.dirSearchCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterDIR(value))
    );

    this.filteredLAM = this.lamSearchCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterLAM(value))
    );

    this.filteredPRO = this.proSearchCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterPRO(value))
    );
    this.filteredFIN_DIR = this.finDirSearchCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterFIN_DIR(value))
    );

    this.filteredRISK_OPP = this.riskOppSearchCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterRISK_OPP(value))
    );

    this.filteredCOM_DIR = this.comDirSearchCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCOM_DIR(value))
    );

    this.filteredHSEQ = this.hseqSearchCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterHSEQ(value))
    );

    this.filteredGEN_COUN = this.genCounSearchCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterGEN_COUN(value))
    );
  }

  ngOnInit() {
    this.loadForm20_CE();
    this.loadFORM20_ALL_ED();
    this.loadFORM20_BDG_DCM();
    this.loadFORM20_INS_MGR();
    this.loadFORM20_DIR();
    this.loadFORM20_LAM();
    this.loadFORM20_PRO();
    this.loadFORM20_FIN_DIR();
    this.loadFORM20_RISK_OPP();
    this.loadFORM20_COM_DIR();
    this.loadFORM20_HSEQ();
    this.loadFORM20_GEN_COUN();
    this.loadInitialBidManagers();
    // Only trigger Bid Manager search when user types at least 4 characters
    this.bidManagerSearchCtrl.valueChanges
      .subscribe((searchTerm: string | null) => {
        const value = searchTerm ? searchTerm.trim() : '';
        if (value.length >= 4) {
          this.loadBidManager(value);
        } else {
          this.FORM20_BID_MGR = [];
        }
      });
  }

  
  private loadForm20_CE(): void {
    this.form20ListDropdownService.FORM20_CE().subscribe({
      next: (data: ApprovalUser[]) => {
        this.Form20_CE = data; // Get current values if any

        const currentValues = this.formGroupDirective.form.get(
          'Distribution.ChiefExecutive'
        )?.value;

        if (currentValues && Array.isArray(currentValues)) {
          this.selectedCE = this.Form20_CE.filter((user) =>
            currentValues.includes(user.employeeNo)
          );
        }
        this.cdr.markForCheck();
      },

      error: (error: unknown) => {
        console.error('Error loading FORM20_CE:', error);
      },
    });
  }

  private loadFORM20_ALL_ED(): void {
    this.form20ListDropdownService.FORM20_ALL_ED().subscribe({
      next: (data: ApprovalUser[]) => {
        this.Form20_ALL_ED = data;

        const currentValues = this.formGroupDirective.form.get(
          'Distribution.ExecutiveDirector'
        )?.value;

        if (currentValues && Array.isArray(currentValues)) {
          this.selectedED = this.Form20_ALL_ED.filter((user) =>
            currentValues.includes(user.employeeNo)
          );
        }
        this.cdr.markForCheck();
      },

      error: (error: unknown) => {
        console.error('Error loading FORM20_ALL_ED:', error);
      },
    });
  }

  private loadFORM20_BDG_DCM(): void {
    this.form20ListDropdownService.FORM20_BDG_DCM().subscribe({
      next: (data: ApprovalUser[]) => {
        this.FORM20_BDG_DCM = data;

        const currentValues = this.formGroupDirective.form.get(
          'Distribution.DivisionCommercialManager'
        )?.value;

        if (currentValues && Array.isArray(currentValues)) {
          this.selectedBDGDCM = this.FORM20_BDG_DCM.filter((user) =>
            currentValues.includes(user.employeeNo)
          );
        }
        this.cdr.markForCheck();
      },

      error: (error: unknown) => {
        console.error('Error loading FORM20_BDG_DCM:', error);
      },
    });
  }

  private loadFORM20_INS_MGR(): void {
    this.form20ListDropdownService.FORM20_INS_MGR().subscribe({
      next: (data: ApprovalUser[]) => {
        this.FORM20_INS_MGR = data;

        const currentValues = this.formGroupDirective.form.get(
          'Distribution.InsuranceManager'
        )?.value;

        if (currentValues && Array.isArray(currentValues)) {
          this.selectedINS_MGR = this.FORM20_INS_MGR.filter((user) =>
            currentValues.includes(user.employeeNo)
          );
        }
        this.cdr.markForCheck();
      },

      error: (error: unknown) => {
        console.error('Error loading FORM20_INS_MGR:', error);
      },
    });
  }

  private loadFORM20_DIR(): void { 
    this.form20ListDropdownService.FORM20_BDG_DIR().subscribe({
      next: (data: ApprovalUser[]) => {
        this.FORM20_BDG_DIR = data;

        const currentValues = this.formGroupDirective.form.get(
          'Distribution.Director'
        )?.value;

        if (currentValues && Array.isArray(currentValues)) {
          this.selectedDIR = this.FORM20_BDG_DIR.filter((user) =>
            currentValues.includes(user.employeeNo)
          );
        }
        this.cdr.markForCheck();
      },

      error: (error: unknown) => {
        console.error('Error loading FORM20_DIR:', error);
      },
    });
  }

  private loadFORM20_LAM(): void {
    this.form20ListDropdownService.FORM20_LAM().subscribe({
      next: (data: ApprovalUser[]) => {
        this.FORM20_LAM = data;
        const currentValues = this.formGroupDirective.form.get(
          'Distribution.HeadofLambeth'
        )?.value;

        if (currentValues && Array.isArray(currentValues)) {
          this.selectedLAM = this.FORM20_LAM.filter((user) =>
            currentValues.includes(user.employeeNo)
          );
        }
        this.cdr.markForCheck();
      },

      error: (error: unknown) => {
        console.error('Error loading FORM20_LAM:', error);
      },
    });
  }

  private loadFORM20_PRO(): void {
    this.form20ListDropdownService.FORM20_PRO().subscribe({
      next: (data: ApprovalUser[]) => {
        this.FORM20_PRO = data;
        const currentValues = this.formGroupDirective.form.get(
          'Distribution.HeadOfProcurement'
        )?.value;
        if (currentValues && Array.isArray(currentValues)) {
          this.selectedPRO = this.FORM20_PRO.filter((user) =>
            currentValues.includes(user.employeeNo)
          );
        }
        this.cdr.markForCheck();
      },

      error: (error: unknown) => {
        console.error('Error loading FORM20_PRO:', error);
      },
    });
  }

  private loadFORM20_FIN_DIR(): void {
    this.form20ListDropdownService.FORM20_FIN_DIR().subscribe({
      next: (data: ApprovalUser[]) => {
        this.FORM20_FIN_DIR = data;
        const currentValues = this.formGroupDirective.form.get(
          'Distribution.FinanceDirector'
        )?.value;
        if (currentValues && Array.isArray(currentValues)) {
          this.selectedFIN_DIR = this.FORM20_FIN_DIR.filter((user) =>
            currentValues.includes(user.employeeNo)
          );
        }
        this.cdr.markForCheck();
      },

      error: (error: unknown) => {
        console.error('Error loading FORM20_FIN_DIR:', error);
      },
    });
  }

  private loadFORM20_RISK_OPP(): void {
    this.form20ListDropdownService.FORM20_RISK_OPP().subscribe({
      next: (data: ApprovalUser[]) => {
        this.FORM20_RISK_OPP = data;
        const currentValues = this.formGroupDirective.form.get(
          'Distribution.RiskOpportunityManager'
        )?.value;
        if (currentValues && Array.isArray(currentValues)) {
          this.selectedRISK_OPP = this.FORM20_RISK_OPP.filter((user) =>
            currentValues.includes(user.employeeNo)
          );
        }
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        console.error('Error loading FORM20_RISK_OPP:', error);
      },
    });
  }

  private loadFORM20_COM_DIR(): void {
    this.form20ListDropdownService.FORM20_COM_DIR().subscribe({
      next: (data: ApprovalUser[]) => {
        this.FORM20_COM_DIR = data;
        const currentValues = this.formGroupDirective.form.get(
          'Distribution.CommercialDirector'
        )?.value;
        if (currentValues && Array.isArray(currentValues)) {
          this.selectedCOM_DIR = this.FORM20_COM_DIR.filter((user) =>
            currentValues.includes(user.employeeNo)
          );
        }
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        console.error('Error loading FORM20_COM_DIR:', error);
      },
    });
  }

  private loadFORM20_HSEQ(): void {
    this.form20ListDropdownService.FORM20_HSEQ().subscribe({
      next: (data: ApprovalUser[]) => {
        this.FORM20_HSEQ = data;
        const currentValues = this.formGroupDirective.form.get(
          'Distribution.HSEQ'
        )?.value;
        if (currentValues && Array.isArray(currentValues)) {
          this.selectedHSEQ = this.FORM20_HSEQ.filter((user) =>
            currentValues.includes(user.employeeNo)
          );
        }
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        console.error('Error loading FORM20_HSEQ:', error);
      },
    });
  }

  private loadFORM20_GEN_COUN(): void {
    this.form20ListDropdownService.FORM20_GEN_COUN().subscribe({
      next: (data: ApprovalUser[]) => {
        this.FORM20_GEN_COUN = data;
        const currentValues = this.formGroupDirective.form.get(
          'Distribution.GeneralCounselLegal'
        )?.value;
        if (currentValues && Array.isArray(currentValues)) {
          this.selectedGEN_COUN = this.FORM20_GEN_COUN.filter((user) =>
            currentValues.includes(user.employeeNo)
          );
        }
        this.cdr.markForCheck();
      },
      error: (error: unknown) => {
        console.error('Error loading FORM20_GEN_COUN:', error);
      },
    });
  }

private loadInitialBidManagers(): void {
  const currentValues = this.formGroupDirective.form.get('Distribution.distributionBidMgr')?.value;
  
  if (currentValues && Array.isArray(currentValues) && currentValues.length > 0) {
    // For each employee number, search for their details
    currentValues.forEach((employeeNo: string) => {
      this.form20ListDropdownService.searchPeople(employeeNo).subscribe({
        next: (data: ApprovalUser[]) => {
          if (data && data.length > 0) {
            const user = data[0];
            if (!this.selectedBidManagers.some((u) => u.employeeNo === user.employeeNo)) {
              this.selectedBidManagers.push(user);
            }
            this.cdr.markForCheck();
          }
        },
        error: (error: unknown) => {
          console.error('Error loading bid manager details:', error);
        }
      });
    });
  }
}

private loadBidManager(searchTerm: string): void {
  this.form20ListDropdownService.searchPeople(searchTerm).subscribe({
    next: (data: ApprovalUser[]) => {
      this.FORM20_BID_MGR = data || [];
      this.cdr.markForCheck();
    },
    error: (error: unknown) => {
      console.error('Error loading Bid Managers:', error);
      // Set empty array on error to prevent UI issues
      this.FORM20_BID_MGR = [];
      this.cdr.markForCheck();
    },
  });
}

  private _filterCE(value: string | ApprovalUser | null): ApprovalUser[] {
    if (!value) return this.Form20_CE;

    const searchValue =
      typeof value === 'string' ? value.toLowerCase() : value.fullName.toLowerCase();

    return this.Form20_CE.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchValue) ||
        user.title.toLowerCase().includes(searchValue)
    );
  }

  private _filterED(value: string | ApprovalUser | null): ApprovalUser[] {
    if (!value) return this.Form20_ALL_ED;

    const searchValue =
      typeof value === 'string' ? value.toLowerCase() : value.fullName.toLowerCase();

    return this.Form20_ALL_ED.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchValue) ||
        user.title.toLowerCase().includes(searchValue)
    );
  }

  private _filterBDGDCM(value: string | ApprovalUser | null): ApprovalUser[] {
    if (!value) return this.FORM20_BDG_DCM;

    const searchValue =
      typeof value === 'string' ? value.toLowerCase() : value.fullName.toLowerCase();

    return this.FORM20_BDG_DCM.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchValue) ||
        user.title.toLowerCase().includes(searchValue)
    );
  }

  private _filteredINS_MGR(value: string | ApprovalUser | null): ApprovalUser[] {
    if (!value) return this.FORM20_INS_MGR;

    const searchValue =
      typeof value === 'string' ? value.toLowerCase() : value.fullName.toLowerCase();

    return this.FORM20_INS_MGR.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchValue) ||
        user.title.toLowerCase().includes(searchValue)
    );
  }

  private _filterDIR(value: string | ApprovalUser | null): ApprovalUser[] {
    if (!value) return this.FORM20_BDG_DIR;
    const searchValue =
      typeof value === 'string' ? value.toLowerCase() : value.fullName.toLowerCase();

    return this.FORM20_BDG_DIR.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchValue) ||
        user.title.toLowerCase().includes(searchValue)
    );
  }

  private _filterPRO(value: string | ApprovalUser | null): ApprovalUser[] {
    if (!value) return this.FORM20_PRO;
    const searchValue =
      typeof value === 'string' ? value.toLowerCase() : value.fullName.toLowerCase();
    return this.FORM20_PRO.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchValue) ||
        user.title.toLowerCase().includes(searchValue)
    );
  }

  private _filterLAM(value: string | ApprovalUser | null): ApprovalUser[] {
    if (!value) return this.FORM20_LAM;
    const searchValue =
      typeof value === 'string' ? value.toLowerCase() : value.fullName.toLowerCase();
    return this.FORM20_LAM.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchValue) ||
        user.title.toLowerCase().includes(searchValue)
    );
  }

  private _filterFIN_DIR(value: string | ApprovalUser | null): ApprovalUser[] {
    if (!value) return this.FORM20_FIN_DIR;
    const searchValue =
      typeof value === 'string' ? value.toLowerCase() : value.fullName.toLowerCase();
    return this.FORM20_FIN_DIR.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchValue) ||
        user.title.toLowerCase().includes(searchValue)
    );
  }

  private _filterRISK_OPP(value: string | ApprovalUser | null): ApprovalUser[] {
    if (!value) return this.FORM20_RISK_OPP;
    const searchValue =
      typeof value === 'string' ? value.toLowerCase() : value.fullName.toLowerCase();
    return this.FORM20_RISK_OPP.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchValue) ||
        user.title.toLowerCase().includes(searchValue)
    );
  }

  private _filterCOM_DIR(value: string | ApprovalUser | null): ApprovalUser[] {
    if (!value) return this.FORM20_COM_DIR;
    const searchValue =
      typeof value === 'string' ? value.toLowerCase() : value.fullName.toLowerCase();
    return this.FORM20_COM_DIR.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchValue) ||
        user.title.toLowerCase().includes(searchValue)
    );
  }

  private _filterHSEQ(value: string | ApprovalUser | null): ApprovalUser[] {
    if (!value) return this.FORM20_HSEQ;
    const searchValue =
      typeof value === 'string' ? value.toLowerCase() : value.fullName.toLowerCase();
    return this.FORM20_HSEQ.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchValue) ||
        user.title.toLowerCase().includes(searchValue)
    );
  }

  private _filterGEN_COUN(value: string | ApprovalUser | null): ApprovalUser[] {
    if (!value) return this.FORM20_GEN_COUN;
    const searchValue =
      typeof value === 'string' ? value.toLowerCase() : value.fullName.toLowerCase();
    return this.FORM20_GEN_COUN.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchValue) ||
        user.title.toLowerCase().includes(searchValue)
    );
  }

  selectChief(event: MatAutocompleteSelectedEvent): void {
    const selectedUser = event.option.value as ApprovalUser;

    if (!this.selectedCE.some((user) => user.employeeNo === selectedUser.employeeNo)) {
      this.selectedCE.push(selectedUser); // Update form control with array of employee numbers

      const currentValue = this.selectedCE.map((user) => user.employeeNo);

      this.formGroupDirective.form.get('Distribution.ChiefExecutive')?.setValue(currentValue);
    }

    this.ceSearchCtrl.setValue('');
  }

  selectED(event: MatAutocompleteSelectedEvent): void {
    const selectedUser = event.option.value as ApprovalUser;

    if (!this.selectedED.some((user) => user.employeeNo === selectedUser.employeeNo)) {
      this.selectedED.push(selectedUser); // Update form control with array of employee numbers

      const currentValue = this.selectedED.map((user) => user.employeeNo);

      this.formGroupDirective.form.get('Distribution.ExecutiveDirector')?.setValue(currentValue);
    }

    this.edSearchCtrl.setValue('');
  }

  selectBDGDCM(event: MatAutocompleteSelectedEvent): void {
    const selectedUser = event.option.value as ApprovalUser;
    if (!this.selectedBDGDCM.some((user) => user.employeeNo === selectedUser.employeeNo)) {
      this.selectedBDGDCM.push(selectedUser); // Update form control with array of employee numbers

      const currentValue = this.selectedBDGDCM.map((user) => user.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.DivisionCommercialManager')
        ?.setValue(currentValue);
    }
    this.bdgDcmSearchCtrl.setValue('');
  }

  selectINS_MGR(event: MatAutocompleteSelectedEvent): void {
    const selectedUser = event.option.value as ApprovalUser;
    if (!this.selectedINS_MGR.some((user) => user.employeeNo === selectedUser.employeeNo)) {
      this.selectedINS_MGR.push(selectedUser); // Update form control with array of employee numbers

      const currentValue = this.selectedINS_MGR.map((user) => user.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.InsuranceManager')
        ?.setValue(currentValue);
    }
    this.insMgrSearchCtrl.setValue('');
  }

  selectDIR(event: MatAutocompleteSelectedEvent): void {
    const selectedUser = event.option.value as ApprovalUser;
    if (!this.selectedDIR.some((user) => user.employeeNo === selectedUser.employeeNo)) {
      this.selectedDIR.push(selectedUser); // Update form control with array of employee numbers

      const currentValue = this.selectedDIR.map((user) => user.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.Director')
        ?.setValue(currentValue);
    }
    this.dirSearchCtrl.setValue('');
  }

  selectLAM(event: MatAutocompleteSelectedEvent): void {
    const selectedUser = event.option.value as ApprovalUser;
    if (!this.selectedLAM.some((user) => user.employeeNo === selectedUser.employeeNo)) {
      this.selectedLAM.push(selectedUser); // Update form control with array of employee numbers
      const currentValue = this.selectedLAM.map((user) => user.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.HeadofLambeth')
        ?.setValue(currentValue);
    }
    this.lamSearchCtrl.setValue('');
  }

  selectFIN_DIR(event: MatAutocompleteSelectedEvent): void {
    const selectedUser = event.option.value as ApprovalUser;
    if (!this.selectedFIN_DIR.some((user) => user.employeeNo === selectedUser.employeeNo)) {
      this.selectedFIN_DIR.push(selectedUser);
      const currentValue = this.selectedFIN_DIR.map((user) => user.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.FinanceDirector')
        ?.setValue(currentValue);
    }
    this.finDirSearchCtrl.setValue('');
  }

  removeChief(user: ApprovalUser): void {
    const index = this.selectedCE.indexOf(user);

    if (index >= 0) {
      this.selectedCE.splice(index, 1); // Update form control with remaining employee numbers

      const currentValue = this.selectedCE.map((u) => u.employeeNo);

      this.formGroupDirective.form

        .get('Distribution.ChiefExecutive')

        ?.setValue(currentValue.length ? currentValue : null);
    }
  }

  removeED(user: ApprovalUser): void {
    const index = this.selectedED.indexOf(user);

    if (index >= 0) {
      this.selectedED.splice(index, 1); // Update form control with remaining employee numbers

      const currentValue = this.selectedED.map((u) => u.employeeNo);

      this.formGroupDirective.form

        .get('Distribution.ExecutiveDirector')

        ?.setValue(currentValue.length ? currentValue : null);
    }
  }

  removeBDGDCM(user: ApprovalUser): void {
    const index = this.selectedBDGDCM.indexOf(user);

    if (index >= 0) {
      this.selectedBDGDCM.splice(index, 1); // Update form control with remaining employee numbers
      const currentValue = this.selectedBDGDCM.map((u) => u.employeeNo);
      this.formGroupDirective.form

        .get('Distribution.DivisionCommercialManager')
        ?.setValue(currentValue.length ? currentValue : null);
    }
  }

  removeINS_MGR(user: ApprovalUser): void {
    const index = this.selectedINS_MGR.indexOf(user);
    if (index >= 0) {
      this.selectedINS_MGR.splice(index, 1); // Update form control with remaining employee numbers
      const currentValue = this.selectedINS_MGR.map((u) => u.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.InsuranceManager')
        ?.setValue(currentValue.length ? currentValue : null);
    }
  }

  removeDIR(user: ApprovalUser): void {
    const index = this.selectedDIR.indexOf(user);
    if (index >= 0) {
      this.selectedDIR.splice(index, 1); // Update form control with remaining employee numbers
      const currentValue = this.selectedDIR.map((u) => u.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.Director')
        ?.setValue(currentValue.length ? currentValue : null);
    }
  }

  removeLAM(user: ApprovalUser): void {
    const index = this.selectedLAM.indexOf(user);
    if (index >= 0) {
      this.selectedLAM.splice(index, 1); // Update form control with remaining employee numbers
      const currentValue = this.selectedLAM.map((u) => u.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.HeadofLambeth')
        ?.setValue(currentValue.length ? currentValue : null);
    }
  }

  removeFIN_DIR(user: ApprovalUser): void {
    const index = this.selectedFIN_DIR.indexOf(user);
    if (index >= 0) {
      this.selectedFIN_DIR.splice(index, 1);
      const currentValue = this.selectedFIN_DIR.map((u) => u.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.FinanceDirector')
        ?.setValue(currentValue.length ? currentValue : null);
    }
  }

  selectPRO(event: MatAutocompleteSelectedEvent): void {
    const selectedUser = event.option.value as ApprovalUser;
    if (!this.selectedPRO.some((user) => user.employeeNo === selectedUser.employeeNo)) {
      this.selectedPRO.push(selectedUser);
      const currentValue = this.selectedPRO.map((user) => user.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.HeadOfProcurement')
        ?.setValue(currentValue);
    }
    this.proSearchCtrl.setValue('');
  }

  removePRO(user: ApprovalUser): void {
    const index = this.selectedPRO.indexOf(user);
    if (index >= 0) {
      this.selectedPRO.splice(index, 1);
      const currentValue = this.selectedPRO.map((u) => u.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.HeadOfProcurement')
        ?.setValue(currentValue.length ? currentValue : null);
    }
  }

  selectRISK_OPP(event: MatAutocompleteSelectedEvent): void {
    const selectedUser = event.option.value as ApprovalUser;
    if (!this.selectedRISK_OPP.some((user) => user.employeeNo === selectedUser.employeeNo)) {
      this.selectedRISK_OPP.push(selectedUser);
      const currentValue = this.selectedRISK_OPP.map((user) => user.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.RiskOpportunityManager')
        ?.setValue(currentValue);
    }
    this.riskOppSearchCtrl.setValue('');
  }

  selectCOM_DIR(event: MatAutocompleteSelectedEvent): void {
    const selectedUser = event.option.value as ApprovalUser;
    if (!this.selectedCOM_DIR.some((user) => user.employeeNo === selectedUser.employeeNo)) {
      this.selectedCOM_DIR.push(selectedUser);
      const currentValue = this.selectedCOM_DIR.map((user) => user.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.CommercialDirector')
        ?.setValue(currentValue);
    }
    this.comDirSearchCtrl.setValue('');
  }

  selectHSEQ(event: MatAutocompleteSelectedEvent): void {
    const selectedUser = event.option.value as ApprovalUser;
    if (!this.selectedHSEQ.some((user) => user.employeeNo === selectedUser.employeeNo)) {
      this.selectedHSEQ.push(selectedUser);
      const currentValue = this.selectedHSEQ.map((user) => user.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.HSEQ')
        ?.setValue(currentValue);
    }
    this.hseqSearchCtrl.setValue('');
  }

  selectGEN_COUN(event: MatAutocompleteSelectedEvent): void {
    const selectedUser = event.option.value as ApprovalUser;
    if (!this.selectedGEN_COUN.some((user) => user.employeeNo === selectedUser.employeeNo)) {
      this.selectedGEN_COUN.push(selectedUser);
      const currentValue = this.selectedGEN_COUN.map((user) => user.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.GeneralCounselLegal')
        ?.setValue(currentValue);
    }
    this.genCounSearchCtrl.setValue('');
  }

  removeRISK_OPP(user: ApprovalUser): void {
    const index = this.selectedRISK_OPP.indexOf(user);
    if (index >= 0) {
      this.selectedRISK_OPP.splice(index, 1);
      const currentValue = this.selectedRISK_OPP.map((u) => u.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.RiskOpportunityManager')
        ?.setValue(currentValue.length ? currentValue : null);
    }
  }

  removeCOM_DIR(user: ApprovalUser): void {
    const index = this.selectedCOM_DIR.indexOf(user);
    if (index >= 0) {
      this.selectedCOM_DIR.splice(index, 1);
      const currentValue = this.selectedCOM_DIR.map((u) => u.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.CommercialDirector')
        ?.setValue(currentValue.length ? currentValue : null);
    }
  }

  removeHSEQ(user: ApprovalUser): void {
    const index = this.selectedHSEQ.indexOf(user);
    if (index >= 0) {
      this.selectedHSEQ.splice(index, 1);
      const currentValue = this.selectedHSEQ.map((u) => u.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.HSEQ')
        ?.setValue(currentValue.length ? currentValue : null);
    }
  }

  removeGEN_COUN(user: ApprovalUser): void {
    const index = this.selectedGEN_COUN.indexOf(user);
    if (index >= 0) {
      this.selectedGEN_COUN.splice(index, 1);
      const currentValue = this.selectedGEN_COUN.map((u) => u.employeeNo);
      this.formGroupDirective.form
        .get('Distribution.GeneralCounselLegal')
        ?.setValue(currentValue.length ? currentValue : null);
    }
  }

  displayFn = (user: ApprovalUser): string => {
    return user ? user.fullName : '';
  };
  
    selectBidManager(event: MatAutocompleteSelectedEvent): void {
      const selectedUser = event.option.value as ApprovalUser;
      // Add to selected list if not already present
      if (!this.selectedBidManagers.some((user) => user.employeeNo === selectedUser.employeeNo)) {
        this.selectedBidManagers.push(selectedUser);
      }
      // Save all employee numbers to the form
      const employeeNumbers = this.selectedBidManagers.map(u => u.employeeNo);
      console.log('Setting distributionBidMgr:', employeeNumbers);
      this.formGroupDirective.form.get('Distribution.distributionBidMgr')?.setValue(employeeNumbers);
      console.log('Form value after set:', this.formGroupDirective.form.get('Distribution.distributionBidMgr')?.value);
      // Clear the search input and dropdown
      this.bidManagerSearchCtrl.setValue('', { emitEvent: false });
      this.FORM20_BID_MGR = [];
      this.cdr.markForCheck();
    }

    removeBidManager(user: ApprovalUser): void {
      const index = this.selectedBidManagers.indexOf(user);
      if (index >= 0) {
        this.selectedBidManagers.splice(index, 1);
        const currentValue = this.selectedBidManagers.map((u) => u.employeeNo);
        this.formGroupDirective.form.get('Distribution.distributionBidMgr')?.setValue(currentValue.length ? currentValue : null);
      }
    }
}
