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

  public async registerSubmitted() {
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
    } else {
      // @ts-ignore
      this.errorMessage = response.text;
      this.successMessage = null;
    }
    this.requested = 2;
    this.registerForm.controls['password'].setValue('');
    this.registerForm.controls['confirmPassword'].setValue('');
  }

  public firstName(): AbstractControl | null {
    return this.registerForm.get('firstName');
  }

  public firstNameValidationRequired(): boolean {
    return !this.firstName()?.errors?.['required'];
  }

  public lastName(): AbstractControl | null {
    return this.registerForm.get('lastName');
  }

  public lastNameValidationRequired(): boolean {
    return !this.lastName()?.errors?.['required'];
  }

  public email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  public emailValidationRequired(): boolean {
    return !this.email()?.errors?.['required'];
  }

  public emailValidationIsEmail(): boolean {
    return !this.email()?.errors?.['email'];
  }

  public password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  public passwordValidationRequired(): boolean {
    return !this.password()?.errors?.['required'];
  }

  public passwordValidationPattern(): boolean {
    return !this.password()?.errors?.['pattern'];
  }

  public confirmPassword(): AbstractControl | null {
    return this.registerForm.get('confirmPassword');
  }

  public confirmPasswordValidationRequired(): boolean {
    return !this.confirmPassword()?.errors?.['required'];
  }

  public confirmPasswordValidationPattern(): boolean {
    return !this.confirmPassword()?.errors?.['pattern'];
  }

  getBackgroundImageUrl(): string {
    return "url('/assets/stock-background-image2.png')"
  }
}
