import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportedPageRoutingModule } from './reported-routing.module';

import { ReportedPage } from './reported.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportedPageRoutingModule
  ],
  declarations: [ReportedPage]
})
export class ReportedPageModule {}
