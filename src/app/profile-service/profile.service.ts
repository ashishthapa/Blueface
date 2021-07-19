import { Injectable } from '@angular/core';

export interface IProfile {
  firstName: string;
  lastName : string;
  username : string;
  age      : number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public user!: IProfile;

  constructor() { }
  getProfileUser(): Promise<IProfile> {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.round(Math.random())) {
        this.user = {
          firstName : 'Michael',
          lastName : 'Collins',
          username : 'michael.collins',
          age : 30
        };
        resolve(this.user);
      } else {
        reject({ error: 'Profile not found' });
      }
      }, Math.random() * 5000);
    });
  }

  setName(firstName: string, lastName: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(firstName);
        console.log(this.user);
          if (Math.round(Math.random())) {
          this.user.firstName = firstName;
          this.user.lastName  = lastName;
          resolve(this.user);
        } else {
         reject({ error: 'Invalid name' });
        }
      }, Math.random() * 5000);
    });
  }

}
