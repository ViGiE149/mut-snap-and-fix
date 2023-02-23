import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: any;
  password: any;

  constructor(private router:Router, private auth:AngularFireAuth) { }

  ngOnInit() {
  }

  Reg(){
    this.email=((document.getElementById("email")as HTMLInputElement).value);
    this.password=((document.getElementById("password")as HTMLInputElement).value);

    this.auth.createUserWithEmailAndPassword(this.email, this.password)
    .then(userCredential => {
      // Signed in 
      const user = userCredential.user;
      window.alert("Registerd")
      this.router.navigateByUrl("/login");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert(errorMessage);
      // ..
    });



    
  }


}

