import { Component, OnInit } from "@angular/core";
import { MembersService } from "./members.service";

@Component({
  selector: "app-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.scss"]
})
export class MembersComponent implements OnInit {
  constructor(private membersResult: MembersService) {}

  members: any;
  memberData = [];
  pageTotal = 0;
  pageSize = 10;
  offset = 0;
  isLoading: boolean = false;
  searchValue: string | null = null;
  sortName: string | null = null;
  sortValue: string | null = null;

  async getMembers(query) {
    this.isLoading = true;
    this.members = await this.membersResult.getMembers(query);
    this.memberData = [...this.members.docs];
    this.pageTotal = this.members.totalDocs;
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
    this.getMembers(this.query());
  }

  async onSort($event) {
    this.sortName = $event.key;
    this.sortValue = $event.value;

    this.getMembers(this.query());
  }

  pageSizeChange($event): void {
    this.pageSize = $event;
    this.getMembers(this.query());
  }

  pageChange($event): void {
    this.offset = ($event - 1) * this.pageSize;
    this.getMembers(this.query());
  }

  ngOnInit() {
    this.getMembers(this.query());
  }
}
