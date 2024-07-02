import { createAction, props } from '@ngrx/store';

export const setThemeAction = createAction(
  '[Theme Switcher] Set Theme',
  props<{ theme: string }>()
);

export const setThemeSuccessAction = createAction(
  '[Theme Switcher] Set Theme Success'
);

export const setThemeFailureAction = createAction(
  '[Theme Switcher] Set Theme Failure',
  props<{ error: string }>()
);

export const loadInitialThemeAction = createAction(
  '[Theme Switcher] Load Initial Theme'
);

export const loadInitialThemeSuccessAction = createAction(
  '[Theme Switcher] Load Initial Theme Success'
);

export const loadInitialThemeFailureAction = createAction(
  '[Theme Switcher] Load Initial Theme Failure',
  props<{ error: string }>()
);
