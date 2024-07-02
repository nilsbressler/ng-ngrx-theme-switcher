import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
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
