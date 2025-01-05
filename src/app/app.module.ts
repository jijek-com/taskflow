import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule
  ],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
  bootstrap: [AppComponent]
})
export class AppModule {}
