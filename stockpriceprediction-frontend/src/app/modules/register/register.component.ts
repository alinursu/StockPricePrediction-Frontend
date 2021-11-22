import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  public errorMessage: string | null = null;
  public successMessage: string | null = null;
  private requested: boolean = false;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private cookieService: CookieService) {
    if(this.cookieService.get('token') != '') {
      this.router.navigate(['/forbidden'])
    }

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm.valueChanges.subscribe(value => {
      if(!this.requested) {
        this.errorMessage = null;
        this.successMessage = null;
      }
      this.requested = false;
    })
  }

  ngOnInit(): void {}

  public async registerSubmitted() {
    let response = await this.userService.handleRegisterRequest(this.registerForm.value);

    // @ts-ignore
    if (response.status == 200) {
      // @ts-ignore
      this.successMessage = response.text;
      this.registerForm.setValue({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      })
    } else {
      // @ts-ignore
      this.errorMessage = response.text;
      this.requested = true;
      this.registerForm.controls['password'].setValue('');
    }
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

  public passwordValidationMinLength(): boolean {
    return !this.password()?.errors?.['minlength'];
  }
}
