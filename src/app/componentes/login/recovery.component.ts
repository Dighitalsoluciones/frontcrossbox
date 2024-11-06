import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  email: string = "";

  constructor(private authService: AuthService, private router: Router,
    private toastrService: ToastrService, private spinnerService: SpinnerService) { }

  ngOnInit(): void {
  }

  recovery(email: string) {
    this.spinnerService.llamarSpinner();
    this.authService.recovery(email).subscribe(res => {
      this.toastrService.info('✅ Email enviado correctamente', 'info');
      this.router.navigate(["/"]);
      this.spinnerService.pararSpinner();
    }, err => {
      this.toastrService.error('No se ha enviado el email de recuperación, verifica que sea un email valido o la conexión a internet', 'error');
      this.spinnerService.pararSpinner();
    });

  }

  back() {
    window.history.back();
  }

}
