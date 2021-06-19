import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskPriority } from 'src/app/models/task-priority';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { TaskPriorityService } from 'src/app/services/task-priority.service';
import * as $ from "jquery";

@Component({
  selector: 'app-task-priorities',
  templateUrl: './task-priorities.component.html',
  styleUrls: ['./task-priorities.component.scss']
})
export class TaskPrioritiesComponent implements OnInit 
{
   //Objects for Holding Model Data
   taskpriorities: TaskPriority[] = [];
   showLoading: boolean = false;
 
   //Objects for Delete
   deleteTaskPriority: TaskPriority = new TaskPriority();
   editIndex: number = null;
   deleteIndex: number = null;
 
   //Properties for Searching
   searchBy: string = "taskPriorityName";
   searchText: string = "";
 
   //Properties for Paging
   currentPageIndex: number = 0;
   pages: any[] = [];
   pageSize: number = 7;
 
   //Reactive Forms
   newForm: FormGroup;
   editForm: FormGroup;
 
   //Autofocus TextBoxes
   @ViewChild("defaultTextBox_New") defaultTextBox_New: ElementRef;
   @ViewChild("defaultTextBox_Edit") defaultTextBox_Edit: ElementRef;
 
   // Sorting
   sortBy:string = "clientLocationName";
   sortOrder:string = "ASC";

  constructor(private taskPriorityService: TaskPriorityService, 
    private formBuilder: FormBuilder) 
    {

    }

  ngOnInit(): void 
  {
     //Get data from database
     this.taskPriorityService.getTaskPriority().subscribe(
      (response: TaskPriority[]) =>
      {
        this.taskpriorities = response;
        this.showLoading = false;
        this.calculateNoOfPages();
      }
    );

    //Create newForm
    this.newForm = this.formBuilder.group({
      taskPriorityID: this.formBuilder.control(null),
      taskPriorityName: this.formBuilder.control(null, [Validators.required])
    });

    //Create editForm
    this.editForm = this.formBuilder.group({
      taskPriorityID: this.formBuilder.control(null),
      taskPriorityName: this.formBuilder.control(null, [Validators.required])
    });
  }

  calculateNoOfPages()
  {
    //Get no. of Pages
    let filterPipe = new FilterPipe();
    var noOfPages = Math.ceil(filterPipe.transform(this.taskpriorities, this.searchBy, this.searchText)
    .length / this.pageSize);
    this.pages = [];

    //Generate pages
    for (let i = 0; i < noOfPages; i++)
    {
      this.pages.push({ pageIndex: i });
    }

    this.currentPageIndex = 0;
  }

  onPageIndexClicked(ind)
  {
    //Set currentPageIndex
    if (ind >= 0 && ind < this.pages.length)
    {
      this.currentPageIndex = ind;
    }
  }

  onNewClick(event)
  {
    //reset the newForm
    this.newForm.reset({ taskPriorityID: 0 });
    setTimeout(() =>
    {
      //Focus the TaskPriority textbox in newForm
      this.defaultTextBox_New.nativeElement.focus();
    }, 100);
  }

  onSaveClick()
  {
    if (this.newForm.valid)
    {
      //Invoke the REST-API call
      this.taskPriorityService.insertTaskPriority(this.newForm.value).subscribe((response) =>
      {
        //Add Response to Grid
        var p: TaskPriority = new TaskPriority();
        p.taskPriorityID = response.taskPriorityID;
        p.taskPriorityName = response.taskPriorityName;
        this.taskpriorities.push(p);

        //Reset the newForm
        this.newForm.reset();
        $("#newTaskPriorityFormCancel").trigger("click");
        this.calculateNoOfPages();

        this.calculateNoOfPages();
      }, (error) =>
        {
          console.log(error);
        });
    }
  }

  onEditClick(event, taskPriority: TaskPriority)
  {
    //Reset the editForm
    this.editForm.reset();
    setTimeout(() =>
    {
      //Set data into editForm
      this.editForm.patchValue(taskPriority);
      this.editIndex = this.taskpriorities.indexOf(taskPriority);

      //Focus the TaskPriority textbox in editForm
      this.defaultTextBox_Edit.nativeElement.focus();
    }, 100);
  }

  onUpdateClick()
  {
    if (this.editForm.valid)
    {
      //Invoke the REST-API call
      this.taskPriorityService.updateTaskPriority(this.editForm.value).subscribe((response: TaskPriority) =>
      {
        //Update the response in Grid
        this.taskpriorities[this.editIndex] = response;

        //Reset the editForm
        this.editForm.reset();
        $("#editTaskPriorityFormCancel").trigger("click");
      },
        (error) =>
        {
          console.log(error);
        });
    }
  }

  onDeleteClick(event, taskPriority: TaskPriority)
  {
    //Set data into deleteTaskPriority
    this.deleteTaskPriority.taskPriorityID = taskPriority.taskPriorityID;
    this.deleteTaskPriority.taskPriorityName = taskPriority.taskPriorityName;
    this.deleteIndex = this.taskpriorities.indexOf(taskPriority);
  }

  onDeleteConfirmClick()
  {
    //Invoke the REST-API call
    this.taskPriorityService.deleteTaskPriority(this.deleteTaskPriority.taskPriorityID).subscribe(
      (response) =>
      {
        //Delete object in Grid
        this.taskpriorities.splice(this.deleteIndex, 1);

        //Clear deleteCountry
        this.deleteTaskPriority.taskPriorityID = null;
        this.deleteTaskPriority.taskPriorityName = null;

        //Recall the calculateNoOfPages
        this.calculateNoOfPages();
      },
      (error) =>
      {
        console.log(error);
      });
  }

}
