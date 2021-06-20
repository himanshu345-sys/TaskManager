import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { slideLeftOrRightAnimation } from './animations/my-animations';
import { LoginService } from './services/login.service';
import { RouterLoggerService } from './services/router-logger.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[slideLeftOrRightAnimation]
})
export class AppComponent {
  constructor(public loginService : LoginService,
    private routerLoggerService:RouterLoggerService,
    private router:Router)
  {
  }

  ngOnInit()
  {
    this.loginService.detectIfAlreadyLoggedIn();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
      {
        let userName = (this.loginService.currentUserName)? this.loginService.currentUserName : "anonymous";
        
        let logMsg = new Date().toLocaleString() + ": " + userName + " navigates to " + event.url;

        this.routerLoggerService.log(logMsg).subscribe();
      }
    });
  }

  onSearchClick()
  {
    console.log(this.loginService.currentUserName);
  }

  getState(outlet)
  {
    return outlet.isActivated?
    outlet.activatedRoute.snapshot.url[0].path && outlet.activatedRouteData["linkIndex"]:"none";
  }
}
