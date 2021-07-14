import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AnuncioService } from 'src/app/servicios/anuncio.service';

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
    idanunciante:[''],
  })

  constructor(private fb:FormBuilder, private servicioAnuncio:AnuncioService, private irHacia:Router) { }

  ngOnInit(): void {
  }
  submit(): void{
    
      this.servicioAnuncio.anunciar(this.formAnunciar.value).subscribe(
        respuesta =>{
          console.log(respuesta)
         
          this.irHacia.navigate(['/home'])
        },
        error => console.log(error)
      )
    
  }
}
