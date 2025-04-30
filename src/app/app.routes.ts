import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OptionQcmComponent } from './qcm/option-qcm/option-qcm.component';
import { PerformQcmComponent } from './qcm/perform-qcm/perform-qcm.component';
import { QcmComponent } from './qcm/qcm.component';
import { ResultQcmComponent } from './qcm/result-qcm/result-qcm.component';
import { AdminQcmComponent } from './admin-qcm/admin-qcm.component';
import { AdminQcmResultsComponent } from './admin-qcm-results/admin-qcm-results.component';
import { LoginOutComponent } from './login-out/login-out.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { authGuard } from './common/guard/auth.guard';
import { ImportExportQcmComponent } from './import-export-qcm/import-export-qcm.component';

export const routes: Routes = [
    { path: 'ngr-home', component: HomeComponent },
    { path: 'ngr-login-out', component: LoginOutComponent },
    { path: 'ngr-not-authorized', component: NotAuthorizedComponent },
    {path: 'ngr-qcm', component: QcmComponent ,
        children: [
          { path: 'options/:specif', component: OptionQcmComponent },
          { path: 'perform', component: PerformQcmComponent },
          { path: 'results', component: ResultQcmComponent },
          { path: '', redirectTo: 'options/default', pathMatch: 'prefix'}
        ]
    },
    { path: 'ngr-admin-qcm', component: AdminQcmComponent  , canActivate: [authGuard]  },
    { path: 'ngr-admin-qcm-results', component: AdminQcmResultsComponent , canActivate: [authGuard] },
    { path: 'ngr-import-export-qcm', component: ImportExportQcmComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/ngr-home', pathMatch: 'full'},
    { path: '**', redirectTo: '/ngr-home', pathMatch: 'full'}
];
