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
}
