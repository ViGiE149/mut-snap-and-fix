import { Component } from '@angular/core';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
  id = '';
  menuType = 'overlay';

  date = new Date();
  email: any;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private emailComposer: EmailComposer,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private auth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController,
    public navCtrl: NavController,
    private route: ActivatedRoute
  ) {
    this.ionViewWillEnter();
  }

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

  ionViewWillEnter() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params && params['data']) {
        this.email = params['data'];
        localStorage.setItem('email', this.email);
      }
    });
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    if (this.counter === 0) {
      this.counter++;
      this.imageInfor = image.base64String;
      this.newImage = `data:image/jpeg;base64,${image.base64String}`;
    } else if (this.counter === 1) {
      this.counter++;
      this.imageInfor2 = image.base64String;
      this.newImage2 = `data:image/jpeg;base64,${image.base64String}`;
    }
  }

  async validate() {
    if (
      this.newImage2 === 'assets/icon.png' ||
      this.newImage === 'assets/icon.png' ||
      this.bodyData === '' ||
      this.SelectedOption2 === '' ||
      this.SelectedOption === ''
    ) {
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Important message',
        cssClass: 'my-custom-alert',
        message: 'Capture 2 images of the damage, fill in the description, choose campus and choose department!',
        buttons: ['OK'],
      });

      await alert.present();
    } else {
      const day = this.date.getDate();
      const month = this.date.getMonth();
      const year = this.date.getFullYear();
      const todaysDate = `${day}/${month}/${year}`;

      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      this.id = result;

      const loader = await this.loadingController.create({
        message: '|Submitting...',
        cssClass: 'custom-loader-class'
      });
      await loader.present();

      this.imageUrl = await this.uploadImage(this.imageInfor);
      this.imageUrl2 = await this.uploadImage(this.imageInfor2);

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
          status: 'damaged',
          email: this.email
        })
        .then((docRef) => {
          loader.dismiss();
          console.log('Document written with ID: ', docRef.id);
          alert('Uploaded ' + docRef.id + '\n' + 'Complete action by clicking send');

          const email = {
            to: 'vgwala149@gmail.com',
            attachments: [`base64:image.jpeg//${this.imageInfor}`],
            subject: 'Damage Report',
            body:
              'Campus: ' +
              this.SelectedOption +
              '.' +
              '\n' +
              'Department: ' +
              this.SelectedOption2 +
              '.' +
              '\n' +
              '\n' +
              this.bodyData,
            app: 'gmail',
            isHtml: false,
          };

          this.emailComposer.open(email);

          this.imageInfor = '';
          this.imageInfor2 = '';
          this.newImage = 'assets/icon.png';
          this.newImage2 = 'assets/icon.png';
          this.bodyData = '';
          this.SelectedOption = '';
          this.SelectedOption2 = '';
          this.counter = 0;
          this.imageUrl = '';
          this.imageUrl2 = '';
          this.id = '';
        })
        .catch((error) => {
          loader.dismiss();
          console.error('Error adding document: ', error);
          alert('Failed: ' + error);
        });
    }
  }

  done() {
    this.validate();
  }

  logout() {
    this.presentConfirmationAlert();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'SIGNED OUT!',
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }

  async presentConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to SIGN OUT?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'my-custom-alert',
          handler: () => {
            console.log('Confirmation canceled');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.auth.signOut().then(() => {
              this.router.navigateByUrl("/login");
              this.presentToast();
            }).catch((error) => {
              console.error('Sign out error: ', error);
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
