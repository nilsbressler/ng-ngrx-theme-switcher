import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { themeSwitcherReducer } from './store/reducers/theme-switcher.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BlogPostsComponent } from './components/blog-posts/blog-posts.component';
import { ListComponent } from './components/list/list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeSwitcherEffects } from './store/effects/theme-switcher.effects';

@NgModule({
  declarations: [
    AppComponent,
    BlogPostsComponent,
    ListComponent,
    ThemeSwitcherComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({ themeSwitcher: themeSwitcherReducer }),
    EffectsModule.forRoot([ThemeSwitcherEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
    }),
    MatToolbar,
    MatSlideToggle,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
