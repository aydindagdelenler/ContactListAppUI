import { Injectable } from '@angular/core';
import {Contact} from "../models/contact.model";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const baseUrl = 'http://localhost:8080/contact/';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getAll(page: number, size: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(baseUrl+'?currentPage='+(page-1)+'&itemsPerPage='+size, this.buildHeaders());
  }

  findByName(name: string, page: number, size: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(baseUrl+'name?name='+name+'&currentPage='+(page-1)+'&itemsPerPage='+size, this.buildHeaders());
  }

  private buildHeaders() {
    return {
      headers: new HttpHeaders()
      .append('Content-type', 'application/json')
      .append('Accept', 'application/json')
      .append('Access-Control-Allow-Origin', 'http://localhost:8080')
      .append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
      .append('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
      .append('Access-Control-Allow-Credentials', "true"),
    };
  }
}
