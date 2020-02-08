import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Members } from "./members";
import { format, formatDistanceToNow } from "date-fns";

@Injectable({
  providedIn: "root"
})
export class MembersService {
  constructor(private http: HttpClient) {}

  public async datatable(query: Object) {
    return this.http
      .post("http://localhost:3001/members/datatable", {
        ...query
      })
      .toPromise();
  }

  public async create(data: Members) {
    return this.http.post("http://localhost:3001/members", data).toPromise();
  }

  public async delete(hn: string) {
    return this.http.delete(`http://localhost:3001/members/${hn}`).toPromise();
  }

  public async update(data: Members) {
    return this.http
      .put(`http://localhost:3001/members/${data.hn}`, data)
      .toPromise();
  }

  formatBirtDate(value: string) {
    const getBirtDate = format(new Date(value), "dd/MM/yyyy").split("/");
    getBirtDate[2] = `${Number(getBirtDate[2]) + 543}`;
    const birtDate = getBirtDate.join("-");

    let getAge = formatDistanceToNow(new Date(value), {
      addSuffix: false
    }).split(" ");
    const age = getAge[1];
    return `${birtDate} (${age} ปี)`;
  }
}
