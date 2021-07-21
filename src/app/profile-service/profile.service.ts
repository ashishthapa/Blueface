import { Injectable } from '@angular/core';

export interface IProfile {
  firstName: string;
  lastName : string;
  username : string;
  age      : number;
  email    : string; 
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private emailDomain: string = '@blueface.com';
  public user!: IProfile;
  private emailPattern:RegExp =  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  constructor() { }
  getProfileUser(): Promise<IProfile> {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.round(Math.random())) {
        this.user = {
          firstName : 'Michael',
          lastName : 'Collins',
          username : 'michael.collins',
          age : 30,
          email: ''
        };
        resolve(this.constructEmail(this.user));
      } else {
        reject({ error: 'Profile not found' });
      }
      }, Math.random() * 5000);
    });
  }

  setName(firstName: string, lastName: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
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

  private constructEmail(user:IProfile): IProfile {
    user.email = user.firstName.replace(/\s+/g, '').toLowerCase() + '.' + user.lastName.replace(/\s+/g, '').toLowerCase() + this.emailDomain;
    return user;
   }

   private validateEmail(user: IProfile) {
     let email = user.email;
     console.log(email);
    let isEmailValid = this.emailPattern.test(email);
    console.log(isEmailValid);
    return {isEmailValid, email};
   }

  setUserEmail(user: IProfile) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(user);
          if (Math.round(Math.random())) {
          if(user && user.firstName && user.lastName) {
            console.log(this.constructEmail(user));
            let toValidateUser = this.constructEmail({...user});
            console.log('toValidateUser', toValidateUser);
            let validatedUser = this.validateEmail(toValidateUser);
            console.log('validatedUser', validatedUser);
            resolve(validatedUser);
          } 
          // resolve(this.user);
          reject({ error: 'Error on Email Generation' });
        } else {
         reject({ error: 'Error on Email Generation' });
        }
      }, Math.random() * 5000);
    });
  }

}
