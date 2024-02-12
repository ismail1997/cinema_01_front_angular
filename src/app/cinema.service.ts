import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  
  public API_URL ="http://localhost:8383/api/v1";
  public CITIES_ENDPOINT = "/cities";
  public CINEMAS_ENDPOINT ="/cinemas";
  public THEATERS_ENDPOINT="/theaters";
  public PROJECTIONS_ENDPOINT="/projections"
  public TICKETS_ENDPOINT="/tickets";

  constructor(private httpClient : HttpClient) { }

  //get cities 
  public getCities(){
    return this.httpClient.get<any>(this.API_URL+this.CITIES_ENDPOINT);
  }


  public getCinemasOfCityByID(id:number){
    return this.httpClient.get<any>(`${this.API_URL}${this.CINEMAS_ENDPOINT}/city/${id}`);
  }


  public getTheatersOfCinemyByID(id:number){
    return this.httpClient.get<any>(`${this.API_URL}${this.THEATERS_ENDPOINT}/cinema/${id}`)
  }

  public getProjectionsOfTheaterByID(id:number){
    return this.httpClient.get<any>(`${this.API_URL}${this.PROJECTIONS_ENDPOINT}/theater/${id}`);
  }

  public getTicketsPlacesOfProjectionByID(id:number){
    return this.httpClient.get<any>(`${this.API_URL}${this.TICKETS_ENDPOINT}/projection/${id}`);
  }

  public payTickets(dataForm:any){
    return this.httpClient.post(`${this.API_URL}${this.TICKETS_ENDPOINT}/payTickets`,dataForm);
  }

  
}
