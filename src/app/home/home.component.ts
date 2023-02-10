import { Component, OnInit } from '@angular/core';
import { LocalData } from '../models/local.model';
import { WeatherData } from '../models/weather.model';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}

  cityName?: string;
  weatherData: WeatherData;
  local?: LocalData;

  ngOnInit(): void {
    var obj = {
      location: {
        name: 'Teste',
        region: 'Distrito Federal',
        country: 'Brazil',
        lat: -15.78,
        lon: -47.92,
        tz_id: 'America/Sao_Paulo',
        localtime_epoch: 1668741934,
        localtime: '2022-11-18 22:25',
      },
      current: {
        last_updated_epoch: 1668741300,
        last_updated: '2022-11-18 00:15',
        temp_c: 14.0,
        temp_f: 71.6,
        is_day: 1,
        condition: {
          text: 'Partly cloudy',
          icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
          code: 1003,
        },
        wind_mph: 2.2,
        wind_kph: 3.6,
        wind_degree: 60,
        wind_dir: 'ENE',
        pressure_mb: 1016.0,
        pressure_in: 30.0,
        precip_mm: 0.0,
        precip_in: 0.0,
        humidity: 78,
        cloud: 75,
        feelslike_c: 24.6,
        feelslike_f: 76.2,
        vis_km: 10.0,
        vis_miles: 6.0,
        uv: 1.0,
        gust_mph: 7.2,
        gust_kph: 11.5,
      },
    };
    this.weatherData = obj;
  }

  onSubmit() {
    this.getLocalData(this.cityName);
    this.cityName = '';
  }

  private getWeatherData(lat: string, lon: string) {
    this.weatherService.getWeatherData(lat, lon).subscribe({
      next: (response) => {
        this.weatherData = response;
      },
    });
  }

  private getLocalData(cityName: string) {
    this.weatherService.getLocal(cityName).subscribe({
      next: (response) => {
        this.local = response;
        var adress = `${this.local.Results[0].latitude.toString()},${this.local.Results[0].longitude.toString()}`;
        console.log('adress: ', adress);
        this.getWeatherData(
          this.local.Results[0].latitude.toString(),
          this.local.Results[0].longitude.toString()
        );
      },
    });
  }
}
