import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DialogService } from 'primeng/dynamicdialog';

import { ParcelsRoutingModule } from './parcels-routing.module';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { ParcelsComponent } from './pages/index/parcels.component';
import { ParcelsService } from './parcels.service';

@NgModule({
  declarations: [AddModalComponent, ParcelsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ParcelsRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    CalendarModule,
    TableModule,
  ],
  providers: [ParcelsService, DialogService],
})
export class ParcelsModule {}
