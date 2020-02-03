import { Component, OnInit } from "@angular/core";
import { MembersDetailService } from "./members-detail.service";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-members-detail",
  templateUrl: "./members-detail.component.html",
  styleUrls: ["./members-detail.component.scss"]
})
export class MembersDetailComponent implements OnInit {
  constructor(private membersDetailApi: MembersDetailService) {
    this.searchValueChange
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe(value => {
        this.searchValue = value;
        this.getMembersDetail(this.query());
      });
  }

  form: FormGroup;
  hn = "";
  membersDetail;
  memberData = [];
  pageTotal = 0;
  pageSize = 10;
  offset = 0;
  isLoading: boolean = false;
  searchValue: string | null = null;
  searchValueChange: Subject<string> = new Subject();
  sortName: string | null = null;
  sortValue: string | null = null;

  // Modal state
  isVisible = false;
  isOkLoading = false;

  async getMembersDetail(query) {
    this.membersDetail = await this.membersDetailApi.getMembersDetail(query);

    this.memberData = [...this.membersDetail.docs];
    this.pageTotal = this.membersDetail.totalDocs;
    this.isLoading = false;
  }

  query() {
    let query = {};
    if (this.searchValue) query = { ...query, search: this.searchValue };
    if (this.sortValue)
      query = {
        ...query,
        sort: {
          field: this.sortName,
          orderBy: this.sortValue === "ascend" ? "asc" : "desc"
        }
      };
    if (this.pageSize) query = { ...query, limit: this.pageSize };
    if (this.offset) query = { ...query, offset: this.offset };

    return query;
  }

  onSearchChange($event) {
    this.isLoading = true;
    this.searchValueChange.next($event);
  }

  async onSort($event) {
    this.sortName = $event.key;
    this.sortValue = $event.value;

    this.getMembersDetail(this.query());
  }

  pageSizeChange($event): void {
    this.pageSize = $event;
    this.getMembersDetail(this.query());
  }

  pageChange($event): void {
    this.offset = ($event - 1) * this.pageSize;
    this.getMembersDetail(this.query());
  }

  currentPageDataChange($event): void {
    this.memberData = $event;
  }

  ngOnInit() {
    this.getMembersDetail(this.query());
  }
}
