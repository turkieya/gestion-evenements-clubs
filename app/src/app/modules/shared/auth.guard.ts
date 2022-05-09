import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private auth:AuthService,private router:Router ){}
  canActivate(){
    console.log(this.auth.getToken);
    if (this.auth.IsLoggedIn()!==null)
    {
      return true;
    }
    alert("vous devez vous connectez !");
    this.router.navigate(['']);
    return false;
  
  }
  
}
