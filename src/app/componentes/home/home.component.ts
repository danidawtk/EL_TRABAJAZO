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
  busqueda: string
  
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

  buscarAnuncio(): void{
    this.servicioAnuncio.buscarAnuncio(this.busqueda).subscribe(
      respuesta => {
        console.log(respuesta)
        this.anuncios = respuesta
      },
      error => console.log(error)
    )
  }
  eliminarAnuncio(): void{
    this.servicioAnuncio.eliminarAnuncio().subscribe(
      respuesta => {
        console.log(respuesta)
        this.anuncios=respuesta
        this.irHacia.navigate(['/home'])
      },
      error => console.log(error)
    )
  }


}
