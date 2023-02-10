import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weather.model';
import { LocalData } from '../models/local.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getWeatherData(lat: string, lon: string): Observable<WeatherData> {
    return this.httpClient.get<WeatherData>(environment.weatherApiBaseUrl, {
      headers: new HttpHeaders()
        .set(
          environment.XRapidAPIHostHeaderName,
          environment.XRapidAPIHostHeaderNameValue
        )
        .set(
          environment.XRapidAPIKeyHeaderName,
          environment.XRapidAPIKeyHeaderNameValue
        ),
      params: new HttpParams().set('q', `${lat},${lon}`),
    });
  }

  getLocal(cityName: string): Observable<LocalData> {
    return this.httpClient.get<LocalData>('https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi', {
      headers: new HttpHeaders()
        .set(
          environment.XRapidAPIHostHeaderName,
          'ca24613bedmshdb8c362ecba0242p12359fjsn337beb0c2285'
        )
        .set(
          environment.XRapidAPIKeyHeaderName,
          'address-from-to-latitude-longitude.p.rapidapi.com'
        ),
      params: new HttpParams().set('address', cityName),
    });
  }
}
