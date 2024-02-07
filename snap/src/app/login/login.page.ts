import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';

  constructor(
    private loadingController: LoadingController,
    public navCtrl: NavController,
    private router: Router,
    private auth: AngularFireAuth,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  goToDestinationPage(data: any) {
    this.navCtrl.navigateForward('/home', { queryParams: { data: data } });
  }

  async log() {
    this.email = (document.getElementById('email') as HTMLInputElement).value;
    this.password = (document.getElementById('password') as HTMLInputElement).value;

    if (this.email === 'Admin' && this.password === 'Admin123') {
      this.navCtrl.navigateForward('/dashboard-admin');
    } else {
      const loader = await this.loadingController.create({
        message: 'Signing in',
        cssClass: 'custom-loader-class',
      });

      try {
        await loader.present();
        const userCredential = await this.auth.signInWithEmailAndPassword(this.email, this.password);
        loader.dismiss();
        this.goToDestinationPage(this.email);
        this.presentToast();
      } catch (error) {
        loader.dismiss();
        const errorMessage = this.getErrorMessage(error);
        if (errorMessage) {
          alert(errorMessage);
        } else {
          window.alert('An unexpected error occurred.');
        }
      }
    }
  }

  getErrorMessage(error: any): string | undefined {
    switch (error.code) {
      case 'auth/missing-email':
        return 'Email is required';
      case 'auth/invalid-email':
        return 'Invalid email format';
      case 'auth/user-not-found':
        return 'User not found';
      case 'auth/wrong-password':
        return 'Invalid password';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/email-already-in-use':
        return 'Email already in use';
      default:
        return error.message || 'An unexpected error occurred';
    }
  }
  

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'SIGNED IN!',
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }
}

