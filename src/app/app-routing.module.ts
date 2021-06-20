import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './admin/components/about/about.component';
import { CanDeactivateGuardService } from './guards/can-deactivate-guard.service';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';



const routes: Routes = [
  { 
    path: "", redirectTo: "login", pathMatch: "full" 
  },

  {
    path: "login", 
    component: LoginComponent,
    data:{linkIndex:2} 
  },

  {
    path:"signup",
    component: SignUpComponent,
    canDeactivate:[CanDeactivateGuardService],
    data:{linkIndex:3}
  },

  { 
    path: "about", 
    component: AboutComponent,
    data:{linkIndex:1} 
  },
  
  { 
    path: "admin", 
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule) 
  },

  { 
    path: "employee", 
    loadChildren: () => import("./employee/employee.module").then(m => m.EmployeeModule) 
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true, enableTracing:false})],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
