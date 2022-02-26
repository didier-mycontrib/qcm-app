import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminQcmResultsComponent } from './admin-qcm-results/admin-qcm-results.component';
import { AdminQcmComponent } from './admin-qcm/admin-qcm.component';
import { CanActivateAdminRouteGuard } from './common/gard/can-activate-route-guard';
import { ExternalLinksComponent } from './footer/external-links/external-links.component';
import { MentionsLegalesComponent } from './footer/mentions-legales/mentions-legales.component';
import { LoginComponent } from './login/login.component';
import { OptionQcmComponent } from './qcm/option-qcm/option-qcm.component';
import { PerformQcmComponent } from './qcm/perform-qcm/perform-qcm.component';
import { QcmComponent } from './qcm/qcm.component';
import { ResultQcmComponent } from './qcm/result-qcm/result-qcm.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
    {path: 'ngr-qcm', component: QcmComponent ,
    children: [
      { path: 'options/:specif', component: OptionQcmComponent },
      { path: 'perform', component: PerformQcmComponent },
      { path: 'results', component: ResultQcmComponent },
      { path: '', redirectTo: 'options/default', pathMatch: 'prefix'}
    ]
  },
  { path: 'ngr-welcome', component: WelcomeComponent },
  { path: 'ngr-login', component: LoginComponent } ,
  { path: 'ngr-admin-qcm', component: AdminQcmComponent , canActivate: [CanActivateAdminRouteGuard]  },
  { path: 'ngr-admin-qcm-results', component: AdminQcmResultsComponent , canActivate: [CanActivateAdminRouteGuard]  },
  { path: 'ngr-links', component: ExternalLinksComponent } ,
  { path: 'ngr-mentions-legales', component: MentionsLegalesComponent  },
  { path: '', redirectTo: '/ngr-welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
