import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnuncioService } from 'src/app/servicios/anuncio.service';
import { UserService } from 'src/app/servicios/user.service';
import { Anuncio } from 'src/app/clases/anuncio';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  anuncios:any
  busqueda:string
  
  constructor(private servicioAnuncio:AnuncioService, servicioUsuario:UserService,private fb:FormBuilder, private irHacia:Router) { }

  ngOnInit(): void {
    this.obtenerAnuncios()
    
  }
  
  obtenerAnuncios(): void{
    this.servicioAnuncio.listarAnuncios().subscribe(
      respuesta =>{
        console.log(respuesta)
        this.anuncios=respuesta
      },
      error => {console.log(error)}
    )
  }
  obtenerAnunciosAlim(): void{
    this.servicioAnuncio.listarAnunciosAlim().subscribe(
      respuesta =>{
        console.log(respuesta)
        this.anuncios=respuesta
      },
      error => {console.log(error)}
    )
  }
  
  obtenerAnunciosElec(): void{
    this.servicioAnuncio.listarAnunciosElec().subscribe(
      respuesta =>{
        console.log(respuesta)
        this.anuncios=respuesta
      },
      error => {console.log(error)}
    )
  }
  obtenerAnunciosDeco(): void{
    this.servicioAnuncio.listarAnunciosDeco().subscribe(
      respuesta =>{
        console.log(respuesta)
        this.anuncios=respuesta
      },
      error => {console.log(error)}
    )
  }
  obtenerAnunciosVehi(): void{
    this.servicioAnuncio.listarAnunciosVehi().subscribe(
      respuesta =>{
        console.log(respuesta)
        this.anuncios=respuesta
      },
      error => {console.log(error)}
    )
  }

  buscarAnuncio(): void{
    this.servicioAnuncio.buscarAnuncio(this.busqueda).subscribe(
      respuesta => {
        console.log(respuesta)
        this.anuncios = respuesta
      },
      error => console.log(error)
    )
  }
  


}
