import { HttpClient } from "@angular/common/http";

import { BaseDataService } from "./base-data.service";

describe("BaseDataService", () => {
  let http: jasmine.SpyObj<HttpClient>;
  let service: BaseDataService<any>;

  beforeEach(() => {
    http = jasmine.createSpyObj("HttpClient", ["get", "post", "put", "delete"]);
    service = new BaseDataService<any>(http);
  });

  it("fetchOne uses GET by id", () => {
    service.fetchOne(5);
    expect(http.get).toHaveBeenCalledWith("http://localhost/api/5");
  });

  it("fetchAll uses GET on collection endpoint", () => {
    service.fetchAll();
    expect(http.get).toHaveBeenCalledWith("http://localhost/api/");
  });

  it("persist uses POST when entity has no id", () => {
    const entity = { name: "item" };
    service.persist(entity);
    expect(http.post).toHaveBeenCalledWith("http://localhost/api/", entity);
  });

  it("persist uses PUT when entity has id", () => {
    const entity = { id: 9, name: "item" };
    service.persist(entity);
    expect(http.put).toHaveBeenCalledWith("http://localhost/api/9", entity);
  });

  it("remove uses DELETE by entity id", () => {
    const entity = { id: 3 };
    service.remove(entity);
    expect(http.delete).toHaveBeenCalledWith("http://localhost/api/3");
  });
});
