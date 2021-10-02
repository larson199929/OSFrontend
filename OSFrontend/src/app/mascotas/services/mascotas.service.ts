import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Mascota } from '../model/mascota';
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  //Mascotas Endpoint
  basePath = 'http://localhost:3000/api/v1/mascotas';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  //API Error Handling
  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      // Default error handling
      console.log(`An error occurred: ${error.error.message}`)
    } else {
      // Unsuccessful response error code returned from backend
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return Observable with Error Message to Client
    return throwError('Something happened with request, please try again later');
  }

  //Create Mascota
  create(item: any): Observable<Mascota>{
    return this.http.post<Mascota>(this.basePath, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  //Get Mascota by id
  getById(id: any): Observable<Mascota>{
    return this.http.get<Mascota>(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  //Get All Mascotas
  getAll(): Observable<Mascota>{
    return this.http.get<Mascota>(this.basePath, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  //Update Mascota
  update(id: any, item: any): Observable<Mascota>{
    return this.http.put<Mascota>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  //Delete Mascota
  delete(id: any){
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }
}
