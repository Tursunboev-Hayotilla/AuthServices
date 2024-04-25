import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  hide = true;
  form!: FormGroup;
  fb = inject(FormBuilder);

  authService = inject(AuthService);
  decodedToken: any | null;

  tokenKey = 'token';

  roles: string[] = [];

  login() {
    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        console.log(response);

        this.decodedToken = jwtDecode(localStorage.getItem(this.tokenKey)!);
        this.router.navigateByUrl('/');        

        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
      
      error: (err) => {
        console.log(err);

        this.matSnackBar.open(err.error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
