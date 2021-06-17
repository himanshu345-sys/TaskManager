export class SignUpViewModel 
{
    personName:any;
    email:string;
    mobile:string;
    dateOfBirth:string;
    gender:string;
    countryID:number;
    receiveNewsLetter:boolean;
    skills:any;

    constructor(personName:any=null,
        email:string=null,
        mobile:string=null,
        dateOfBirth:string=null,
        gender:string=null,
        countryID:number=null,
        receiveNewsLetter:boolean=null,
        skills:any=null)
        {
            this.personName = personName;
            this.email = email;
            this.mobile = mobile;
            this.dateOfBirth = dateOfBirth;
            this.gender = gender;
            this.countryID = countryID;
            this.receiveNewsLetter = receiveNewsLetter;
            this.skills = skills;
        }
}
