import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ThemeSwitcherState } from '../types';

export const selectThemeSwitcherState =
  createFeatureSelector<ThemeSwitcherState>('themeSwitcher');

export const selectTheme = createSelector(
  selectThemeSwitcherState,
  (state: ThemeSwitcherState): string | undefined =>
    state.entities['currentTheme']?.theme
);
