import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThemeService } from './services/theme.service';
import { loadInitialThemeAction } from './store/actions/theme-switcher.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-theme-mixins';

  currentTheme: string | undefined;

  constructor(
    private store: Store,
    private themeService: ThemeService
  ) {
    this.store.dispatch(loadInitialThemeAction());
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }
}
