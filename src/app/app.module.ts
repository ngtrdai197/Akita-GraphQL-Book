import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { appRoutes } from './app-routing';
import { environment } from '@env/environment';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { HttpInterceptorService } from './core/interceptors/http-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
