import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AnuncioService } from 'src/app/servicios/anuncio.service';
import { UserService } from 'src/app/servicios/user.service';


@Component({
  selector: 'app-anunciar',
  templateUrl: './anunciar.component.html',
  styleUrls: ['./anunciar.component.css']
})
export class AnunciarComponent implements OnInit {

  formAnunciar= this.fb.group({
    titulo:[''],
    texto:[''],
    precio:[''],
    idanunciante:['4'],
  })

  mensaje: string=''
  constructor(private fb:FormBuilder, private servicioAnuncio:AnuncioService, servicioUsuario:UserService,private irHacia:Router) { }

  ngOnInit(): void {
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
