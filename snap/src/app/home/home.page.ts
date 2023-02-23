import { Component } from '@angular/core';
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imageInfor:any;
  newImage="assets/icon.png";
  bodyData="";
  SelectedOption="";
  SelectedOption2="";
  constructor(private emailComposer: EmailComposer,private alertController: AlertController) {}



  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source:CameraSource.Camera
    });
 
      this.imageInfor = image.base64String;
      this.newImage=`data:image/jpeg;base64,${image.base64String}`
  }


 async validate(){

 if(this.newImage == "assets/icon.png" || this.bodyData=="" || this.SelectedOption2=="" || this.SelectedOption==""){


  const alert = await this.alertController.create({
    header: 'Alert',
    subHeader: 'Important message',
    message: '"capture an image of the damage first , fill in the description,choose campus and choose department!!!"!',
    buttons: ['OK'],
  });

  await alert.present();


 }
 else
 {

  let email = {
    to: 'vgwala149@gmail.com',
  
    attachments: [`base64:image.jpeg//${this.imageInfor}`],
    subject: 'Demage Report',
    body:"campus :"+this.SelectedOption+"."+"\n"+"Department :"+this.SelectedOption2+"."+"\n"+this.bodyData,
    isHtml: false
  }
  
  // Send a text message using default options
  this.emailComposer.open(email);
  this.newImage="assets/icon.png";

 }


}


   done(){

    this.validate();
}


}
