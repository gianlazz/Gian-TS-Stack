import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuard] },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  { path: 'password-reset', loadChildren: './pages/auth/password-reset/password-reset.module#PasswordResetPageModule' },
  { path: 'reset-pin', loadChildren: './pages/auth/reset-pin/reset-pin.module#ResetPinPageModule' },
  { path: 'change-name', loadChildren: './pages/profile/change-name/change-name.module#ChangeNamePageModule' },
  { path: 'change-email', loadChildren: './pages/profile/change-email/change-email.module#ChangeEmailPageModule' },
  { path: 'change-password', loadChildren: './pages/profile/change-password/change-password.module#ChangePasswordPageModule' },
  { path: 'delete-account', loadChildren: './pages/profile/delete-account/delete-account.module#DeleteAccountPageModule' },
  { path: 'invite', loadChildren: './pages/invite/invite.module#InvitePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
