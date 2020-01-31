import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import { Members } from "./members";

@Injectable({
  providedIn: "root"
})
export class MembersService {
  constructor(private http: HttpClient) {}

  public async getMembers(query) {
    return this.http
      .post("http://localhost:3001/members/datatable", {
        ...query
      })
      .toPromise();
  }

  public async create(data) {
    return this.http.post("http://localhost:3001/members", data).toPromise();
  }

  public async delete(hn) {
    return this.http.delete(`http://localhost:3001/members/${hn}`).toPromise();
  }

  public async update(data) {
    return this.http
      .put(`http://localhost:3001/members/${data.hn}`, data)
      .toPromise();
  }
}
