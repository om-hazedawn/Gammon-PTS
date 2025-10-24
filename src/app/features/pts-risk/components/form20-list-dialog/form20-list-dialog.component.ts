import { Component, Inject, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith, switchMap } from "rxjs";
import { Form20ListService } from "../../../../core/services/Form20/form20list.service";

@Component({
  selector: 'app-form20-list-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatTableModule, MatFormFieldModule, MatInputModule],
  templateUrl: './form20-list-dialog.component.html',
  styleUrls: ['./form20-list-dialog.component.sass']
})
export class Form20ListDialogComponent implements OnInit {
  constructor(
    private form20Service: Form20ListService,
    private dialogRef: MatDialogRef<Form20ListDialogComponent>
  ) {}

  control: FormControl = new FormControl('', {});
  displayedColumns: string [] = [
    "tenderNo",
    "title",
  ];

  filteredOptions: Observable<any[]> = new Observable<any[]>();
  // filteredOptions: any[] = [];

  tableData: MatTableDataSource<any> = new MatTableDataSource<any>;

  ngOnInit(): void {
    this.control.valueChanges.pipe(
      startWith(''),
      switchMap((val: string) => this.form20Service.getForm20List()
        .pipe(map((list: any[]) => this._filter(val, list as any[]))))
    ).subscribe((opts: any[]) => {
      this.tableData.data = opts;
    })

  }

  _filter(val: string, list: any[]): any[] {
    if (val) {
        return list.filter(itm =>
            val.trim().split(' ').every(aitm => {
                return (
                    itm.tenderNo.toUpperCase().indexOf(aitm.toUpperCase()) >= 0 ||
                    itm.title.toLowerCase().indexOf(aitm.toLowerCase()) >= 0
                );
            })
        );
    } else {
        return list;
    }
  }

  select(form: any) {
    this.dialogRef.close(form)
  }  
}