import { Component } from '@angular/core';
import { ValidationService } from './service/validation.service';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from './service/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  departureCity: string ="";
  destinationCity: string= "";
  departureDate: any ;
  returnDate: any ;
  cabinClass: string = "All";
  adult: number = 0;
  children: number = 0;
  infants: number = 0;

  showResult: boolean = false;
  results: any = {};
  showWait: boolean = false;


  constructor(
    private validation: ValidationService,
    private searchService: SearchService,
    private toastr: ToastrService,
              ) { }

  searchCity(){

    if(this.returnDate  === undefined){
      this.returnDate = "";
    }
    const search ={
      header: {
          cookie: "ayaeh33y1nw4yjtm3fdr0gzq"
      },
      body: {
          origin_destinations: [
              {
                  departure_city: this.departureCity,
                  destination_city: this.destinationCity,
                  departure_date: String(this.departureDate),
                  return_date: String(this.returnDate)
              }
          ],
          search_param: {
              no_of_adult: this.adult,
              no_of_child: this.children,
              no_of_infant: this.infants,
              preferred_airline_code : "",
              calendar : false,
              cabin: this.cabinClass
          }
      }
  }

    // Reguired Field
    if (this.departureCity ==="" || this.destinationCity==="" || this.departureDate === "" ){
      this.toastr.error('Error sending form', 'Please fill in all fields', { timeOut: 3000 } );
      return false;
    }

    if(!this.validation.validateCap(this.destinationCity) || !this.validation.validateCap(this.departureCity)){
      this.toastr.error('Please ensure the destination and departure codes are in uppercase and not more that 3 characters ', 'Error!!!', { timeOut: 3000 } );
      return false;
    }

    if(!this.validation.validateDate(this.departureDate)){
      this.toastr.error('Please ensure you enter correct date format', 'Error!!!', { timeOut: 3000 } );
      return false;
    }


    this.showWait = true;

      // console.log(search);
      this.searchService.searchFlight(search).subscribe((data: any) => {
      if (data){
        this.showResult = true;
        this.showWait = false;
        this.departureCity = "";
        this.destinationCity = ""
        this.returnDate = null;
        this.departureDate = null;
        this.adult = 0;
        this.children = 0;
        this.infants = 0
        // console.log(data)
        this.results = data.body.data.itineraries;
      }
      else {

        this.showResult = false;
        this.showWait = false;

      }
    },
    error => {
      this.toastr.error("Flight information could not be fetched. Please ensure you fill all field correctly", 'Error!!!', {timeOut: 3000});

      this.showResult = false;
      this.showWait = false;
    })

  }
}
