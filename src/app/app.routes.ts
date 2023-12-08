
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: '',
        canActivate: [],
        loadChildren: () => import('./features/board/router').then(m => m.routes),
    },
];
