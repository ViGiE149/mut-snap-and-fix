import { Component } from '@angular/core';
import { EmailComposer, EmailComposerOptions,} from '@awesome-cordova-plugins/email-composer/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Console } from 'console';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imageInfor: any;
  imageInfor2: any;
  newImage = 'assets/icon.png';
  newImage2 = 'assets/icon.png';
  bodyData = '';
  SelectedOption = '';
  SelectedOption2 = '';
  counter = 0;
  imageUrl: any;
  imageUrl2: any;
  id ="";

  date = new Date();

  
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private emailComposer: EmailComposer,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private auth:AngularFireAuth,
    private router:Router,
    private toastController: ToastController
  ) {}

  async uploadImage(file: string) {
    const fileName = Date.now().toString();
    const filePath = `images/${fileName}`;
    const fileRef = this.storage.ref(filePath);

    const uploadTask = fileRef.putString(file, 'base64', {
      contentType: 'image/jpeg',
    });
    const snapshot = await uploadTask;

    return snapshot.ref.getDownloadURL();
  }

  async takePicture() {
    if (this.counter == 0) {
      const image = await Camera.getPhoto({
        quality: 50,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });
      this.counter++;
      this.imageInfor = image.base64String;
      this.newImage = `data:image/jpeg;base64,${image.base64String}`;


     
        const loader = await this.loadingController.create({
          message:  'processing image...',
        });
        await loader.present();
      this.imageUrl = await this.uploadImage(this.imageInfor);
      loader.dismiss();


    } else if (this.counter == 1) {
      const image2 = await Camera.getPhoto({
        quality: 50,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });
      this.counter++;
      this.imageInfor2 = image2.base64String;
      this.newImage2 = `data:image/jpeg;base64,${image2.base64String}`;


        const loader = await this.loadingController.create({
          message: 'processing image...',
        });
        await loader.present();
      this.imageUrl2 = await this.uploadImage(this.imageInfor2);
      loader.dismiss();
    }
  }

  async validate() {
    if (
      this.newImage2 == 'assets/icon.png' ||
      this.newImage == 'assets/icon.png' ||
      this.bodyData == '' ||
      this.SelectedOption2 == '' ||
      this.SelectedOption == ''
    ) {
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Important message',
        message:
          'capture 2 images of the damage first , fill in the description,choose campus and choose department!!!"!',
        buttons: ['OK'],
      });

      await alert.present();
    } else {
      var day = this.date.getDate();
      var month = this.date.getMonth();
      var year = this.date.getFullYear();
      var todaysDate = `${day}/${month}/${year}`;
       
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      this.id = result;





      this.db
        .collection('damageData')
        .add({
          id: this.id,
          campus: this.SelectedOption,
          department: this.SelectedOption2,
          description: this.bodyData,
          date: todaysDate,
          imageUrl: this.imageUrl,
          imageUrl2: this.imageUrl2,
          status: 'demaged',
        })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          alert('uploaded ' + docRef.id +"\n"+"complete action by clicking send");

          let email = {
            to: 'vgwala149@gmail.com',

            attachments: [`base64:image.jpeg//${this.imageInfor}`],
            subject: 'Damage Report',
            body:
              'campus :' +
              this.SelectedOption +
              '.' +
              '\n' +
              'Department :' +
              this.SelectedOption2 +
              '.' +
              '\n' +
              '\n' +
              this.bodyData,
              app:'gmail',
            isHtml: false,
          };

          // Send a text message using default options
        this.emailComposer.open(email);


          this.imageInfor="";
          this.imageInfor2="";
          this.newImage = 'assets/icon.png';
          this.newImage2 = 'assets/icon.png';
          this.bodyData = '';
          this.SelectedOption = '';
          this.SelectedOption2 = '';
          this.counter = 0;
          this.imageUrl="";
          this.imageUrl2="";
          this.id ="";

       
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
          alert('faild : ' + error);
        });
    }
  }

  done() {
    this.validate();
  }

  logout(){
    this.auth.signOut().then(() => {
      this.router.navigateByUrl("/login");
      this.presentToast()


    }).catch((error) => {
    
    });
    
  }



  async presentToast() {
    const toast = await this.toastController.create({
      message: 'SIGNED OUT!',
      duration: 1500,
      position: 'top',
    
    });

    await toast.present();
  }



}
