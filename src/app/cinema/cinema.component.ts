import { Component, OnDestroy, OnInit } from '@angular/core';
import { CinemaService } from '../cinema.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit, OnDestroy {





  public cities: any;
  public cinemas: any;
  public theaters: any;

  public currentCity: any;
  public currentCinema: any;
  public currentProjection: any;

  public selectedTickets:any[] = new Array();

  public host:any;

  constructor(private cinemaService : CinemaService){
    this.host=this.cinemaService.API_URL;
  }

  ngOnInit(): void {
   this.getCities();
  }
  ngOnDestroy(): void {
     
  }


  getCities(){
    this.cinemaService.getCities().subscribe({
      next: data => {
       // console.log(data);
        this.cities = data;
    },
    error: error => {
      // console.log(error)
    },
  });
  }


  onGetCinema(city:any){
    this.currentCity=city;
    this.theaters=null;
    this.cinemaService.getCinemasOfCityByID(city.id).subscribe({
      next: data=>{
        //console.log(data);
        this.cinemas=data;
      },
      error: error=>{
        //console.log(error)
      },
    });
  }

  onGetTheaters(cinema:any){
      this.currentCinema=cinema;
      this.currentProjection=undefined;
      this.cinemaService.getTheatersOfCinemyByID(cinema.id).subscribe({
        next: data=>{
          //console.log(data);
          this.theaters= data;

          this.theaters.forEach((theater:any) => {
             
            this.cinemaService.getProjectionsOfTheaterByID(theater.id).subscribe({
              next: data=>{
                theater.projections=data;
                //console.log(theater);
              },
              error: error=>{
                //console.log(error);
              }
            });
          });

        },
        error: error=>{
          //console.log(error);
        },
      });
  }


  onGetTicketPlaces(projection: any) {
    this.currentProjection = projection;
    this.cinemaService.getTicketsPlacesOfProjectionByID(projection.id).subscribe({
      next: data=>{
          this.currentProjection.tickets=data.content;
          this.selectedTickets=[];
         //console.log(this.currentProjection);
      },
      error: error=>{
        console.log(error);
      }
    })  
  }

  getTicketClass(ticket: any) {
    // [ngClass]="ticket.reserved == true ? 'btn btn-secondary' :'btn btn-success'"
    let btnClass="btn ticket"
    if(ticket.reserved){
      btnClass+=" btn-danger"
    }else if(ticket.selected){
      btnClass+=" btn-warning"
    }else {
      btnClass+=" btn-success";
    }
    return btnClass;
  }
  onSelectTicket(ticket: any) {
    if(!ticket.selected){
      ticket.selected=true;
      this.selectedTickets.push(ticket);
    }else{
      ticket.selected=false;
      this.selectedTickets.splice(this.selectedTickets.indexOf(ticket),1);
    }

    //console.log(this.selectedTickets);
    
  }


  onPayTickets(formValues:any) {
    let ticketsList: any[] = [];
    this.selectedTickets.forEach(ticket=>{
      ticketsList.push(ticket.id);
    });
    formValues.tickets=ticketsList;

    console.log(formValues);
    this.cinemaService.payTickets(formValues).subscribe({
      next: data=>{
        alert("Tickets payed successfully");
        this.onGetTicketPlaces(this.currentProjection);
      },
      error: error=>{
        console.log(error);
      }
    });
  }

}
