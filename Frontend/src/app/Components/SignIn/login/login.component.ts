import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ExternalAuthDto } from './model';
import { HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup
  googleService: any;
  errorMessage: string | null = null;

  googleUserToken!: string

  user!: SocialUser;
  showError: boolean | undefined;
  body: ExternalAuthDto[] = [];


  constructor(private fb: FormBuilder, private auth: AuthService,
    private router: Router, private socialService: SocialAuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.socialService.authState.subscribe((user: SocialUser) => {
      if (user) {
        this.externalLogin(user);
      }
    });

  }


  externalLogin(user: SocialUser) {
    const externalAuth: ExternalAuthDto = {
      idToken: user.idToken
    };

    // Call the external authentication API
    this.auth.externalLogin(externalAuth).subscribe((response: any) => {

      this.auth.storeToken(response.token);
      // console.log("Token for bearer", response.token);

      this.auth.storeDetails(response.user.name, response.user.id);
      // console.log(response.user.name, response.user.id);

      this.router.navigate(['/dashboard']);
    });
    (error: HttpErrorResponse) => {
      console.error('Error occurred:', error);
    }
  }


  onLogin() {
    if (this.loginForm.valid) {
      //send object to db
      this.auth.login(this.loginForm.value)
        .subscribe({
          next: (response) => {
            console.log('Login response:', response);
            alert(response.message);
            this.auth.storeToken(response.userInfo.token)
            // console.log(response.userInfo.token)

            this.auth.storeDetails(response.userInfo.name, response.userInfo.userId)
            // console.log(response.userInfo.name, response.userInfo.userId)

            this.router.navigate(['/dashboard'])
            this.loginForm.reset();

          },
          error: (err) => {
            alert(err?.error.message)
          }
        })

    }
    else {
      //throw error
      console.log("form is not valid")
      this.validateForm(this.loginForm)
      alert("Your form is invalid")
    }
  }
  private validateForm(formgroup: FormGroup) {
    Object.keys(formgroup.controls).forEach(field => {
      const control = formgroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true })
      } else if (control instanceof FormGroup) {
        this.validateForm(control)
      }
    });
  }
}
