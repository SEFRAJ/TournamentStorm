import { Component, OnInit } from '@angular/core';
import { Versus } from 'src/app/models/versus.model';

import { UserService } from 'src/app/services/user.service';
import { VersusService } from 'src/app/services/versus.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-versus',
  templateUrl: './versus.component.html',
  styleUrls: ['./versus.component.scss'],
  providers:[UserService, VersusService]
})
export class VersusComponent implements OnInit {
  public token;
  public juego;
  public status;
  public varBoton;
  public var;

  public jugadores;

  //VERSUS
  public versus: Versus;
  public versusMe: Versus;
  public versusModel: Versus;

  constructor(private _userService: UserService,private _versusService: VersusService,private _router: Router) { 
    this.token = this._userService.getToken(); 
    this.versusModel = new Versus("","","","","","","","","","",0,0,0,"","","")
    this.jugadores = "VACANTE"
  }

  ngOnInit() {
    this.getVersus();
    this.getTusVersus()
    this.varBoton = false ;
    this.var = open;

    //NO FUNCIONA ESTA PORQUERIA
    /*
    $(document).ready(function(){

      $('#select').on('change',function(){


        var selectValor = $(this).val( );
        $('#mostrarOcultar').children('div').hide();
      })
    });*/


  }

  //esta otra onda tampoco sirve
  mostrar(){
    console.log(this.jugadores)
    document.getElementById('mostrarOcultar').style.display = 'block';
  }

  //ni esta
  ocultar(){
    document.getElementById('mostrarOcultar').style.display = 'none';
  }

  getVersus(){
    this._versusService.getVersus(this.token).subscribe(
      response=>{
        if(response.lista){
          console.log(response.lista)
          this.varBoton = false;
          this.versus = response.lista;
        }else if(response){
          console.log(response)
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

  getTusVersus(){
    this._versusService.getTusVersus(this.token).subscribe(
      response=>{
        if(response.message == 'No ha creado ningun Versus'){
          console.log(response);
          this.status = 'No ha creado ningun Versus'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        }
        else
        if(response.Listado){
          console.log(response.Listado)
          this.varBoton = true;
          this.versusMe = response.Listado;
        }else if(response){
          console.log(response)
        }
      }
    )
  }


  getVersusParticipando(){
    this._versusService.getVersusParticipando(this.token).subscribe(
      response=>{
        if(response.Lista){
          console.log(response.Lista)
          this.varBoton = true;
          this.versus = response.Lista;
        }else if(response){
          console.log(response)
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

  getVersusLibre(){
    this._versusService.getVersusLibre().subscribe(
      response=>{
        if(response.Lista){
          console.log(response.Lista)
          this.varBoton = true;
          this.versus = response.Lista;
        }else if(response){
          console.log(response)
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

  getVersusPaga(){
    this._versusService.getVersusPaga().subscribe(
      response=>{
        if(response.Lista){
          console.log(response.Lista)
          this.varBoton = true;
          this.versus = response.Lista;
        }else if(response){
          console.log(response)
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

  addVersus(){
    this._versusService.addVersus(this.token,this.versusModel).subscribe(
      response=>{
        if(response.message == 'Rellene todos los campos necesarios'){
          console.log(response);
          this.status = 'Rellene todos los campos necesarios'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        } else
        if(response.message == 'No ingreso el valor de entrada'){
          console.log(response);
          this.status = 'No ingreso el valor de entrada'
          setTimeout(() => 
          {
            this.status = 'ok'
            },
          2000); 
        }
        else
        if(response){
          this.versusModel = new Versus("","","","","","","","","","",0,0,0,"","","")
          this.getVersus();
          this.getTusVersus()
          this.status = 'Se ha agregado el Versus, revise en la seccion de Mis Versus'
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

  datosVersus(id, idCreador, nombreCreador, idRetador1,nombreRetador1,idRetador2,nombreRetador2,nombreVersus,tipoJuego,
    tipoVersus,valorEntrada,puntosRetador1,puntosRetador2,resultado,nombreGanador,estado){
    console.log(id)
    this.versusModel = new Versus(
      id,
      idCreador,
      nombreCreador,
      idRetador1,
      nombreRetador1,
      idRetador2,
      nombreRetador2,
      nombreVersus,
      tipoJuego,
      tipoVersus,
      valorEntrada,
      puntosRetador1,
      puntosRetador2,
      resultado,
      nombreGanador,
      estado
    )
    sessionStorage.setItem('versus', JSON.stringify(this.versusModel));
    this.status = 'OK';
    this._router.navigate(['/detalleVersus'])
    this.versusModel = new Versus("","","","","","","","","","",0,0,0,"","","")
  }






}
