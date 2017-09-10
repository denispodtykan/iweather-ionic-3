import { WeatherProvider } from './../../providers/weather/weather';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather:any;
  location:{
    city:string,
    state:string
  }

  constructor(
    public navCtrl: NavController,
    private weatherProvider:WeatherProvider,
    private storage:Storage) {
    // this.weatherProvider.getWeather()
  }
  ionViewWillEnter(){
    this.storage.get('location').then(val=>{
      if(val != null){
        this.location = JSON.parse(val);
      } else{
        this.location = {
          city: 'Krasnodar',
          state: 'RU'
        }
      }

      this.weatherProvider.getWeather(this.location.city,this.location.state)
      .subscribe(weather =>{
        console.log(weather)
        // console.log(weather.list[0].name)
        this.weather = weather.current_observation;
      })
    })
  
  
  }
  

}
