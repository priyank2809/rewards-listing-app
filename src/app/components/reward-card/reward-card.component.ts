import { Component, Input } from '@angular/core';
import { Reward } from '../../models/reward.interface';

@Component({
    selector: 'app-reward-card',
    templateUrl: './reward-card.component.html',
    styleUrls: ['./reward-card.component.scss']
})

export class RewardCardComponent {
    @Input() reward!: Reward;

    get stockStatus(): string {
        if (this.reward.quantity === 0) {
            return 'Out of Stock';
        }
        if (this.reward.quantity <= this.reward.low_quantity) {
            return `ON High Demand (Only ${this.reward.quantity} rewards left)`;
        }
        return '';
    }

    get imageUrl(): string {
        return this.reward.display_img_url || '/assets/images/placeholder.png';
    }
}
