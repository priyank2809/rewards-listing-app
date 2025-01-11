import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Reward } from '../models/reward.interface';

@Injectable({
    providedIn: 'root'
})
export class RewardsService {
    private rewardsData: Reward[] = [
        {
            pk: 1,
            name: "FairPrice $20 Voucher",
            points: 200,
            display_img_url: "assets/images/fairprice.png",
            quantity: 100,
            valid_until: "2024-12-31T00:00:00",
            low_quantity: 20,
        },
        {
            pk: 2,
            name: "Grab $10 Voucher",
            points: 150,
            display_img_url: "assets/images/grab.png",
            quantity: 5,
            valid_until: "2024-06-30T00:00:00",
            low_quantity: 10,
        },
        {
            pk: 3,
            name: "Decathlon Gift Card",
            points: 300,
            display_img_url: "assets/images/decathlon.png",
            quantity: 0,
            valid_until: "2024-09-30T00:00:00",
            low_quantity: 15,
        },
        {
            pk: 4,
            name: "Amazon $50 Voucher",
            points: 500,
            display_img_url: "",
            quantity: 50,
            valid_until: "2024-12-31T00:00:00",
            low_quantity: 10,
        }
    ];

    private rewardsSubject = new BehaviorSubject<Reward[]>(this.rewardsData);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    constructor() { }

    getRewards(): Observable<Reward[]> {
        this.loadingSubject.next(true);

        return of(this.rewardsData).pipe(
            delay(1000),
            map(rewards => {
                this.loadingSubject.next(false);
                return rewards;
            })
        );
    }

    getLoading(): Observable<boolean> {
        return this.loadingSubject.asObservable();
    }

    searchRewards(query: string): Observable<Reward[]> {
        this.loadingSubject.next(true);

        const filteredRewards = this.rewardsData.filter(reward =>
            reward.name.toLowerCase().includes(query.toLowerCase())
        );
        return of(filteredRewards).pipe(
            delay(500),
            map(rewards => {
                this.loadingSubject.next(false);
                return rewards;
            })
        );
    }

    sortRewards(order: 'asc' | 'desc'): void {
        const sortedRewards = [...this.rewardsData].sort((a, b) => {
            return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        });
        this.rewardsSubject.next(sortedRewards);
    }
}