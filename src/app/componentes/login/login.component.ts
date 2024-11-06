import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLogginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;

  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(data => {
      this.toastrService.info('🏆 Bienvenido Usuario 🏆', 'Info', {
        positionClass: 'toast-top-center',
      });
      this.isLogged = true;
      this.isLogginFail = false;
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      this.router.navigate(['perfil'])
    }, err => {
      this.toastrService.error('🐕‍🦺 Nombre de Usuario y/o Contraseña Incorrecta | verifica tu conexión a internet 🐕‍🦺', 'Error', {
        positionClass: 'toast-top-center',
      });
      this.isLogged = false;
      this.isLogginFail = true;
      this.errMsj = err.error.mensaje;
      console.log(this.errMsj);
    })
  }

  cancelar(): void {
    this.router.navigate(['']);
  }


}
