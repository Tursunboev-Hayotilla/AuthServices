import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      status: ['', Validators.required],
      age: ['', [Validators.required]],
      roles: ['', Validators.required], // Initialize roles as an empty array
    });
  }

  register() {
    console.log("Kirdi")
    if (this.form.invalid) {
      return;
    }
    const roleString: string = this.form.value.roles;
    const roles: string[] = roleString
      .split(' ')
      .map((role: string) => role.trim());
    this.form.value.roles = roles;
    console.log("tepasiga kirdi");
    this.authService.register(this.form.value).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigateByUrl('/login')
        // Redirect or show success message
      },
      error: (err) => {
        console.log(err);
        this.matSnackBar.open(err.error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
    });
    console.log('pasiga kirdi');

  }
}
