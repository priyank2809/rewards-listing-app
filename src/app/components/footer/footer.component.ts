import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
    currentYear = new Date().getFullYear();
    version = '2.2.2';

    aboutLinks = [
        { text: 'Contact Us', url: '#' },
        { text: 'Privacy', url: '#' },
        { text: 'Terms of Use', url: '#' }
    ];
}
