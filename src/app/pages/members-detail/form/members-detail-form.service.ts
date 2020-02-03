import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MembersDetailForm } from "./members-detail-form";

@Injectable({
  providedIn: "root"
})
export class MembersDetailFormService {
  constructor(private http: HttpClient) {}

  public async getMembersDetail(query): Promise<MembersDetailForm | Object> {
    return this.http
      .post<MembersDetailForm | Object>(
        "http://localhost:3001/members/datatable",
        {
          ...query
        }
      )
      .toPromise();
  }

  public async getMembers(hn) {
    return this.http.get(`http://localhost:3001/members/${hn}`).toPromise();
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
