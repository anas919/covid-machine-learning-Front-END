import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient, private router: Router) { }

  uploadPicture(image: File){
    var placeData = new FormData();
    placeData.append('image_to_trait', image, 'title');
    // new Response(placeData).text().then(console.log)
    return this.http
      .post<{result: string}>('http://localhost:5000/show', placeData)
  }
}
