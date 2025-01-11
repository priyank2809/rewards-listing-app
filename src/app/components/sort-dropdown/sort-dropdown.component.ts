import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort-dropdown',
  templateUrl: './sort-dropdown.component.html',
  styleUrls: ['./sort-dropdown.component.scss']
})

export class SortDropdownComponent {
  @Output() sortChange = new EventEmitter<'asc' | 'desc'>();
  isOpen = false;

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  sort(order: 'asc' | 'desc'): void {
    this.sortChange.emit(order);
    this.isOpen = false;
  }
}
