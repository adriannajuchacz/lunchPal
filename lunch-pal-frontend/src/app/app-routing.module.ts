import { HomeComponent } from './home/home.component';
import { UserInputComponent } from './user-input/user-input.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SettingComponent } from './setting/setting.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { ResetComponent } from './reset/reset.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent} from './admin/admin.component';
import { BlockedComponent } from './blocked/blocked.component';

const routes: Routes = [
  {
    path: '',
    component: LandingpageComponent
   },
  {
    path: 'login',
   component:LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'setting',
    component: SettingComponent
  },
  {
    path: 'impressum',
    component: ImpressumComponent
  },
  { path:'about',
  component:AboutComponent
  },
  {
    path: 'find-lunch-pal',
    component: UserInputComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'reset',
    component: ResetComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'blocked',
    component: BlockedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
