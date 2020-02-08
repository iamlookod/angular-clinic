import { Component, OnInit } from "@angular/core";
import { MedicinesService } from "./medicines.service";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "app-medicines",
  templateUrl: "./medicines.component.html",
  styleUrls: ["./medicines.component.scss"]
})
export class MedicinesComponent implements OnInit {
  constructor(
    private medicinesApi: MedicinesService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
    this.searchValueChange
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe(value => {
        this.searchValue = value;
        this.getMedicines(this.query());
      });
  }

  form: FormGroup;
  medicines;
  medicinesData = [];
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

  async getMedicines(query: Object) {
    this.medicines = await this.medicinesApi.getMedicines(query);

    this.medicinesData = [...this.medicines.docs];
    this.pageTotal = this.medicines.totalDocs;
    this.isLoading = false;
  }

  deleteMedicine(hn: string) {
    this.medicinesApi
      .delete(hn)
      .then(() => {
        this.getMedicines(this.query());
        this.createMessage("success", "ลบข้อมูลสำเร็จ");
      })
      .catch(() => this.createMessage("error", "ไม่สามารถลบข้อมูล"));
  }

  submitForm(): void {
    let validate = [];
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();

      if (this.form.controls[i].status === "INVALID") validate.push(i);
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
      this.form.setValue({
        _id: data._id,
        name: data.name,
        type: data.type,
        description: data.description
      });
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;

    if (!this.form.get("_id").value) {
      this.medicinesApi
        .create(this.form.getRawValue())
        .then(result => {
          this.isVisible = false;
          this.isOkLoading = false;
          this.createMessage("success", "บันทึกข้อมูลสำเร็จ");
          this.getMedicines(this.query());
        })
        .catch(() => this.createMessage("error", "ไม่สามารถบันทึกข้อมูล"));
    } else {
      console.log(this.form.getRawValue());
      this.medicinesApi
        .update(this.form.getRawValue())
        .then(result => {
          this.isVisible = false;
          this.isOkLoading = false;
          this.createMessage("success", "บันทึกข้อมูลสำเร็จ");
          this.getMedicines(this.query());
        })
        .catch(() => this.createMessage("error", "ไม่สามารถบันทึกข้อมูล"));
    }
  }

  handleCancel(): void {
    this.form.reset();
    this.isVisible = false;
  }

  onSearchChange($event) {
    this.isLoading = true;
    this.searchValueChange.next($event);
  }

  async onSort($event) {
    this.sortName = $event.key;
    this.sortValue = $event.value;

    this.getMedicines(this.query());
  }

  pageSizeChange($event): void {
    this.pageSize = $event;
    this.getMedicines(this.query());
  }

  pageChange($event): void {
    this.offset = ($event - 1) * this.pageSize;
    this.getMedicines(this.query());
  }

  currentPageDataChange($event): void {
    this.medicinesData = $event;
  }

  createMessage(type: string, text: string): void {
    this.message.create(type, text);
  }

  ngOnInit() {
    this.form = this.fb.group({
      _id: [null],
      name: [null, [Validators.required]],
      type: [null],
      description: [null]
    });

    this.getMedicines(this.query());
  }
}
