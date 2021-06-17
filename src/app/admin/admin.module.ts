import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DashboardService} from '../dashboard.service';

import { FormsModule } from '@angular/forms';

import { CheckBoxPrinterComponent } from './components/check-box-printer/check-box-printer.component';

import { PagingPipe } from '../pipes/paging.pipe';


import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { TeamSizeValidatorDirective } from '../directives/team-size-validator.directive';
import { ClientLocationStatusValidatorDirective } from '../directives/client-location-status-validator.directive';
import { UniqueProjectIdDirective } from '../directives/unique-project-id.directive';
import { FilterPipe } from '../pipes/filter.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    UniqueProjectIdDirective,
    ProjectComponent,
    ProjectDetailsComponent,
    CheckBoxPrinterComponent,
    FilterPipe, 
    PagingPipe
    ],
  imports: [CommonModule, FormsModule,AdminRoutingModule],
  exports:[DashboardComponent,MyProfileComponent,AboutComponent,ProjectsComponent,
    TeamSizeValidatorDirective,ClientLocationStatusValidatorDirective,UniqueProjectIdDirective,ProjectDetailsComponent],
  providers:[DashboardService]
})
export class AdminModule 
{

}
