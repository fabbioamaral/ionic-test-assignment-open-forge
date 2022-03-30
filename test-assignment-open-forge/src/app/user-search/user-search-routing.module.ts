import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSeachPage } from './user-search.page';

const routes: Routes = [
  {
    path: '',
    component: UserSeachPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSeachPageRoutingModule {}
