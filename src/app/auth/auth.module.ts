import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginPageComponent } from './containers/login-page.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthEffects } from './effects/auth.effects';
import { reducer } from './reducers/auth.reducer';
import { MaterialModule } from '../material';
import {SignInComponent} from './components/sign-in/sign-in.component';

@NgModule({
  imports: [    
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [
    LoginPageComponent,
    SignInComponent
  ]
})

export class AuthModule {
  static forRoot(): ModuleWithProviders<NgModule> {
    return {
      ngModule: AuthModule,
      providers: [AuthService, AuthGuard],
    };
  }
}


