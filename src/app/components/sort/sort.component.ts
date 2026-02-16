import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

export type SortOrder = 'asc' | 'desc';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent {
  @Input() isMobile$?: Observable<boolean>;

  @Output() sortChange = new EventEmitter<SortOrder>();

  showSortOptions = false;

  toggleSortOptions() {
    this.showSortOptions = !this.showSortOptions;
  }

  sortLowToHigh() {
    this.sortChange.emit('asc');
    this.showSortOptions = false;
  }

  sortHighToLow() {
    this.sortChange.emit('desc');
    this.showSortOptions = false;
  }
}
