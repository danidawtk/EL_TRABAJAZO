import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AnuncioService } from 'src/app/servicios/anuncio.service';
import { Anuncio } from 'src/app/clases/anuncio';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  anuncios:any
  busqueda: string
  
  constructor(private servicioAnuncio:AnuncioService, private fb:FormBuilder) { }

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
  


}
