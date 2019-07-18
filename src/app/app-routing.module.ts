import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {LoginComponent} from './components/login/login.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {SettingComponent} from './components/setting/setting.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'user-list',
    pathMatch: 'full',
    component: UserListComponent
  },
  {
    path: 'user-profile/:id',
    pathMatch: 'full',
    component: UserProfileComponent
  },

  {
    path: 'setting',
    pathMatch: 'full',
    component: SettingComponent
  },

  {
    path: '404',
    pathMatch: 'full',
    component: NotFoundComponent
  },

  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
