import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { Usuario } from 'src/app/clases/usuario';
import { AnuncioService } from 'src/app/servicios/anuncio.service';
import { UserService } from 'src/app/servicios/user.service';


@Component({
  selector: 'app-anunciar',
  templateUrl: './anunciar.component.html',
  styleUrls: ['./anunciar.component.css']
})
export class AnunciarComponent implements OnInit {
  perfil: User = {}
  formPerfil= this.fb.group({
    id:[''],
    nombre:[''],
    apellidos:[''],
    password:[''],
    poblacion:[''],
    provincia:[''],
    email:[''],
    telefono:[''],
    foto:[''],
  })
  formAnunciar= this.fb.group({
    titulo:[''],
    texto:[''],
    precio:[''],
    idanunciante:[''],
    fotoanu:['http://localhost/EL_TRABAJAZO/backend/images/SIN-IMAGEN.jpg'],
    categoria:['']
  })
  

  mensaje: string=''
  constructor(private fb:FormBuilder, private servicioAnuncio:AnuncioService, private servicioUsuario:UserService, private irHacia:Router) { }

  ngOnInit(): void {
  }
  cargarPerfil(): void{
    this.servicioUsuario.obtenerPerfil().subscribe(
      respuesta => {
        console.log(respuesta)
        this.perfil = respuesta
        this.formPerfil.patchValue(respuesta)
      },
      error => console.log(error)
    )
  }
  
  submit(): void{
    if(this.formAnunciar.value.titulo == ""){
      this.mensaje="Debes rellenar el titulo del anuncio"

    }else{
      this.servicioAnuncio.anunciar(this.formAnunciar.value).subscribe(
        respuesta =>{
          console.log(respuesta)
         
          this.irHacia.navigate(['/home'])
        },
        error => {
          console.log(error)
          this.mensaje=error.error.error
        }
      )
    }
  }
}
