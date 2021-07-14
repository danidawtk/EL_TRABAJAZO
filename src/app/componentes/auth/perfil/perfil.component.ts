import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { UserService } from 'src/app/servicios/user.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
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
  formImagen = this.fb.group({
    imagen: ['', Validators.required]
  })
  constructor(private servicioUsuario:UserService, private fb:FormBuilder, private irHacia:Router) { }

  ngOnInit(): void {
    this.cargarPerfil()
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
}
