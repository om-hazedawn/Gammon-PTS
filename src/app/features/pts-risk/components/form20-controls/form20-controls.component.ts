import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatDialog } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
export class Form20ControlsComponent implements OnInit {
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

  ngOnInit(): void {
    this.reloadForm20();
  }

  removeForm20() {
    if (this.riskTenderId == null) return;
    this.form20DetailService.updateForm20Id(this.riskTenderId , -1)
      .subscribe(() => {
        this.form20Id = -1;
        this.tenderNo = "";
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
                .subscribe(() => {
                  this.form20Id = form.id;
                  this.tenderNo = form.tenderNo;
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
        .subscribe(response => {
          const tenderItem = response.data;

          this.form20DetailService.saveForm20(tenderItem as any)
            .subscribe((form20Details) => {
              const id = (form20Details as any).id;
              if (this.riskTenderId != null) {
                this.form20DetailService.updateForm20Id(this.riskTenderId, id)
                  .subscribe(() => {
                    this.form20Id = id;
                    this.form20OnClick();
                    this.reloadForm20();
                  });
              }
            });
        });
    }
  }

  reloadForm20() {
    if (this.form20Id && this.form20Id > 0) {
      this.form20Service.getForm20List()
        .subscribe(list => {
          let result = list.filter(i => i.id == this.form20Id);
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