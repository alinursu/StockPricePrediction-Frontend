import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {ComponentDisplayerService} from "../../services/component-displayer.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  public errorMessage: string | null = null;
  public successMessage: string | null = null;
  private requested: number = 0;

  constructor(private userService: UserService,
              private componentDisplayerService: ComponentDisplayerService,
              private formBuilder: FormBuilder,
              private router: Router,
              private cookieService: CookieService) {
    this.componentDisplayerService.displayHeaderAndFooter = false;

    if (this.cookieService.get('token') != '') {
      this.router.navigate(['/forbidden'])
    }

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!*@#$%^&+=]).*$')]],
      confirmPassword: ['', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!*@#$%^&+=]).*$')]]
    });

    this.registerForm.valueChanges.subscribe(value => {
      if (this.requested <= 0) {
        this.errorMessage = null;
        this.successMessage = null;
      }
      this.requested--;
    })
  }

  ngOnInit(): void {
  }

  async registerSubmitted() {
    if(this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.successMessage = null;
      this.errorMessage = "Eroare: Parolele introduse nu coincid!";
      this.requested = 2;
      this.registerForm.controls['password'].setValue('');
      this.registerForm.controls['confirmPassword'].setValue('');
      return;
    }

    let response = await this.userService.handleRegisterRequest(this.registerForm.value);

    // @ts-ignore
    if (response.status == 201) {
      // @ts-ignore
      this.successMessage = response.text;
      this.errorMessage = null;
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      await delay(2000);
      this.router.navigate(['/login']);
    } else {
      // @ts-ignore
      this.errorMessage = response.text;
      this.successMessage = null;
    }
    this.requested = 2;
    this.registerForm.controls['password'].setValue('');
    this.registerForm.controls['confirmPassword'].setValue('');
  }

  firstName(): AbstractControl | null {
    return this.registerForm.get('firstName');
  }

  firstNameValidationRequired(): boolean {
    return !this.firstName()?.errors?.['required'];
  }

  lastName(): AbstractControl | null {
    return this.registerForm.get('lastName');
  }

  lastNameValidationRequired(): boolean {
    return !this.lastName()?.errors?.['required'];
  }

  email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  emailValidationRequired(): boolean {
    return !this.email()?.errors?.['required'];
  }

  emailValidationIsEmail(): boolean {
    return !this.email()?.errors?.['email'];
  }

  password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  passwordValidationRequired(): boolean {
    return !this.password()?.errors?.['required'];
  }

  passwordValidationPattern(): boolean {
    return !this.password()?.errors?.['pattern'];
  }

  confirmPassword(): AbstractControl | null {
    return this.registerForm.get('confirmPassword');
  }

  confirmPasswordValidationRequired(): boolean {
    return !this.confirmPassword()?.errors?.['required'];
  }

  confirmPasswordValidationPattern(): boolean {
    return !this.confirmPassword()?.errors?.['pattern'];
  }

  getBackgroundImageUrl(): string {
    return "url('/assets/stock-background-image2.png')"
  }
}
