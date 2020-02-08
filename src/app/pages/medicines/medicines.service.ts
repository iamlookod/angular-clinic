import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Medicines } from "./medicines";

@Injectable({
  providedIn: "root"
})
export class MedicinesService {
  constructor(private http: HttpClient) {}

  public async getMedicines(query: Object) {
    return this.http
      .post("http://localhost:3001/medicines/datatable", {
        ...query
      })
      .toPromise();
  }

  public async create(data: Medicines) {
    return this.http.post("http://localhost:3001/medicines", data).toPromise();
  }

  public async delete(_id: string) {
    return this.http
      .delete(`http://localhost:3001/medicines/${_id}`)
      .toPromise();
  }

  public async update(data: Medicines) {
    return this.http
      .put(`http://localhost:3001/medicines/${data._id}`, data)
      .toPromise();
  }
}
