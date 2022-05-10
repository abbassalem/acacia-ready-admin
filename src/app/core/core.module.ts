import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material';
import { ToolbarComponent } from './components/toolbar.component';
import { AppComponent } from '../app.component';
import { NotFoundPageComponent } from './containers/not-found-page.component';
import { HomePageComponent } from './containers/home-page.component';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  ToolbarComponent,
  HomePageComponent
];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
