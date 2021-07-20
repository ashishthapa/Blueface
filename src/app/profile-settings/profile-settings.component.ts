import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IProfile, ProfileService } from '../profile-service/profile.service';
import {ThemePalette} from '@angular/material/core';


@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  
  private title = 'Profile'
  private user!: IProfile;
  private errorMessage: string = '';
  private loadingProfile: boolean = false;
  private savingProfile: boolean = false;
  private errorOccurred: boolean = false;
  private formFieldsDisabled = false;
  private firstName:string = '';
  private lastName:string = '';

  public profileForm: FormGroup; 


  constructor(private profile: ProfileService, private fb: FormBuilder) { 
    
    this.profileForm = this.fb.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl({value:'', disabled:true})
    });
  }

  ngOnInit(): void {
    this.setIsLoadingProfile(true);
    this.toggleFormState()
    this.loadProfile();
    // this.profileForm.controls['firstName'].valueChanges.subscribe((val) => {
    //   console.log(val);
    //   this.setIsErrorOccured(false);
    // })
  }

  loadProfile() {
    this.profile.getProfileUser().then((response) =>{
      if(response) {
        this.setUser(response);
        if(response.firstName && response.lastName) {
          this.populateNames();
        }
      } else {
        console.log('no response', response);
      }
    }).catch((err) => {
      this.loadProfile();
    }).finally(()=> {
      this.disableEmailInputField();
    });
  }

  saveProfile() {

  }


  private populateNames() {
    if(this.getUser() && this.getUser().firstName && this.getUser().lastName) {
      this.profileForm.patchValue({
        firstName : this.getUser().firstName,
        lastName  : this.getUser().lastName,
        email     : this.getUser().email
      })
      this.setIsLoadingProfile(false);
      this.toggleFormState()
    }
  }
  
  public onSave() {
    this.setIssavingProfile(true);
    this.setIsErrorOccured(false);
    this.toggleFormState();
    this.firstName = this.profileForm.value['firstName'];
    this.lastName = this.profileForm.value['lastName'];
    this.profile.setName(this.firstName, this.lastName).then((user) => {
      console.log(user);
      this.profileForm.patchValue({
        firstName :  (user as IProfile)['firstName'],
        lastName  :  (user as IProfile)['lastName']
      });
      this.handleEmail(user as IProfile);
    }).catch((err) => {
      console.log(err.error)
      this.setIsErrorOccured(true);
      this.setErrorMessage('Error! '+err.error);
    }).finally(() => {
      this.setIssavingProfile(false);
      this.toggleFormState();
    });
  }

  private disableEmailInputField() {
    this.profileForm.get('email')?.disable();
  }

  private handleEmail(user: IProfile) {
    this.profile.setUserEmail(user).then((user) => {
      console.log(user);
      this.profileForm.patchValue({
        email : (user as IProfile).email
      })
    }).catch((err)=>{
      console.log('error while generating email', err.error);
      if(err.error === 'Error on Email Generation') {
        this.profileForm.patchValue({
          firstName: this.firstName,
          lastName: this.lastName,
          email:''
        });
      }
      this.setIsErrorOccured(true);
      this.setErrorMessage(err.error);
    }).finally(()=>{

    });
  }

  public getUserEmail() {
    if(this.getUser()) {
      return this.getUser().email;
    } else {
      return '';
    }
  }

  public getTitle(): string {
    return this.title;
  }

  public getErrorMessage(): string {
    return this.errorMessage;
  }

  private setErrorMessage(errorMessage: string) {
    if(errorMessage) {
      this.errorMessage = errorMessage;
    }
  }

  private setUser(user: IProfile) {
    this.user = user;
    if(this.user.firstName) {
      this.profileForm.patchValue({firstName: this.user.firstName})
    }
  }

  public getUser():IProfile {
    return this.user;
  }

  public getUsername(): string {
    return this.getUser() ? this.user.username: ''
  }

  public showError() {

  }

  public isLoadingProfile(): boolean {
    return this.loadingProfile;
  }

  public isSavingProfile(): boolean {
    return this.savingProfile;
  }

  public isErrorOccured(): boolean {
    return this.errorOccurred;
  }

  public setIsLoadingProfile(isLoading:boolean) {
    return this.loadingProfile = isLoading;
  }

  public setIssavingProfile(isSaving: boolean): boolean {
    return this.savingProfile = isSaving;
  }

  public setIsErrorOccured (isError:boolean): boolean {
    return this.errorOccurred = isError;
  }

  public toggleFormState() {
    this.formFieldsDisabled = !this.formFieldsDisabled;
    const state = this.formFieldsDisabled ? 'disable' : 'enable';
    Object.keys(this.profileForm.controls).forEach((controlName) => {
        this.profileForm.controls[controlName][state]();
    });
}

}
