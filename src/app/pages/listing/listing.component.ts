import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RewardsService } from '../../services/rewards.service';
import { Reward } from '../../models/reward.interface';

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss']
})

export class ListingComponent implements OnInit, OnDestroy {

    rewards: Reward[] = [];
    loading = false;
    showSort = false;
    sortOrder: 'asc' | 'desc' | null = null;
    private searchSubject = new Subject<string>();
    private destroy$ = new Subject<void>();

    constructor(private rewardsService: RewardsService) {
        this.searchSubject.pipe(
            takeUntil(this.destroy$),
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(searchTerm => {
            this.filterRewards(searchTerm);
        });
    }

    ngOnInit(): void {
        this.loadRewards();
    }

    ngOnDestroy(): void {
        document.body.style.overflow = '';
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadRewards(): void {
        this.loading = true;
        this.rewardsService.getRewards()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (rewards) => {
                    this.rewards = rewards;
                    this.loading = false;
                },
                error: (error) => {
                    console.error('Error loading rewards:', error);
                    this.loading = false;
                }
            });
    }

    onSearch(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.searchSubject.next(value);
    }

    filterRewards(searchTerm: string): void {
        if (!searchTerm.trim()) {
            this.loadRewards();
            return;
        }

        this.loading = true;
        this.rewardsService.searchRewards(searchTerm)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (rewards) => {
                    this.rewards = rewards;
                    this.loading = false;
                },
                error: (error) => {
                    console.error('Error searching rewards:', error);
                    this.loading = false;
                }
            });
    }

    toggleSort(): void {
        this.showSort = !this.showSort;
        if (this.showSort) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    sort(order: 'asc' | 'desc'): void {
        this.sortOrder = order;
    }

    applySorting(): void {
        if (this.sortOrder) {
            this.rewards = [...this.rewards].sort((a, b) => {
                return this.sortOrder === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            });
        }
        this.showSort = false;
        document.body.style.overflow = '';
    }

    resetSort(): void {
        this.sortOrder = null;
        this.loadRewards();
        this.showSort = false;
        document.body.style.overflow = '';
    }
}
