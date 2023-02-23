import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any;
  password: any;

  constructor(private router:Router, private auth:AngularFireAuth) { }

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
    // ...
  })
  .catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    window.alert(errorMessage);
   
  });
  }

}
 
