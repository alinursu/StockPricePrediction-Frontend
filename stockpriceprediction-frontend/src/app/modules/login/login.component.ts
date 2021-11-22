import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public errorMessage: string | null = null;
  private requested: boolean = false;

  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private cookieService: CookieService) {
    if(this.cookieService.get('token') != '') {
      this.router.navigate(['/forbidden'])
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

    this.loginForm.valueChanges.subscribe(value => {
      if(!this.requested) {
        this.errorMessage = null;
      }
      this.requested = false;
    })
  }

  ngOnInit(): void {
  }

  public async loginSubmitted() {
    let response = await this.userService.handleLoginRequest(this.loginForm.value);

    // @ts-ignore
    if (response.status == 200) {
      await this.router.navigate(['/']);
      // @ts-ignore
      this.cookieService.set('token', response.text);
      // @ts-ignore
      this.cookieService.set('name', response.name);
    } else {
      // @ts-ignore
      this.errorMessage = response.text;
      this.requested = true;
      this.loginForm.controls['password'].setValue('');
    }
  }

  public email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  public emailValidationRequired(): boolean {
    return !this.email()?.errors?.['required'];
  }

  public emailValidationIsEmail(): boolean {
    return !this.email()?.errors?.['email'];
  }

  public password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  public passwordValidationRequired(): boolean {
    return !this.password()?.errors?.['required'];
  }
}
