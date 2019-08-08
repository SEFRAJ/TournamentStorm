import { Component, OnInit } from '@angular/core';

import { Versus } from 'src/app/models/versus.model';

import { UserService } from 'src/app/services/user.service';
import { VersusService } from 'src/app/services/versus.service';


@Component({
  selector: 'app-detalle-versus',
  templateUrl: './detalle-versus.component.html',
  styleUrls: ['./detalle-versus.component.scss'],
  providers:[UserService, VersusService]
})
export class DetalleVersusComponent implements OnInit {
  public token;
  public status;
  public detalleVersus;
  public identity;
  public idV;
  public nombreV;

  public tip;
  public valorEn;
  public ret1;
  public ret2;
  public p1;
  public p2;
  public es;
  public res;
  public gan;
  //VERSUS
  public versus1: Versus;
  public versusModel: Versus;

  constructor(private _userService: UserService,private _versusService: VersusService) {
    this.token = this._userService.getToken(); 
    this.versusModel = new Versus("","","","","","","","","","",0,0,0,"","","")
    this.detalleVersus = this._userService.getDatosVersus();
    this.identity = this._userService.getIdentity();
   }

  ngOnInit() {
    this.getVersus();
  }

  getVersus(){
    this.nombreV = this.detalleVersus.nombreVersus;
    this.idV = this.detalleVersus._id;
    this._versusService.getUnVersus(this.idV).subscribe(
      response=>{
        if(response.Resultado){
          this.versus1 = response.Resultado;
          this.tip = this.versus1.tipoVersus;
          this.valorEn= this.versus1.valorEntrada;
          this.ret1 = this.versus1.nombreRetador1;
          this.ret2 = this.versus1.nombreRetador2;
          this.p1 = this.versus1.puntosRetador1;
          this.p2 = this.versus1.puntosRetador2; 
          this.es = this.versus1.estado;
          this.res = this.versus1.resultado;
          this.gan = this.versus1.nombreGanador;
        }
      },
      error=>{
        var errorMessage = <any>error; 
        console.log(errorMessage); 
        if(errorMessage != null){
          this.status = 'ERROR'
        }
      }
    )
  }

  addJugador1(id){
    this._versusService.addRetador1Pago(this.token,id,this.versusModel).subscribe(
      response=>{
        if(response.message == 'Usted no puede particirpar en su propio versus'){
          console.log(response);
          this.status = 'Usted no puede particirpar en su propio versus'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        }else
        if(response.message == 'No tiene monedas suficientes para participar'){
          console.log(response);
          this.status = 'No tiene monedas suficientes para participar'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        }else
        if(response.message == 'Usted ya esta inscrito en este Versus'){
          console.log(response);
          this.status = 'Usted ya esta inscrito en este Versus'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        }
        
        else
        if(response){
          this.status = 'ok'
          this.getVersus();
          console.log(response);
        }
       
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error'
        }
      }
    )
  }

  addJugador2(id){
    this._versusService.addRetador2Pago(this.token,id,this.versusModel).subscribe(
      response=>{
        if(response.message == 'Usted no puede particirpar en su propio versus'){
          console.log(response);
          this.status = 'Usted no puede particirpar en su propio versus'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        }else
        if(response.message == 'No tiene monedas suficientes para participar'){
          console.log(response);
          this.status = 'No tiene monedas suficientes para participar'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        }else
        if(response.message == 'Usted ya esta inscrito en este Versus'){
          console.log(response);
          this.status = 'Usted ya esta inscrito en este Versus'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        }
        
        else
        if(response){
          this.status = 'ok'
          this.getVersus();
          console.log(response);
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error'
        }
      }
    )
  }

  addJugador2Libre(id){
    this._versusService.addRetador2Libre(this.token,id,this.versusModel).subscribe(
      response=>{
        if(response.message == 'Ya esta participando'){
          console.log(response);
          this.status = 'Ya esta participando'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        }else
        if(response.message == 'Usted ya esta inscrito en este Versus'){
          console.log(response);
          this.status = 'Usted ya esta inscrito en este Versus'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        }else
        if(response){
          this.status = 'ok'
          this.getVersus();
          console.log(response);
        }
       
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error'
        }
      }
    )
  }
  
  addResultadoPago(){
    this._versusService.addResultadoPaga(this.token,this.idV,this.versusModel).subscribe(
      response=>{
        if(response.message ==  'Empate, tendra que haber un desempate'){
          console.log(response);
          this.status =  'Empate, tendra que haber un desempate'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        }else
        if(response.message == 'No puede agregar resultado sin tener todos los participante'){
          console.log(response);
          this.status = 'No puede agregar resultado sin tener todos los participante'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        }else
        if(response.message == 'Solo el creador del Versus puede agregar los resultados'){
          console.log(response);
          this.status = 'Solo el creador del Versus puede agregar los resultados'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        }else
        if(response.message == 'Rellene todos los campos necesarios'){
          console.log(response);
          this.status = 'Rellene todos los campos necesarios'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        }else
        if(response){
          this.status = 'ok'
          this.versusModel = new Versus("","","","","","","","","","",0,0,0,"","","")
          this.getVersus();
          this.status = 'Felizidades' 
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
          console.log(response);
        }
       
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error'
        }
      }
    )
  }

  addResultadoLibre(){
    this._versusService.addResultadoLibre(this.token,this.idV,this.versusModel).subscribe(
      response=>{
        if(response.message ==  'Empate, tendra que haber un desempate'){
          console.log(response);
          this.status =  'Empate, tendra que haber un desempate'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        }else
        if(response.message == 'No puede agregar resultado sin tener todos los participante'){
          console.log(response);
          this.status = 'No puede agregar resultado sin tener todos los participante'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        }else
        if(response.message == 'Solo el creador del Versus puede agregar los resultados'){
          console.log(response);
          this.status = 'Solo el creador del Versus puede agregar los resultados'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        }else
        if(response.message == 'Rellene todos los campos necesarios'){
          console.log(response);
          this.status = 'Rellene todos los campos necesarios'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        }else
        if(response){
          this.status = 'ok'
          this.versusModel = new Versus("","","","","","","","","","",0,0,0,"","","")
          this.getVersus();
          this.status = 'Felizidades' 
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
          console.log(response);
        }
       
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error'
        }
      }
    )
  }

}
