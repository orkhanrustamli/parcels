import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { ParcelsService } from '../../parcels.service';
import { CreateParcelBody } from '../../types';

@Component({
  selector: 'app-add-modal',
  providers: [],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss',
})
export class AddModalComponent {
  parcelForm = new FormGroup({
    sku: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    town: new FormControl('', [Validators.required]),
    streetAddress: new FormControl('', [Validators.required]),
    deliveryDate: new FormControl('', [Validators.required]),
  });

  constructor(
    private parcelsService: ParcelsService,
    private MessageService: MessageService,
    private dialogRef: DynamicDialogRef
  ) {}

  onSubmit() {
    this.parcelsService
      .createParcel(this.parcelForm.value as CreateParcelBody)
      .subscribe({
        next: (value) => {
          this.dialogRef.close(value);
          this.MessageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Parcel was created successfully',
          });
        },
        error: (error) => {
          let messages = error.error?.message || [];
          if (messages && !Array.isArray(messages)) {
            messages = [messages];
          }

          for (const message of messages) {
            this.MessageService.add({
              severity: 'error',
              summary: 'Failed creating a parcel',
              detail: message,
            });
          }
        },
      });
  }
}
