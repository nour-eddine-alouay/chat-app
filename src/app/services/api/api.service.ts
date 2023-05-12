import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getDocByid(arg0: string): any {
    throw new Error('Method not implemented.');
  }
  constructor(private firestore: Firestore) { }

  docRef(path: any){
    return doc(this.firestore, path);
  }

  setDocument(path: string, data: { email: string; name: any; uid: string; photo: string; }){
    const dataRef = this.docRef(path);
    return setDoc<any>(dataRef, data); //set()
  }

  getDocById(path: any){
    const dataRef = this.docRef(path);
    return getDoc(dataRef);
  }
}