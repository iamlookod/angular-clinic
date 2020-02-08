import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import { Medicines } from "./medicines";

@Injectable({
  providedIn: "root"
})
export class MedicinesService {
  constructor(private http: HttpClient) {}

  public async getMedicines(query) {
    return this.http
      .post("http://localhost:3001/medicines/datatable", {
        ...query
      })
      .toPromise();
  }

  public async create(data) {
    return this.http.post("http://localhost:3001/medicines", data).toPromise();
  }

  public async delete(hn) {
    return this.http
      .delete(`http://localhost:3001/medicines/${hn}`)
      .toPromise();
  }

  public async update(data) {
    return this.http
      .put(`http://localhost:3001/medicines/${data.hn}`, data)
      .toPromise();
  }
}
