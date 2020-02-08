import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { format, formatDistanceToNow } from "date-fns";

@Injectable({
  providedIn: "root"
})
export class MembersDetailService {
  constructor(private http: HttpClient) {}

  public async datatable(query: Object) {
    return this.http
      .post("http://localhost:3001/members/datatable", {
        ...query
      })
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
