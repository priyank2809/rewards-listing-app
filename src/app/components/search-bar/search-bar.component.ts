import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent {
    @Output() search = new EventEmitter<string>();

    onSearch(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.search.emit(value);
    }
}
