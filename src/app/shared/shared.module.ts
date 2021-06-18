import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLocationStatusValidatorDirective } from '../directives/client-location-status-validator.directive';
import { TeamSizeValidatorDirective } from '../directives/team-size-validator.directive';
import { FilterPipe } from '../pipes/filter.pipe';
import { PagingPipe } from '../pipes/paging.pipe';
import { UniqueProjectIdDirective } from '../directives/unique-project-id.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentLoaderDirective } from '../directives/component-loader.directive';
import { SortPipe } from '../pipes/sort.pipe';



@NgModule({
  declarations: [
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    UniqueProjectIdDirective,
    ComponentLoaderDirective,
    FilterPipe,
    PagingPipe,
    SortPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    UniqueProjectIdDirective,
    ComponentLoaderDirective,
    FilterPipe,
    PagingPipe,
    SortPipe
  ]
})
export class SharedModule { }
