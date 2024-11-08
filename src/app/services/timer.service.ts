// timer.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class TimerService {
    private timer$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
    private subscription: Subscription | null = null;

    constructor() { }

    startTimer(minutes: number): void {
        const totalSeconds = minutes * 60;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.subscription = interval(1000)
            .pipe(
                take(totalSeconds + 1), // Limits the interval to the total seconds
                map((secondsPassed) => totalSeconds - secondsPassed) // Maps the remaining time
            )
            .subscribe((remainingTime) => {
                this.timer$.next(remainingTime);
                if (remainingTime === 0) {
                    this.subscription?.unsubscribe(); // Stop the timer when it reaches 0
                }
            });
    }

    getTimerValue() {
        return this.timer$.asObservable();
    }

    stopTimer(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
