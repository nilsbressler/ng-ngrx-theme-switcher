import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setThemeAction } from '../store/actions/theme-switcher.actions';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentThemeSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('light');
  currentTheme$: Observable<string> = this.currentThemeSubject.asObservable();

  constructor(private store: Store) {}

  setTheme(theme: string): void {
    this.currentThemeSubject.next(theme);
    this.store.dispatch(setThemeAction({ theme }));
  }

  getCurrentTheme(): string {
    return this.currentThemeSubject.value;
  }
}
