import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule} from '@angular/router';
import { QcmComponent } from './qcm/qcm.component';
import { AdminQcmComponent } from './admin-qcm/admin-qcm.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsUtilModule } from 'src/bs-util/bs-util.module';
import { GenericModule } from 'src/generic/generic.module';
import { HttpClientModule } from '@angular/common/http';
import { PerformQcmComponent } from './qcm/perform-qcm/perform-qcm.component';
import { OptionQcmComponent } from './qcm/option-qcm/option-qcm.component';
import { ResultQcmComponent } from './qcm/result-qcm/result-qcm.component';
import { QcmEditorComponent } from './admin-qcm/qcm-editor/qcm-editor.component';
import { AdminQcmResultsComponent } from './admin-qcm-results/admin-qcm-results.component';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ExternalLinksComponent } from './footer/external-links/external-links.component';
import { MentionsLegalesComponent } from './footer/mentions-legales/mentions-legales.component';

@NgModule({
  declarations: [
    AppComponent ,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    QcmComponent, 
    AdminQcmComponent, 
    PerformQcmComponent, 
    OptionQcmComponent, 
    ResultQcmComponent,
    QcmEditorComponent, 
    AdminQcmResultsComponent, WelcomeComponent ,
    ExternalLinksComponent,
    MentionsLegalesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule ,
    TabsModule.forRoot(),
    BsUtilModule,
    GenericModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
