import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportedPage } from './reported.page';

const routes: Routes = [
  {
    path: '',
    component: ReportedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportedPageRoutingModule {}
