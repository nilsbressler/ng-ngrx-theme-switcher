# Angular NgRx Theme Switcher

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6 and implements a ThemeSwitcher functionality in an Angular application using NgRx for state management. The ThemeSwitcher allows toggling between light and dark themes.

## Introduction

The ThemeSwitcher functionality helps in managing the theme of the application. It includes a service (`ThemeService`) to handle theme changes, effects to manage side effects, and components to toggle and display the current theme.

## Install

1. Clone the repository.
2. Install dependencies using npm install.
3. Run the application using `ng serve`.

## ThemeService

The ThemeService handles the theme state and provides methods to set and get the current theme.

**setTheme**
Sets the current theme and dispatches the `setThemeAction`.
```ts
setTheme(theme: string): void {
  this.currentThemeSubject.next(theme);
  this.store.dispatch(setThemeAction({ theme }));
}
```

**getCurrentTheme**
Gets the current theme.
```ts
getCurrentTheme(): string {
  return this.currentThemeSubject.value;
}
```

## Effects

Effects handle errors for setting and loading the theme.

**setThemeEffect**
Handles the `setThemeAction` to set the theme.
```ts
setTheme$ = createEffect(() =>
  this.actions$.pipe(
    ofType(setThemeAction),
    switchMap(action => {
      const currentTheme = this.themeService.getCurrentTheme();
      if (currentTheme) {
        return of(setThemeSuccessAction({ theme: currentTheme }));
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

```

**loadInitialThemeEffect**
Handles the `loadInitialThemeAction` to load the initial theme.
```ts
loadInitialTheme$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadInitialThemeAction),
    switchMap(() => {
      try {
        const initialTheme = this.themeService.getCurrentTheme();
        return of(loadInitialThemeSuccessAction({ theme: initialTheme }));
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
```

## Components

### App Component
Loads the initial theme and subscribes to the current theme.
```ts
export class AppComponent {
  title = 'ng-ngrx-theme-switcher';
  currentTheme: string | undefined;

  constructor(private store: Store, private themeService: ThemeService) {
    this.store.dispatch(loadInitialThemeAction());
    this.themeService.currentTheme$.subscribe(theme => {
      console.log('Current Theme:', theme);
    });
  }
}
```
```html
<mat-toolbar>
  <span>Theme Switcher Example</span>
  <span class="spacer"></span>
  <app-theme-switcher></app-theme-switcher>
</mat-toolbar>

<div [attr.data-theme]="currentTheme" class="content">
  <div class="left-panel">
    <app-list></app-list>
  </div>
  <div class="right-panel">
    <app-blog-posts></app-blog-posts>
  </div>
</div>
```

### ThemeSwitcherComponent
Allows toggling between light and dark themes.
```ts
export class ThemeSwitcherComponent implements OnInit {
  isDarkTheme: boolean | undefined;
  
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.currentTheme$.subscribe(theme => {
      this.isDarkTheme = theme !== 'light';
    });
  }

  toggleTheme($event: MatSlideToggleChange) {
    this.isDarkTheme = $event.checked;
    const newTheme = this.isDarkTheme ? 'dark' : 'light';
    this.themeService.setTheme(newTheme);
  }
}
```
```html
<mat-slide-toggle (change)="toggleTheme($event)">Dark Mode</mat-slide-toggle>
```

## Actions
The actions define the events related to theme switching.

```ts
export const setThemeAction = createAction(
  '[Theme Switcher] Set Theme',
  props<{ theme: string }>()
);

export const setThemeSuccessAction = createAction(
  '[Theme Switcher] Fetch Theme Success',
  props<{ theme: string }>()
);

export const setThemeFailureAction = createAction(
  '[Theme Switcher] Fetch Theme Failure',
  props<{ error: string }>()
);

export const loadInitialThemeAction = createAction(
  '[Theme Switcher] Load Initial Theme'
);

export const loadInitialThemeSuccessAction = createAction(
  '[Theme Switcher] Load Initial Theme Success',
  props<{ theme: string }>()
);

export const loadInitialThemeFailureAction = createAction(
  '[Theme Switcher] Load Initial Theme Failure',
  props<{ error: string }>()
);
```

## State

The state manages the theme entities.
```ts
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
```

## Style
**styles.scss**

The SCSS code defines variables the theme switcher. It sets colors and a large font size for two themes (light and dark) and uses CSS variables to dynamically apply these styles. The code allows for adjusting the website's design based on the selected theme.

```scss
$font-size-large: 24px;

$light-font-color: #1a252f;
$light-primary-color: #eaeaea;
$light-secondary-color: #3498db;

$dark-font-color: #e6e6e6;
$dark-primary-color: #3c3c3c;
$dark-secondary-color: #b5b5b5;

:root {
  --font-size-large: #{$font-size-large};
}

[data-theme='dark'] {
  --primary-color: #{$dark-primary-color};
  --secondary-color: #{$dark-secondary-color};
  --font-color: #{$dark-font-color};
}

[data-theme='light'] {
  --primary-color: #{$light-primary-color};
  --secondary-color: #{$light-secondary-color};
  --font-color: #{$light-font-color};
}

```

# Final
Feel free to add any additional information or sections as needed for your specific use case.
For more information about NgRx, please check out my other projects!
