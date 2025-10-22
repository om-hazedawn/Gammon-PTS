import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.sass'],
})
export class ConfirmDialog implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}

    ngOnInit() {
        if (!this.data || !this.data.ok) {
            this.data.ok = 'Ok';
        }
        if (!this.data || !this.data.cancel) {
            this.data.cancel = 'Cancel';
        }
    }

}

export interface ConfirmDialogData {
    title: string;
    message: string;
    ok: string;
    cancel: string;
}
