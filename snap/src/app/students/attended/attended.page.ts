import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-attended',
  templateUrl: './attended.page.html',
  styleUrls: ['./attended.page.scss'],
})
export class AttendedPage implements OnInit {
  completedData:any;
  email:any;
  constructor(private db: AngularFirestore) {
    this.getCompletedData();
   
   }

  ngOnInit() {
  }


  


  getCompletedData() {
    var email=localStorage.getItem('email');
    console.log(email);
    this.db.collection('damageData', ref => 
    ref.where('status', '==', 'completed').where('email', '==', email))
    .valueChanges()
    .subscribe(data =>{
    this.completedData = data;  
    console.log(data);
  });

}



}
