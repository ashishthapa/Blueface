import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
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

  public profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });


  constructor(private profile: ProfileService) { }

  ngOnInit(): void {
    this.setIsLoadingProfile(true);
    this.toggleFormState()
    this.loadProfile();
  }

  loadProfile() {
    this.profile.getProfileUser().then((response) =>{
      console.log('response is ', response);
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

    });
  }

  saveProfile() {

  }

  private populateNames() {
    if(this.getUser() && this.getUser().firstName && this.getUser().lastName) {
      this.profileForm.patchValue({
        firstName : this.getUser().firstName,
        lastName  : this.getUser().lastName,
      })
      this.setIsLoadingProfile(false);
      this.toggleFormState()
    }
  }
  
  public onSubmit() {
    this.setIssavingProfile(true);
    this.setIsErrorOccured(false);
    this.toggleFormState();
    let firstName = this.profileForm.value['firstName'];
    let lastName = this.profileForm.value['lastName'];
    console.log(firstName);
    this.profile.setName(firstName, lastName).then((user) => {
      console.log(user);
      this.profileForm.patchValue({
        firstName :  (user as IProfile)['firstName'],
        lastName  :  (user as IProfile)['lastName']
      });
      this.handleEmail(user as IProfile);
    }).catch((err) => {
      console.log(err.error)
      this.setIsErrorOccured(true);
      this.setErrorMessage(err.error);
    }).finally(() => {
      this.setIssavingProfile(false);
      this.toggleFormState();
    });
  }

  private handleEmail(user: IProfile) {
    this.profile.setUserEmail(user).then((user) => {
      console.log(user);
    })
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
