import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authentification.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loginForm: FormGroup;
  loading = false;
  submitted = false;

constructor(  public fb: FormBuilder,
  public authService: AuthService,
  public router: Router
 ) {this.loginForm = this.fb.group({
  email: ['', Validators.required],
  password: ['', Validators.required]
    
});
if(this.authService.currentUserValue)
{
  this.router.navigate(['']);
}
}

ngOnInit() {};

get f()
{
  return this.loginForm.controls;
}

onSubmit()
{this.submitted= true ;
  if(this.loginForm.invalid)
  {return;
  }
    this.authService.signIn(this.loginForm.value).pipe(first())
    .subscribe(
        data => {
            this.router.navigate(['acceuil/calendrier']);
        },
        error => {
         //   this.error = error;
         Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Il semble que vous ayez saisi une adresse e-mail ou un mot de passe mal orthographiée!',
        })
        this.submitted=false;
           this.loginForm.reset();
            this.loading = false;
        });
}

} 