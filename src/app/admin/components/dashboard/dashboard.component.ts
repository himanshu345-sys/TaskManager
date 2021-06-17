import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit 
{
  Designation:string = "";
  Username:string = "";
  NoOfTeamMembers: number = 0;
  TotalCostOfAllProjects: number = 0;
  PendingTasks: number = 0;
  UpComingProjects: number = 0;
  ProjectCost: number = 0;
  CurrentExpenditure: number = 0;
  AvailableFunds: number = 0;

  selectedProject:string ="";

  ToDay: Date= new Date();
  Clients:string[] = [];
  Projects:string[] = [];
  Years:number[] = [];
  TeamMembersSummary: any = [];
  TeamMembers: any = [];

  constructor(private dashboardService: DashboardService)
  {

  }


  ngOnInit(): void 
  {
    this.Designation = 'Team Leader';
    this.Username = 'Scott Smith';
    this.NoOfTeamMembers = 67;
    this.TotalCostOfAllProjects = 240;
    this.PendingTasks = 15;
    this.UpComingProjects = 0.2;
    this.ProjectCost = 2113507;
    this.CurrentExpenditure = 96788;
    this.AvailableFunds = 52536;


    this.Clients = [
      "ABC Infotech Ltd", "DEF Software Solutions","GHI Industries"
    ];

    this.Projects =[
      "Project A","Project B","Project C","Project D"
    ];
    this.selectedProject = this.Projects[0];

    for(var i = 2019;i >= 2010;i--){
      this.Years.push(i);
    }

    this.TeamMembersSummary = this.dashboardService.getTeamMembersSummary();

    this.TeamMembers = [
      {Region:"East",Members:[
        {ID:1,Name:"Ford",Status:"Available"},
        {ID:2,Name:"Miller",Status:"Available"},
        {ID:3,Name:"Jones",Status:"Busy"},
        {ID:4,Name:"James",Status:"Busy"}
      ]
      },
      {Region:"South",Members:[
        {ID:1,Name:"Jones",Status:"Busy"},
        {ID:2,Name:"Miller",Status:"Available"},
        {ID:3,Name:"Ford",Status:"Busy"},
        {ID:4,Name:"James",Status:"Available"}
      ]
      },
      {Region:"West",Members:[
        {ID:1,Name:"Jones",Status:"Available"},
        {ID:2,Name:"Miller",Status:"Busy"},
        {ID:3,Name:"James",Status:"Available"},
        {ID:4,Name:"Ford",Status:"Busy"}
      ]
      },
      {Region:"East",Members:[
        {ID:1,Name:"Ford",Status:"Available"},
        {ID:2,Name:"Miller",Status:"Available"},
        {ID:3,Name:"Jones",Status:"Busy"},
        {ID:4,Name:"James",Status:"Busy"}
      ]
      }
    ];
  }
  onProjectChange($event) {

    this.selectedProject = $event.target.innerHTML;
    if ($event.target.innerHTML.trim() == 'Project A') {
      this.ProjectCost = 2113507;
      this.CurrentExpenditure = 96788;
      this.AvailableFunds = 52436;
    } else if ($event.target.innerHTML.trim() == 'Project B') {
      this.ProjectCost = 88923;
      this.CurrentExpenditure = 22450;
      this.AvailableFunds = 2640;
    } else if ($event.target.innerHTML.trim() == 'Project C') {
      this.ProjectCost = 662183;
      this.CurrentExpenditure = 7721;
      this.AvailableFunds = 9811;
    } else if ($event.target.innerHTML.trim() == 'Project D') {
      this.ProjectCost = 928431;
      this.CurrentExpenditure = 562;
      this.AvailableFunds = 883;
    }
  }

  

}
