import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  @ViewChild('myModal') model:ElementRef | undefined;
  studentObj:student = new student();
  studentData: student[] = [];

  ngOnInit(): void {    
    const localDataValue = localStorage.getItem("angular17-crud");
    if (localDataValue != null){
      this.studentData = JSON.parse(localDataValue);
    }
  }

  openmodel(){    
    const model = document.getElementById ("myModal");  
    if(model != null) {
      model.style.display = 'block'
    }
  }

  closemodel(){
    this.studentObj = new student();
    if(this.model != null) {
      this.model.nativeElement.style.display = "none";
    }    
  }

  onEdit(item : student){
    this.studentObj= item;
    this.openmodel();
  }

  onDelete(item : student){
    const onDelete = confirm ("Are you sure want to delete");
    if(onDelete){
      const currentRecord = this.studentData.findIndex(m=> m.id === this.studentObj.id);
      this.studentData.splice(currentRecord,1);
      localStorage.setItem('angular17-crud', JSON.stringify(this.studentData));
    }
  }

  update(){
    const currentRecord = this.studentData.find(m=> m.id === this.studentObj.id);
    if(currentRecord != undefined){
      currentRecord.name = this.studentObj.name;
      currentRecord.mobileNo = this.studentObj.mobileNo;
      currentRecord.city = this.studentObj.city;
      currentRecord.state = this.studentObj.state;
      currentRecord.pincode = this.studentObj.pincode;
      currentRecord.address = this.studentObj.address;
      currentRecord.email = this.studentObj.email;
    };
    localStorage.setItem('angular17-crud', JSON.stringify(this.studentData));
    this.closemodel()
  }


  savestudent(){
    debugger;
    const isLocalDataPresent = localStorage.getItem("angular17-crud");
    if(isLocalDataPresent != null){
      const oldArray = JSON.parse(isLocalDataPresent);
      oldArray.push(this.studentObj);
      this.studentObj.id = oldArray.length + 1;
      this.studentData = oldArray;
      localStorage.setItem('angular17-crud', JSON.stringify(oldArray));
    }else{
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      this.studentData = newArr;
      localStorage.setItem('angular17-crud', JSON.stringify(newArr));
    }
    this.closemodel()
  }

}

export class student{
  id:number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor(){
    this.id=0;
    this.address='';
    this.pincode='';
    this.state='';
    this.city='';
    this.email='';
    this.mobileNo='';
    this.name='';
  }

}
