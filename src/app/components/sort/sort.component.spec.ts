import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsService } from '@services/products/products.service';

import { SortComponent } from './sort.component';

describe('SortComponent', () => {
  let component: SortComponent;
  let fixture: ComponentFixture<SortComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;

  beforeEach(async(() => {
    productsService = jasmine.createSpyObj('ProductsService', ['setSortOrder']);

    TestBed.configureTestingModule({
      declarations: [ SortComponent ],
      providers: [{ provide: ProductsService, useValue: productsService }]
    })
    .overrideComponent(SortComponent, { set: { template: '' } })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts with sort options hidden', () => {
    expect(component.showSortOptions).toBe(false);
  });

  it('toggles sort options visibility', () => {
    component.toggleSortOptions();
    expect(component.showSortOptions).toBe(true);

    component.toggleSortOptions();
    expect(component.showSortOptions).toBe(false);
  });

  it('sorts low to high', () => {
    component.showSortOptions = true;
    component.sortLowToHigh();
    expect(productsService.setSortOrder).toHaveBeenCalledWith('asc');
    expect(component.showSortOptions).toBe(false);
  });

  it('sorts high to low', () => {
    component.showSortOptions = true;
    component.sortHighToLow();
    expect(productsService.setSortOrder).toHaveBeenCalledWith('desc');
    expect(component.showSortOptions).toBe(false);
  });
});
