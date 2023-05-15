import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, docData, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';

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

  collectionRef(path){
    return collection(this.firestore, path);
  }

  setDocument(path: string, data: { email: string; name: any; uid: string; photo: string; }){
    const dataRef = this.docRef(path);
    return setDoc<any>(dataRef, data); //set()
  }

  addDocument(path, data) {
    const dataRef = this.collectionRef(path);
    return addDoc<any>(dataRef, data);
  }

  getDocById(path: any){
    const dataRef = this.docRef(path);
    return getDoc(dataRef);
  }

  getDocs(path, queryFn?) {
    let dataRef: any = this.collectionRef(path);
    if(queryFn) {
      const q = query(dataRef, queryFn);
      dataRef = q;
    }

    return getDocs<any>(dataRef)
  }

  collectionDataQuery(path, queryFn?) {
    let dataRef: any = this.collectionRef(path);
    if(queryFn) {
      const q = query(dataRef, queryFn);
      dataRef = q;
    }

    return collectionData<any>(dataRef, {idField: 'id'});

  }

  docDataQuery(path, id?, queryFn?) {
    let dataRef: any = this.docRef(path);
    if(queryFn) {
      const q = query(dataRef, queryFn);
      dataRef = q;
    }

    
    return id? docData<any>(dataRef, {idField: 'id'}) : docData<any>(dataRef);
  }

  whereQuery = where
}