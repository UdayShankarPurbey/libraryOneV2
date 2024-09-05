import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { endPoints } from '../../core/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(
    private http: HttpClient,
  ) { }

  getManagementList() {
    return this.http.get(`${environment.apiUrl + endPoints.getAllManagement}`);
  }

}
