import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PrimengTableComponent } from './primeng-table/primeng-table.component';
import { ExcelSheetComponent } from './excel-sheet/excel-sheet.component';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthInterceptorService } from './auth-interceptor-service';
import { HeaderComponent } from './header/header.component';
import { ErrorPageComponent } from './error-page/error-page.component';
// import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthModule } from './auth/auth.module';
import { FlexSampleComponent } from './flex-sample/flex-sample.component';
import { BootstrapSampleComponent } from './bootstrap-sample/bootstrap-sample.component';
import { FormComponent } from './form/form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {RippleModule} from 'primeng/ripple';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableEditComponent } from './table-edit/table-edit.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TableComponent } from './table/table.component';
import { TableFrozenComponent } from './table-frozen/table-frozen.component';
import { ReversePipe } from './reverse.pipe';

export function rootLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/','.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PrimengTableComponent,
    ExcelSheetComponent,
    HeaderComponent,
    // AuthComponent,
    ErrorPageComponent,
    HomeComponent,
    FlexSampleComponent,
    BootstrapSampleComponent,
    FormComponent,
    TableEditComponent,
    TableComponent,
    TableFrozenComponent,
    ReversePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: rootLoaderFactory,
          deps: [HttpClient]
      }
    }),
    ScrollingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ProgressBarModule,
    ToggleButtonModule,
    ToolbarModule,
    FileUploadModule,
    RatingModule,
    RippleModule,
    RadioButtonModule,
    InputNumberModule,
    InputTextareaModule,
    FontAwesomeModule,
  ],
  providers: [TranslateService, ConfirmationService, MessageService, HttpClient, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
