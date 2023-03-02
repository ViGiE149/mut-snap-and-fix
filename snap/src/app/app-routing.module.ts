import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
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
  },  {
    path: 'pending',
    loadChildren: () => import('./pending/pending.module').then( m => m.PendingPageModule)
  },
  {
    path: 'reported',
    loadChildren: () => import('./reported/reported.module').then( m => m.ReportedPageModule)
  },
  {
    path: 'completed',
    loadChildren: () => import('./completed/completed.module').then( m => m.CompletedPageModule)
  },
  {
    path: 'dashboard-admin',
    loadChildren: () => import('./dashboard-admin/dashboard-admin.module').then( m => m.DashboardAdminPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
