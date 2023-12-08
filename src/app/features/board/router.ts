import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    },
    {
        path: 'products',
        canActivate: [],
        loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
        title: 'Board',
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'list',
                loadComponent: () => import('./layout/features/product-list/product-list.component').then(m => m.ProductListComponent),
                title: 'Products List'
            },
            {
                path: 'register',
                loadComponent: () => import('./layout/features/product-register/product-register.component').then(m => m.ProductRegisterComponent),
                title: 'Product register'
            }
        ]
    },
];
