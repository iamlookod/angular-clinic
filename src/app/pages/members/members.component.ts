import { Component, OnInit } from "@angular/core";
import { MembersService } from "./members.service";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "app-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.scss"]
})
export class MembersComponent implements OnInit {
  constructor(
    private membersApi: MembersService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
    this.searchValueChange
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe(value => {
        this.searchValue = value;
        this.getMembers(this.query());
      });
  }

  validateForm: FormGroup;
  hn = "";
  members;
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

  async getMembers(query) {
    this.members = await this.membersApi.getMembers(query);

    this.memberData = [...this.members.docs];
    this.pageTotal = this.members.totalDocs;
    this.isLoading = false;
  }

  deleteMember(hn) {
    this.membersApi
      .delete(hn)
      .then(() => {
        this.getMembers(this.query());
        this.createMessage("success", "ลบข้อมูลสำเร็จ");
      })
      .catch(() => this.createMessage("error", "ไม่สามารถลบข้อมูล"));
  }

  submitForm(): void {
    let validate = [];
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();

      if (this.validateForm.controls[i].status === "INVALID") validate.push(i);
    }

    if (validate.length === 0) this.handleOk();
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

  showModal(data): void {
    if (data)
      this.validateForm.setValue({
        hn: data.hn,
        name: data.name,
        address: data.address,
        birtdate: data.birtdate,
        disease: data.disease,
        allegric: data.allegric
      });
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;

    if (!this.validateForm.get("hn").value) {
      this.membersApi
        .create(this.validateForm.getRawValue())
        .then(result => {
          this.isVisible = false;
          this.isOkLoading = false;
          this.createMessage("success", "บันทึกข้อมูลสำเร็จ");
          this.getMembers(this.query());
        })
        .catch(() => this.createMessage("error", "ไม่สามารถบันทึกข้อมูล"));
    } else {
      this.membersApi
        .update(this.validateForm.getRawValue())
        .then(result => {
          this.isVisible = false;
          this.isOkLoading = false;
          this.createMessage("success", "บันทึกข้อมูลสำเร็จ");
          this.getMembers(this.query());
        })
        .catch(() => this.createMessage("error", "ไม่สามารถบันทึกข้อมูล"));
    }
  }

  handleCancel(): void {
    this.validateForm.reset();
    this.isVisible = false;
  }

  onSearchChange($event) {
    this.isLoading = true;
    this.searchValueChange.next($event);
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

  currentPageDataChange($event): void {
    this.memberData = $event;
  }

  createMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      hn: [null],
      name: [null, [Validators.required]],
      address: [null],
      birtdate: [null],
      disease: [null],
      allegric: [null]
    });

    this.getMembers(this.query());
  }
}
