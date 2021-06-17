import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/project';

import { ProjectsService } from '../projects.service';




@Directive({
  selector: '[appUniqueProjectId]',
  providers: [ { provide: NG_ASYNC_VALIDATORS, useExisting: UniqueProjectIdDirective, multi: true }]
})
export class UniqueProjectIdDirective implements AsyncValidator
{

  constructor(private projectsService:ProjectsService) 
  { 

  }

  validate(control: AbstractControl) : Observable<ValidationErrors | null>
  {
    return this.projectsService.getProjectByProjectID(control.value).pipe(map( (existingProject: Project) => {
      if (existingProject != null)
      {
        return { uniqueProjectID: { valid: false }};
      }
      else
      {
        return null;
      }
    }));
  }

}
