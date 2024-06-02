import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService , private router: Router){}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
 submitForm(){
   if(this.registerForm.valid){
    console.log(this.registerForm.value);
     this.auth.register(this.registerForm.value)
     .subscribe({
       next:(res=>{
         alert(res.message);
         this.router.navigate(['/login'])
         this.registerForm.reset();
       })
      ,error:(err=>{
         alert(err?.error.message)
       })
     })
   }else{
     console.log("form is not valid")
    this.validateForm(this.registerForm)
     alert("Your form is invalid")
   }
  }
  private validateForm(formgroup: FormGroup){
    Object.keys(formgroup.controls).forEach(field => {
      const control = formgroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      }else if(control instanceof FormGroup){
        this.validateForm(control)
      }
    });
  }
}
