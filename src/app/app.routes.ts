import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import HomeComponent from './home/home';

// import {Home} from './home/home';
// import {Details} from './details/details';

const routeConfig: Routes = [
    {
      path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent,
      title: 'Login',
    },
    {
      path: 'home/:id',
      component: HomeComponent,
      title: 'Home',
    },
];

export default routeConfig;
