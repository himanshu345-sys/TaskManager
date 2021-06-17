import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EmployeeModule } from './employee/employee.module';
import { LoginComponent } from './components/login/login.component';
import { AlertDirective } from './alert.directive';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { JwtUnAuthorizedInterceptorService } from './jwt-un-authorized-interceptor.service';
import { SignUpComponent } from './components/sign-up/sign-up.component';





@NgModule({
  declarations: 
  [ AppComponent, 
    LoginComponent, 
    SignUpComponent, 
    AlertDirective
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AdminModule,
    EmployeeModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot( {
      config: {
        tokenGetter: () => {
          return (sessionStorage.getItem("currentUser")? 
          JSON.parse(sessionStorage.getItem("currentUser")!).token : null)
        }
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtUnAuthorizedInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


