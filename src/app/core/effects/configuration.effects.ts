import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { ConfigService } from '../services/config.service';
import * as fromConfigActions from './../actions/configuration.actions';

@Injectable()
export class ConfigEffects {

  constructor(private actions$: Actions, private configService: ConfigService) {
  }



  }