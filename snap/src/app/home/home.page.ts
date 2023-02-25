import { Component } from '@angular/core';
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Console } from 'console';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imageInfor:any;
  imageInfor2:any;
  newImage="assets/icon.png";
  newImage2="assets/icon.png";
  bodyData="";
  SelectedOption="";
  SelectedOption2="";
  counter=0;
  date=new Date();
  constructor(private db:AngularFirestore,private emailComposer: EmailComposer,private alertController: AlertController) {}



  async takePicture() {

    if(this.counter==0 ){

    
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source:CameraSource.Camera
    });
 
      this.imageInfor = image.base64String;
      this.newImage=`data:image/jpeg;base64,${image.base64String}`
      this.counter++;
  }else if(this.counter==1){

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source:CameraSource.Camera
    });
 
      this.imageInfor2 = image.base64String;
      this.newImage2=`data:image/jpeg;base64,${image.base64String}`

   this.counter++;


  }
  }


 async validate(){

 if(this.newImage2 == "assets/icon.png" ||this.newImage == "assets/icon.png" || this.bodyData=="" || this.SelectedOption2=="" || this.SelectedOption==""){


  const alert = await this.alertController.create({
    header: 'Alert',
    subHeader: 'Important message',
    message: 'capture 2 images of the damage first , fill in the description,choose campus and choose department!!!"!',
    buttons: ['OK'],
  });

  await alert.present();


 }
 else
 {
  var day=this.date.getDate();
  var month=this.date.getMonth();
  var year=this.date.getFullYear();
  var todaysDate=`${day}/${month}/${year}`;
//this.db.collection("demageData")
// Add a new document with a generated id.
this.db.collection("demageData").add({
campus: this.SelectedOption,
department: this.SelectedOption2,
description:this.bodyData,
date: todaysDate,
imageData:this.imageInfor,
imageData2:this.imageInfor2,
status:"demaged"

})
.then((docRef) => {
console.log("Document written with ID: ", docRef.id);
this.bodyData=""
alert("uploaded complete action by choosing g-mail app and send");

})
.catch((error) => {
console.error("Error adding document: ", error);
alert("faild : "+error);
});





  let email = {
    to: 'vgwala149@gmail.com',
  
    attachments: [`base64:image.jpeg//${this.imageInfor}`,`base64:image.jpeg//${this.imageInfor2}`],
    subject: 'Demage Report',
    body:"campus :"+this.SelectedOption+"."+"\n"+"Department :"+this.SelectedOption2+"."+"\n"+"\n"+this.bodyData,
    isHtml: false
  }
  
  // Send a text message using default options
  this.emailComposer.open(email);
  

 }


}


   done(){

    this.validate();
   


    this.newImage="assets/icon.png";  
    this.newImage="assets/icon.png";
    this.bodyData="";
    this.SelectedOption="";
    this.SelectedOption2="";
    this.counter=0;
    this.imageInfor="   ";
    this.imageInfor2="";

}







}
