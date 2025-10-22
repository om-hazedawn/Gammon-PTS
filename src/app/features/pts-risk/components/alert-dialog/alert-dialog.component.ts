import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-alert-dialog',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    templateUrl: './alert-dialog.component.html',
    styleUrls: ['./alert-dialog.component.sass'],
})
export class AlertDialog implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: AlertData) {}

    ngOnInit() {}

}

export interface AlertData {
    title: string;
    message: string;
}
