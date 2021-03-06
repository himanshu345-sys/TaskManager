import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientLocation } from 'src/app/models/client-location';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { ClientLocationsService } from 'src/app/services/client-locations.service';
import * as $ from "jquery";

@Component({
  selector: 'app-client-locations',
  templateUrl: './client-locations.component.html',
  styleUrls: ['./client-locations.component.scss']
})
export class ClientLocationsComponent implements OnInit 
{

   //Objects for Holding Model Data
   clientlocations: ClientLocation[] = [];
   showLoading: boolean = false;
 
   //Objects for Delete
   deleteClientLocation: ClientLocation = new ClientLocation();
   editIndex: number = null;
   deleteIndex: number = null;
 
   //Properties for Searching
   searchBy: string = "clientLocationName";
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

  constructor(private clientLocationsService: ClientLocationsService, 
    private formBuilder: FormBuilder) 
    {

    }

  ngOnInit(): void 
  {
    //Get data from database
    this.clientLocationsService.getClientLocations().subscribe(
      (response: ClientLocation[]) =>
      {
        this.clientlocations = response;
        this.showLoading = false;
        this.calculateNoOfPages();
      }
    );

    //Create newForm
    this.newForm = this.formBuilder.group({
      clientLocationID: this.formBuilder.control(null),
      clientLocationName: this.formBuilder.control(null, [Validators.required])
    });

    //Create editForm
    this.editForm = this.formBuilder.group({
      clientLocationID: this.formBuilder.control(null),
      clientLocationName: this.formBuilder.control(null, [Validators.required])
    });
  }

  calculateNoOfPages()
  {
    //Get no. of Pages
    let filterPipe = new FilterPipe();
    var noOfPages = Math.ceil(filterPipe.transform(this.clientlocations, this.searchBy, this.searchText)
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
    this.newForm.reset({ clientLocationID: 0 });
    setTimeout(() =>
    {
      //Focus the ClientLocation textbox in newForm
      this.defaultTextBox_New.nativeElement.focus();
    }, 100);
  }

  onSaveClick()
  {
    if (this.newForm.valid)
    {
      //Invoke the REST-API call
      this.clientLocationsService.insertClientLocation(this.newForm.value).subscribe((response) =>
      {
        //Add Response to Grid
        var p: ClientLocation = new ClientLocation();
        p.clientLocationID = response.clientLocationID;
        p.clientLocationName= response.clientLocationName;
        this.clientlocations.push(p);

        //Reset the newForm
        this.newForm.reset();
        $("#newClientLocationFormCancel").trigger("click");
        this.calculateNoOfPages();

      }, (error) =>
        {
          console.log(error);
        });
    }
  }

  onEditClick(event, clientLocation: ClientLocation)
  {
    //Reset the editForm
    this.editForm.reset();

    setTimeout(() =>
    {
      //Set data into editForm
      this.editForm.patchValue(clientLocation);
      this.editIndex = this.clientlocations.indexOf(clientLocation);

      //Focus the ClientLocation textbox in editForm
      this.defaultTextBox_Edit.nativeElement.focus();
    }, 100);
  }

  onUpdateClick()
  {
    if (this.editForm.valid)
    {
      //Invoke the REST-API call
      this.clientLocationsService.updateClientLocation(this.editForm.value).subscribe((response: ClientLocation) =>
      {
        //Update the response in Grid
        this.clientlocations[this.editIndex] = response;

        //Reset the editForm
        this.editForm.reset();
        $("#editClientLocationFormCancel").trigger("click");
      },
        (error) =>
        {
          console.log(error);
        });
    }
  }

  onDeleteClick(event,clientLocation: ClientLocation)
  {
    //Set data into deleteCountry
    this.deleteClientLocation.clientLocationID = clientLocation.clientLocationID;
    this.deleteClientLocation.clientLocationName = clientLocation.clientLocationName;
    this.deleteIndex = this.clientlocations.indexOf(clientLocation);
  }

  onDeleteConfirmClick()
  {
    //Invoke the REST-API call
    this.clientLocationsService.deleteClientLocation(this.deleteClientLocation.clientLocationID).subscribe(
      (response) =>
      {
        //Delete object in Grid
        this.clientlocations.splice(this.deleteIndex, 1);

        //Clear deleteCountry
        this.deleteClientLocation.clientLocationID = null;
        this.deleteClientLocation.clientLocationName = null;

        this.calculateNoOfPages();
      },
      (error) =>
      {
        console.log(error);
      });
  }

  onSearchTextChange(event)
  {
    //Recall the calculateNoOfPages
    this.calculateNoOfPages();
  }

}
