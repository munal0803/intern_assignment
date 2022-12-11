import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  studentsList:Student[]=[]; winnersList:Student[]=[]; topperList:Student[]=[];
  studentObj:Student={
    id: '',
    first_name: '',
    last_name: '',
    marks: 0,
    age: 0
  };
  
  id:string ='';
  first_name:string='';
  last_name:string='';
  age:number=0;
  marks:number=0;

constructor(private auth:AuthService,private data:DataService){}
  ngOnInit() : void{
    this.getAllStudents();
   
    this.getAllTopper();
    this.getAllWinner();

  }
  logout(){
    this.auth.logout();
  }
  getAllStudents(){
    this.data.getAllStudent().subscribe(
      res=>{
        this.studentsList=res.map((e:any)=>{
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        }
        )
      },err=>{
      alert('Error');
      }
    )
  }

  getAllWinner(){
    this.data.getAllWinner().subscribe(
      res=>{
        this.winnersList=res.map((e:any)=>{
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        }
        )
      },err=>{
      alert('Error');
      }
    )
  }

  getAllTopper(){
    this.data.getAllTopper().subscribe(
      res=>{
        this.topperList=res.map((e:any)=>{
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        }
        )
      },err=>{
      alert('Error');
      }
    )
  }

  resetform(){
    this.id='';
    this.first_name='';
    this.last_name='';
    this.age=0;
    this.marks=0;
  }

addStudent(){
if(this.first_name=='' || this.last_name==''||this.marks == 0){
  alert("Enter All Details");
}
this.studentObj.id='';
this.studentObj.first_name=this.first_name;
this.studentObj.last_name=this.last_name;
this.studentObj.marks=this.marks;
this.studentObj.age=this.age;
if(this.age < 21){
this.data.addStudent(this.studentObj);}
if(this.marks > 90){
  this.data.addTopper(this.studentObj);
}
this.resetform();
}
deleteStudent(student:Student){
  if(window.confirm('Are you sure'))
this.data.deleteStudent(student);
}
AddWinnerStudent(student:Student){
  if(window.confirm('Are you sure you want to add this user to winner'))
this.studentObj=student;
 this.data.addWinner(this.studentObj);
}
sortstudent(){
  this.studentsList.sort((a, b) => {return b.marks - a.marks;});
}
deleteTopper(student:Student){
  if(window.confirm('Are you sure'))
this.data.deleteTopper(student);
}

}

