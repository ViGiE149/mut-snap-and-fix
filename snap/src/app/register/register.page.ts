import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router,
    private auth: AngularFireAuth,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async Reg() {
    if (this.validateInputs()) {
      const loader = await this.loadingController.create({
        message: 'Signing up',
        cssClass: 'custom-loader-class',
      });

      try {
        await loader.present();
        await this.auth.createUserWithEmailAndPassword(this.email, this.password);
        loader.dismiss();
        this.router.navigateByUrl('/login');
        this.presentToast('Successfully registered!');
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

  validateInputs(): boolean {
    if (!this.email) {
      alert('Enter email');
      return false;
    }

    if (!this.password) {
      alert('Enter password');
      return false;
    }

    if (!this.confirmPassword) {
      alert('Enter confirm password');
      return false;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return false;
    }

    return true;
  }

  getErrorMessage(error: any): string | undefined {
    switch (error.code) {
      case 'auth/missing-email':
        return 'Email is required';
      case 'auth/invalid-email':
        return 'Invalid email format';
      case 'auth/email-already-in-use':
        return 'Email already in use';
      case 'auth/user-not-found':
        return 'Invalid email';
      default:
        return error.message || 'An unexpected error occurred';
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }
}

