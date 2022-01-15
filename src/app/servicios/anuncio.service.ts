import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../clases/anuncio';

const url = 'http://localhost/EL_TRABAJAZO/backend/anuncios/'
@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  constructor(private http:HttpClient) { }

  anunciar(anuncio: Anuncio): Observable<any>{
    return this.http.post(url, anuncio)
  }
  listarAnuncios(): Observable<any>{
    return this.http.get(url+'list/')
  }
  buscarAnuncio(entrada:string): Observable<any>{
    return this.http.get(url +'list/'+'?busqueda='+ entrada)
  }
  subirImagen(entrada): Observable<any>{
    return this.http.post(url+'image/', entrada) 
   }
   eliminarAnuncio(): Observable<any>{
    return this.http.delete(url)
  }
}
