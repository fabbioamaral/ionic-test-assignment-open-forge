import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSeachPage } from './user-search.page';

import { UserSeachPageRoutingModule } from './user-search-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    UserSeachPageRoutingModule
  ],
  declarations: [UserSeachPage]
})
export class UserSeachPageModule {}
