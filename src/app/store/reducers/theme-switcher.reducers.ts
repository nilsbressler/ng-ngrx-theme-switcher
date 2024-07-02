import { createReducer, on } from '@ngrx/store';
import { initialThemeSwitcherState, themeSwitcherAdapter } from '../types';
import { setThemeAction } from '../actions/theme-switcher.actions';

export const themeSwitcherReducer = createReducer(
  initialThemeSwitcherState,
  on(setThemeAction, (state, { theme }) => {
    return themeSwitcherAdapter.updateOne(
      { id: 'currentTheme', changes: { theme } },
      state
    );
  })
);
