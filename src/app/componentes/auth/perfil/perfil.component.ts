import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { UserService } from 'src/app/servicios/user.service';
import { AnuncioService } from 'src/app/servicios/anuncio.service';
import { Anuncio } from 'src/app/clases/anuncio';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  anuncios: Anuncio[] = []
  
  mensaje: string = ''
  perfil: User = {}
  mostrarEditar: boolean = false
  mostrarEliminar: boolean = false
  inputBorrar: string = ''
  formPerfil= this.fb.group({
    nombre:[''],
    apellidos:[''],
    password:[''],
    poblacion:[''],
    provincia:[''],
    email:[''],
    telefono:[''],
    foto:[''],
  })
  formNuevo: FormGroup = new FormGroup({
    idanu: new FormControl(),
    titulo: new FormControl("", Validators.required),
    texto: new FormControl("", Validators.required),
    precio: new FormControl("", Validators.required),
    categoria: new FormControl("", Validators.required)
  })
  formImagen = this.fb.group({
    imagen: ['', Validators.required]
  })
  formImagenanu = this.fb.group({
    imagenanu: ['', Validators.required]
  })
  
  constructor(private servicioUsuario:UserService, private fb:FormBuilder, private irHacia:Router, private servicioAnuncio:AnuncioService) { }

  ngOnInit(): void {
    this.cargarPerfil()
    this.obtenerTusAnuncios()
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
editarPerfil(): void{
  this.servicioUsuario.editarPerfil(this.formPerfil.value).subscribe(
    respuesta => {
      console.log(respuesta)
      this.cargarPerfil()
      this.mostrarEditar = false
    },
    error => {console.log(error)
      this.mensaje=error.error.error}
  )
}
eliminarUsuario(): void{
  this.servicioUsuario.eliminarUsuario().subscribe(
    respuesta => {
      console.log(respuesta)
      this.servicioUsuario.logOut()
      this.irHacia.navigate(['/login'])
    },
    error => console.log(error)
  )
}
cambiaImagen(evento): void{
  if(evento.target.files){
    this.formImagen.get('imagen').setValue(evento.target.files[0])
  }
}

cambiaImagenanu(evento): void{
  if(evento.target.files){
    this.formImagenanu.get('imagenanu').setValue(evento.target.files[0])
  }
}

subirImagen(): void{
  const formData = new FormData()
  formData.append('imagen', this.formImagen.get('imagen').value)
  this.servicioUsuario.subirImagen(formData).subscribe(
    respuesta => {
      console.log(respuesta)
      this.cargarPerfil()
    },
    error => {console.log(error)}
  )
}
subirImagenanu(): void{
  const formData = new FormData()
  formData.append('imagenanu', this.formImagenanu.get('imagenanu').value)
  this.servicioAnuncio.subirImagenanu(formData).subscribe(
    respuesta => {
      console.log(respuesta)
      this.cargarPerfil()
    },
    error => {console.log(error)}
  )
}
foto: File
tengoFoto(evento): void{
  if(evento.target.files){
    this.foto = evento.target.files[0]
  }
}
subirFoto(): void{
  const formData = new FormData()
  formData.append('imagen', this.foto)
  this.servicioUsuario.subirImagen(formData).subscribe(
    respuesta => {
      console.log(respuesta)
      this.cargarPerfil()
    },
    error => {console.log(error)}
  )
}
obtenerTusAnuncios():void{
  this.servicioAnuncio.leerTusAnuncios().subscribe(
    respuesta =>{
      console.log(respuesta)
      this.anuncios=respuesta
    },
    error => {console.log(error)}
  )
  
}

editarAnun(): void{
  this.servicioAnuncio.editarAnu(this.formNuevo.value).subscribe(
    respuesta => {
      console.log(respuesta)
      
      this.obtenerTusAnuncios()
    },
    error => {console.log(error)}
  )
}
eliminarAnuncio(): void{
  this.servicioAnuncio.borrarAnuncio(this.formNuevo.value.idanu).subscribe(
    respuesta => {console.log(respuesta)
    this.formNuevo.reset()
    this.obtenerTusAnuncios()
    },
    error => {console.log(error)}
  )
}
}
