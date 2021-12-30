import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister= this.fb.group({
    nombre:['', [Validators.required]],
    apellidos:[''],
    password:[''],
    password2:[''],
    email:['', [Validators.required, Validators.email]],
    poblacion:[''],
    provincia:[''],
    telefono:[''],
  })
  errorpass: string=''
  constructor(private fb:FormBuilder, private servicioUsuario:UserService, private irHacia:Router) { }

  ngOnInit(): void {
    
  }
submit(): void{
   if(this.formRegister.value.password != this.formRegister.value.password2){
    this.errorpass="Las contraseñas deben ser las mismas"
   }
   else{
    this.servicioUsuario.registrar(this.formRegister.value).subscribe(
      respuesta =>{
        console.log(respuesta)
        this.servicioUsuario.guardarToken(respuesta)
        this.irHacia.navigate(['/perfil'])
      },
      error => {
        console.log(error)
        this.errorpass=error.error.error
      }
    )
   }

  
}
}
