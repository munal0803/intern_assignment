import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../model/student';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }
addStudent(student:Student){
  student.id = this.afs.createId();
  return this.afs.collection('/students').add(student);
}
addWinner(student:Student){
  student.id = this.afs.createId();
  return this.afs.collection('/winners').add(student);
}
addTopper(student:Student){
  student.id = this.afs.createId();
  return this.afs.collection('/toppers').add(student);
}

getAllStudent(){
  return this.afs.collection('/students').snapshotChanges();
}
getAllWinner(){
  return this.afs.collection('/winners').snapshotChanges();
}
getAllTopper(){
  return this.afs.collection('/toppers').snapshotChanges();
}

deleteStudent(student:Student){
  return this.afs.doc('/students/'+student.id).delete();
}
deleteTopper(student:Student){
  return this.afs.doc('/toppers/'+student.id).delete();
}

}
