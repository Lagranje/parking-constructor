import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { TerminalsService } from './services/terminals.service';
import { ApiConfiguration, ApiConfigurationInterface } from './api.configuration.interface';


@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    TerminalsService
  ]
})

export class ApiModule {
  static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}

export class ParkingSystemModule { }
