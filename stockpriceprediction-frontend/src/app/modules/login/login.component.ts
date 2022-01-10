import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {ComponentDisplayerService} from "../../services/component-displayer.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public errorMessage: string | null = null;
  public requested: boolean = false;

  constructor(private userService: UserService,
              private componentDisplayerService: ComponentDisplayerService,
              private router: Router,
              private formBuilder: FormBuilder,
              private cookieService: CookieService) {
    this.componentDisplayerService.displayHeaderAndFooter = false;

    if (this.cookieService.get('token') != '') {
      this.router.navigate(['/forbidden'])
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

    this.loginForm.valueChanges.subscribe(value => {
      if (!this.requested) {
        this.errorMessage = null;
      }
      this.requested = false;
    })
  }

  ngOnInit(): void {
  }

  async loginSubmitted() {
    this.requested = true;
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

    this.requested = false;
  }

  email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  emailValidationRequired(): boolean {
    return !this.email()?.errors?.['required'];
  }

  emailValidationIsEmail(): boolean {
    return !this.email()?.errors?.['email'];
  }

  password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  passwordValidationRequired(): boolean {
    return !this.password()?.errors?.['required'];
  }

  getBackgroundImageUrl(): string {
    return "url('/assets/stock-background-image2.png')"
  }
}
