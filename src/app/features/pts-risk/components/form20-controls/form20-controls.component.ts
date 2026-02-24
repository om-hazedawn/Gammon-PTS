import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatDialog } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Form20ListService } from "../../../../core/services/Form20/form20list.service";
import { Form20DetailsService } from "../../../../core/services/Form20/form20details.service";
import { TenderListApiService } from "../../../../core/services/tender-list-api.service";
import { Form20ListDialogComponent } from "../form20-list-dialog/form20-list-dialog.component";

@Component({
  selector: 'app-form20-controls',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './form20-controls.component.html',
  styleUrls: ['./form20-controls.component.sass']
})
export class Form20ControlsComponent implements OnInit, OnDestroy {
  constructor(
    private form20Service: Form20ListService,
    private form20DetailService: Form20DetailsService,
    private tenderService: TenderListApiService,
    private dialog: MatDialog    
  ) {}

  @Input() riskTenderId: number | null = null;
  @Input() form20Id: number = 0;
  tenderNo: string = '';
  inProgress: boolean = false;
  
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Only fetch if form20Id is valid (> 0)
    if (this.form20Id && this.form20Id > 0) {
      this.reloadForm20();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  removeForm20() {
    if (this.riskTenderId == null) return;
    this.form20DetailService.updateForm20Id(this.riskTenderId , -1)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.form20Id = -1;
        this.tenderNo = "";
        this.form20Service.clearForm20ListCache();
      });
  }

  select() {
    if (!this.inProgress) {
      this.inProgress = true;
      this.dialog.open(Form20ListDialogComponent, {
        minWidth: "50vw"
      }).afterClosed()
        .subscribe(form => {
          this.inProgress = false;
          if (form) {
            if (this.riskTenderId != null) {
              this.form20DetailService.updateForm20Id(this.riskTenderId, form.id)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                  this.form20Id = form.id;
                  this.tenderNo = form.tenderNo;
                  this.form20Service.clearForm20ListCache();
                })
            }
            
          }
        });
    }
  }

  add() {
    if (!this.inProgress) {
      this.inProgress = true;
      if (this.riskTenderId == null) return;
      this.tenderService.getTenderById(this.riskTenderId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(response => {
          const tenderItem = response.data;

          this.form20DetailService.saveForm20(tenderItem as any)
            .pipe(takeUntil(this.destroy$))
            .subscribe((form20Details) => {
              const id = (form20Details as any).id;
              if (this.riskTenderId != null) {
                this.form20DetailService.updateForm20Id(this.riskTenderId, id)
                  .pipe(takeUntil(this.destroy$))
                  .subscribe(() => {
                    this.form20Id = id;
                    this.form20OnClick();
                    this.reloadForm20();
                    this.form20Service.clearForm20ListCache();
                  });
              }
            });
        });
    }
  }

  reloadForm20() {
    if (this.form20Id && this.form20Id > 0) {
      this.form20Service.getPagedForm20List({filteringItem: {}, pageSize: -1, page: 1})
        .pipe(takeUntil(this.destroy$))
        .subscribe(list => {
          let result = list.items.filter(i => i.id == this.form20Id);
          if (result.length > 0) {
            this.tenderNo = result[0].tenderNo
          } else {
            this.tenderNo = "Not Found";
          }
        }, error => {
          console.error(error);
          this.tenderNo = "Error";
        });
    }
  }

  form20OnClick() {
    window.open("../form20List?id=" + this.form20Id, "_blank");
  }
}