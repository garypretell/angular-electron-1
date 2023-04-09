import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

import { CustomRouterReuseStrategy } from '../../custom-router-reuse.strategy';
import { FilterChipListComponent } from '../../shared/components/filter-chip-list/filter-chip-list.component';
import { ManagementObservableComponent } from '../../shared/components/management-observable/management-observable.component';
import { MessageErrorComponent } from '../../shared/components/message-error/message-error.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { AutoFocusDirective } from '../../shared/directives/auto-focus.directive';
import { TabBarModule } from '../tab-bar/tab-bar.module';

import { MatIconModule } from '@angular/material/icon';
import { AngularSvgIconModule } from 'angular-svg-icon';
import NotFoundComponent from '../../modules/not-found/not-found.component';
import { ModalButtonComponent } from '../../shared/components/modal-button/modal-button.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DynamicPipe } from '../../shared/pipes/dynamic-pipe.pipe';
import { StatusPipe } from '../../shared/pipes/status.pipe';
import { PathPipe } from '../../shared/pipes/path.pipe';


@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    UserCreateComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    ManagementObservableComponent,
    TabBarModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    FilterChipListComponent,
    MessageErrorComponent,
    TableComponent,
    A11yModule,
    AutoFocusDirective,
    HttpClientJsonpModule,
    HttpClientModule, AngularSvgIconModule.forRoot(),
    NotFoundComponent,
    ModalButtonComponent,
    MatIconModule,
    StatusPipe,
    PathPipe,
    DecimalPipe
  ],
  providers: [
    CustomRouterReuseStrategy,
    DynamicPipe,
    StatusPipe,
    DatePipe,
    PathPipe,
    DecimalPipe
  ]
})
export class UserModule { }
