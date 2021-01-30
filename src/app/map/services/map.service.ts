import { Injectable } from '@angular/core';
import { GeoLocation, Hospital, HospitalClosest } from 'src/app/hospital/models/hospital';

@Injectable({
  providedIn: 'root'
})
export class MapService { 
  //apiKey='';
  constructor() { }

  getApiKey(){
    //return this.apiKey;
  }

  addMarkerToMap(myPosition: google.maps.LatLngLiteral, iconMarkerAmbulance: string): any {
    return {
      position: {
        lat: myPosition.lat,
        lng: myPosition.lng,
      },
      label: {
        color: 'red',
        text: 'Mi posición actual'
      },
      title: 'Usted se encuentra aquí',
      info: 'Info detallada ',    
      // draggable: true,
       
      options: {
        animation: google.maps.Animation.BOUNCE, //DROP
        icon: iconMarkerAmbulance,  
      },
    }
  }
   
/** Radio de la tierra en kilómetros km  */
  radiusHeart = 6371; 

/**
 * Compara dos puntos y obtiene la distancia
 * @param myLat latitud de mi posicion
 * @param myLng longitud de mi posicion
 * @param markerLat latitud del marcador contra el cual es comparado
 * @param markerLng longitud del marcador contra el cual es comparado
 * @returns distancia entre los dos puntos comparados
 */
  calcDistance(myLat: number, myLng: number, markerLat: number, markerLng: number): number{ 
    const dLat  = this.rad(markerLat - myLat);
    const dLong = this.rad(markerLng - myLng);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.rad(myLat)) * Math.cos(this.rad(myLat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return this.radiusHeart * c; 
  }
/**
 * Obtiene el hospital más cercano 
 * @param hospitalData arrays de los hospitales a comparar
 * @param myPosition posición con lat y lng a utilizar para buscar el hospital más cercano a esta
 * 
 * @returns hospital más cercano, distancia y ID
 */  
  getHospitalClosest(hospitalData: Hospital[], myPosition: GeoLocation): HospitalClosest{
    let distance: number;
    let closest: string = '-999' ; 
    let closestDist: number = 99999999;
    for(let hospital of hospitalData){ 

      distance = this.calcDistance(myPosition.lat, myPosition.lng, hospital.location.lat, hospital.location.lng);

      if ( closest === '-999' || distance < closestDist ) {
        closestDist = distance;
        return { 
          closestDist : distance,
          hospitalClosest: hospital
        }
      }
    }
    
  }
 

  rad(degrees: number): number { 
    return degrees * (Math.PI/180);
  }


}
