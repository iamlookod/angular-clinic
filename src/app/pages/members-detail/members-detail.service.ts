import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import { MembersDetail } from "./membersDetail";

@Injectable({
  providedIn: "root"
})
export class MembersDetailService {
  constructor(private http: HttpClient) {}

  public async getMembersDetail(query) {
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
