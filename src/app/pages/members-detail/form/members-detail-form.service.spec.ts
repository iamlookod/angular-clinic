import { TestBed } from "@angular/core/testing";

import { MembersDetailFormService } from "./members-detail-form.service";

describe("MembersDetailFormService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: MembersDetailFormService = TestBed.get(
      MembersDetailFormService
    );
    expect(service).toBeTruthy();
  });
});
