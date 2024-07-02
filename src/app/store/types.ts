import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ThemeSwitcher {
  id: string;
  theme: string;
}

export interface ThemeSwitcherState extends EntityState<ThemeSwitcher> {}

export const themeSwitcherAdapter: EntityAdapter<ThemeSwitcher> =
  createEntityAdapter<ThemeSwitcher>();

export const initialThemeSwitcherState: ThemeSwitcherState =
  themeSwitcherAdapter.getInitialState({
    ids: ['currentTheme'],
    entities: {
      currentTheme: {
        id: 'currentTheme',
        theme: 'light',
      },
    },
  });
