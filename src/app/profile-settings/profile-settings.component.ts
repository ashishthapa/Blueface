import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { IProfile, ProfileService } from '../profile-service/profile.service';

import { from } from 'rxjs';


@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  
  private title = 'Profile'
  private user!: IProfile;
  public profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });


  constructor(private profile: ProfileService) { }

  ngOnInit(): void {
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
      // console.log(err.error);
      this.loadProfile();
    }).finally(()=> {

    });
  }

  saveProfile() {

  }

  public getTitle(): string {
    return this.title;
  }

  private populateNames() {
    if(this.getUser() && this.getUser().firstName && this.getUser().lastName) {
      this.profileForm.patchValue({
        firstName : this.getUser().firstName,
        lastName  : this.getUser().lastName
      })
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

}
