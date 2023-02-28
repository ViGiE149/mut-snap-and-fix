import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any;
  password: any;

  constructor(private router:Router, private auth:AngularFireAuth,private toastController: ToastController) { }

  ngOnInit() {
  }


  validate(){



  }

  log(){
    this.email=((document.getElementById("email")as HTMLInputElement).value);
    this.password=((document.getElementById("password")as HTMLInputElement).value);

    
  this.auth.signInWithEmailAndPassword(this.email, this.password)
  .then(userCredential => { 
    
    const user = userCredential.user;
    this.router.navigateByUrl("/home");
    this.presentToast()
  })
  .catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    window.alert(errorMessage);
   
  });
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'SIGNED IN!',
      duration: 1500,
      position: 'top'
    });

    await toast.present();
  }

}
 
