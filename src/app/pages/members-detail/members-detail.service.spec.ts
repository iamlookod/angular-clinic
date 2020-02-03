import { TestBed } from "@angular/core/testing";

import { MembersDetailService } from "./members-detail.service";

describe("MembersDetailService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: MembersDetailService = TestBed.get(MembersDetailService);
    expect(service).toBeTruthy();
  });
});
