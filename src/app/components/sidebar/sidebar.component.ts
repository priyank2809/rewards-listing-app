import { Component } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {
    categories = [
        { name: 'e-Voucher', selected: true },
        { name: 'Products', selected: false },
        { name: 'Evergreen', selected: false },
        { name: 'Fashion & Retail', selected: false }
    ];
}
