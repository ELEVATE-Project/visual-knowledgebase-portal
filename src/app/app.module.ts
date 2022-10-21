import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import {  MatToolbarModule  } from '@angular/material/toolbar';
import { HeaderComponent } from './components/shared/header/header.component';
import {  MatIconModule  } from '@angular/material/icon';
import {  MatCardModule  } from '@angular/material/card';
import {  MatMenuModule  } from '@angular/material/menu';
import {  MatInputModule  } from '@angular/material/input';
import {  MatFormFieldModule  } from '@angular/material/form-field';
import {  MatStepperModule  } from '@angular/material/stepper';
import {  MatTreeModule  } from '@angular/material/tree';
import {  MatDialogModule  } from '@angular/material/dialog';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BannerComponent } from './components/shared/banner/banner.component';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/shared/card/card.component';
import { BlogComponent } from './components/blog/blog.component';
import { SearchComponent } from './components/shared/search/search.component';
import { LoginComponent } from './components/login/login/login.component';

import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ApiserviceService } from './components/service/apiservice.service';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import {MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    HomeComponent,
    CardComponent,
    BlogComponent,
    SearchComponent,
    LoginComponent,
    SearchFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    CKEditorModule,
    NgxPaginationModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    MatTreeModule,
    MatDialogModule,
    CKEditorModule,
    CoreModule,
    MatButtonModule
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
