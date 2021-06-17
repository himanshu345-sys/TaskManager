import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../can-deactivate-guard.service';
import { CountriesService } from '../countries.service';
import { Country } from '../country';
import { CustomValidatorsService } from '../custom-validators.service';
import { LoginService } from '../login.service';
import { SignUpViewModel } from '../sign-up-view-model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit,CanComponentDeactivate
{
  signUpForm: FormGroup;
  genders = ["male","female"];
  countries:Country[] = [];
  registerError:string = null;

  canLeave:boolean = true;

  constructor(private countriesService: CountriesService,
    private formBuilder:FormBuilder,
    private customValidatorsService:CustomValidatorsService,
    private loginService:LoginService,
    private router:Router) 
  { 

  }

  ngOnInit(): 
  void 
  {
    this.countriesService.getCountries().subscribe((response) =>{
      this.countries = response;
    })
  
    this.signUpForm = this.formBuilder.group({
      personName:this.formBuilder.group({
        firstName:[null,[Validators.required,Validators.minLength(2)]],
        lastName:[null,[Validators.required,Validators.minLength(2)]],
      }),
      email:[null,[Validators.required,Validators.email],[this.customValidatorsService.DuplicateEmailValidator()],{updateOn:'blur'}],
      mobile:[null,[Validators.required,Validators.pattern(/^[789]\d{9}$/)]],
      dateOfBirth:[null,[Validators.required,this.customValidatorsService.minimumAgeValidator(18)]],
      password:[null,[Validators.required]],
      confirmpassword:[null,[Validators.required]],
      gender:[null,[Validators.required]],
      countryID:[null,[Validators.required]],
      receiveNewsLetter:null,
      skills: this.formBuilder.array([])
    },{
      validators:[
        this.customValidatorsService.compareValidator("confirmpassword","password")
      ]
    });

    this.signUpForm.valueChanges.subscribe(
      (value) => {
        this.canLeave = false;
      });
  }

  get skillsArray()
  {
    return this.signUpForm.get('skills') as FormArray;
  }

  onSubmitClick()
  {
    //Display current form value
    this.signUpForm["submitted"] = true;
    if(this.signUpForm.valid)
    {
      var signUpViewModel = this.signUpForm.value as SignUpViewModel;
      this.loginService.Register(signUpViewModel).subscribe(
        (response) => {
          this.canLeave = true;
          this.router.navigate([ "/employee","tasks" ]);
        },
        (error) => {
          console.log(error);
          this.registerError = "Unable to submit";
        }
      )
    }

    //setValue
    // this.signUpForm.setValue({
    //   firstName: "Adam",
    //   lastName: "Smith",
    //   email: "smith@gmail.com",
    //   mobile: "9876543210",
    //   dateOfBirth: "2020-01-01",
    //   gender: "male",
    //   countryID: 3,
    //   receiveNewsLetters: true
    // });

    //patchValue
    // this.signUpForm.patchValue({
    //   firstName: "Adam",
    //   lastName: "Smith",
    //   email: "smith@gmail.com"
    // });

    //reset
    //this.signUpForm.reset();

    //reset with Parameters
    // this.signUpForm.reset({
    //   firstName: "Adam",
    //   lastName: "Smith",
    //   email: "smith@gmail.com"
    // });
  }

  onAddSkill()
  {
    var formGroup = new FormGroup({
      skillName: new FormControl(null, [Validators.required]),
      level: new FormControl(null, [Validators.required])
    });

    (<FormArray>this.signUpForm.get("skills") as FormArray).push(formGroup);
  }

  onRemoveClick(index:number)
  {
    (<FormArray>this.signUpForm.get("skills") as FormArray).removeAt(index);
  }
}
