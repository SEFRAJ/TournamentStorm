import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[UserService]
})
export class HeaderComponent implements OnInit {

  public token;
  public status: string;
  public identity;
  public usuario;
  constructor(private _userService: UserService, private _router: Router) { 
    this.identity = this._userService.getIdentity();
    this.usuario = this.identity.usuario;
  }

  ngOnInit(
  ) {
  }

  //---------------------------------------------------------------------------

  cerrarSesion(){
    sessionStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }


}
