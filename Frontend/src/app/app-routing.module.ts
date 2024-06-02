import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/SignIn/register/register.component';
import { LoginComponent } from './Components/SignIn/login/login.component';
import { DashboardComponent } from './Components/Chat/dashboard/dashboard.component';
import { AuthGuard } from './Guards/auth.guard';
import { ChatComponent } from './Components/Chat/chat/chat.component';
import { LogsComponent } from './Components/logs/logs.component';

const routes: Routes = [{ path: 'register', component: RegisterComponent },
{ path: 'login', component: LoginComponent },
{ path: '', component: LoginComponent },
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'chat/:userId',
      component: ChatComponent,
      outlet: 'chatOutlet' 
    }
  ]
},
{ path : "logs", component: LogsComponent, canActivate: [AuthGuard], }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
