import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./students/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./reset/reset.module').then( m => m.ResetPageModule)
  },
  {
    path: 'pending',
    loadChildren: () => import('./Admin/pending/pending.module').then( m => m.PendingPageModule)
  },
  {
    path: 'reported',
    loadChildren: () => import('./Admin/reported/reported.module').then( m => m.ReportedPageModule)
  },
  {
    path: 'completed',
    loadChildren: () => import('./Admin/completed/completed.module').then( m => m.CompletedPageModule)
  },
  {
    path: 'dashboard-admin',
    loadChildren: () => import('./Admin/dashboard-admin/dashboard-admin.module').then( m => m.DashboardAdminPageModule)
  },
  {
    path: 'my-reports',
    loadChildren: () => import('./students/my-reports/my-reports.module').then( m => m.MyReportsPageModule)
  },
  {
    path: 'attended',
    loadChildren: () => import('./students/attended/attended.module').then( m => m.AttendedPageModule)
  },
  {
    path: 'in-progress',
    loadChildren: () => import('./students/in-progress/in-progress.module').then( m => m.InProgressPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
