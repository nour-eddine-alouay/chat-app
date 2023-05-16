
import { Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _uid = new BehaviorSubject<any>(null);
  currentUser: any;

  constructor(
    private fireAuth: Auth,
    private apiService: ApiService
  ) { }

  async login(email: string,password: string): Promise<any>{
    try{
      const response = await signInWithEmailAndPassword(this.fireAuth,email, password);
      console.log(response);
      if(response.user){
        //const token = await (await this.fireAuth.currentUser).getIdToken;
        //console.log('token: ',token);
        //const user: any = await this.getUserData(response.user.uid);
        this.setUserData(response.user.uid);
        //return user.type;
      }
    }catch(e){
      throw(e);
    }
  }

  getId() {
    const auth = getAuth();
    console.log('current user auth: ', auth.currentUser);
    this.currentUser = auth.currentUser;
    console.log(this.currentUser);
    return this.currentUser?.uid;
  }

  setUserData(uid: string){
    this._uid.next(uid);
  }

  randomIntFromInterval(min: number, max: number){
    return Math.floor(Math.random()* (max - min + 1) + min);

  }

  async register(formValue: {
    username: any; email: string; password: string; 
}){
    try{
      const registeredUser = await createUserWithEmailAndPassword(this.fireAuth, formValue.email, formValue.password);
      console.log('registered user: ', registeredUser);
      const data ={
        email: formValue.email,
        //phone: formValue.phone,
        name: formValue.username,
        uid: registeredUser.user.uid,
        photo: 'https://i.pravatar.cc/' + this.randomIntFromInterval(200,400)
      };
      await this.apiService.setDocument(`users/${registeredUser.user.uid}`, data);
      const userData = {
        id: registeredUser.user.uid
      };
      return userData;
    }catch(e){
      throw(e);
    }

  }

async resetPassword(email: string){
  try{
    await sendPasswordResetEmail(this.fireAuth, email);
   }catch(e){
    throw(e);
   }
}

async logout() {
  try {
    await this.fireAuth.signOut();
    this._uid.next(null);
    this.currentUser = null;
    return true;
  } catch(e) {
    throw(e);
  }
}

checkAuth(): Promise<any>{
  return new Promise((resolve, reject) => {
    onAuthStateChanged(this.fireAuth, user =>{
      console.log('auth user', user);
      resolve(user)
    });
  });
}

async getUserData(id: any){
  const docSnap: any = await this.apiService.getDocByid(`users/${id}`);
  if(docSnap?.exists()){
    return docSnap.data();
  }else{
    throw('No such document exists');
  }
}

}