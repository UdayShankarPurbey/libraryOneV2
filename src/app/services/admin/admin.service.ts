import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { endPoints } from '../../core/endpoints';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
  ) { }

  addAdmin(body : any) {
    return this.http.post(`${environment.apiUrl + endPoints.addAdmin}` , body);
  }

  loginAdmin(body : any) {
    return this.http.post(`${environment.apiUrl + endPoints.loginAdmin}` , body);
  }

  logoutAdmin() {
    return this.http.get(`${environment.apiUrl + endPoints.logoutAdmin}`);
  }

  updateAdmin(body : any) {
    return this.http.patch(`${environment.apiUrl + endPoints.updateAdmin}`,body);
  }

  getAdmin() {
    return this.http.get(`${environment.apiUrl + endPoints.getAdmins}`);
  }

  deleteAdmin(id : any) {
    return this.http.delete(`${environment.apiUrl + endPoints.deleteAdmin}`);
  }

  
}
