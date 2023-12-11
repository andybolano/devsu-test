import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

	constructor(private readonly router: Router) {

	}

	public redirectToRoot(): void {
		this.router.navigate(['/']);
	}
}
