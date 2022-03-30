import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedPage } from './feed.page';

import { FeedPageRoutingModule } from './feed-routing.module';
import { ViewUserDirective } from '../directive/view-user.directive';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FeedPageRoutingModule
  ],
  declarations: [FeedPage, ViewUserDirective]
})
export class FeedPageModule {}
