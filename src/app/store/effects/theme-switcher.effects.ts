import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {
  loadInitialThemeAction,
  loadInitialThemeFailureAction,
  loadInitialThemeSuccessAction,
  setThemeAction,
  setThemeFailureAction,
  setThemeSuccessAction,
} from '../actions/theme-switcher.actions';
import { ThemeService } from '../../services/theme.service';
@Injectable()
export class ThemeSwitcherEffects {
  constructor(
    private actions$: Actions,
    private themeService: ThemeService
  ) {}

  setTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setThemeAction),
      switchMap(action => {
        const currentTheme = this.themeService.getCurrentTheme();
        if (currentTheme) {
          return of(setThemeSuccessAction());
        } else {
          return of(setThemeFailureAction({ error: 'Theme is not set' }));
        }
      }),
      catchError((error: any) => {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return of(setThemeFailureAction({ error: errorMessage }));
      })
    )
  );

  loadInitialTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadInitialThemeAction),
      switchMap(() => {
        try {
          const initialTheme = this.themeService.getCurrentTheme();
          return of(loadInitialThemeSuccessAction());
        } catch (error: any) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          return of(loadInitialThemeFailureAction({ error: errorMessage }));
        }
      }),
      catchError((error: any) => {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return of(loadInitialThemeFailureAction({ error: errorMessage }));
      })
    )
  );
}
