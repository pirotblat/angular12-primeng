import { AuthService } from './../services/auth.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  collapsed = true;
  userSub: Subscription | undefined;
  isAuthenticated = false;
  // @Output() featureSelected = new EventEmitter<string>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private auth: AuthService) { }

  ngOnInit() {
    this.userSub = this.auth.user
      .subscribe(u => {
        // console.log(u);
      this.isAuthenticated = !!u;
    });
  }

  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }

  getShoppingList(id: number) {
    // this.router.navigate(['/shopping-list', id, 'edit'], { relativeTo: this.route});
    // this.router.navigate(['/shopping-list', id, 'edit'], { queryParams: {allowEdit: '1'}, fragment: 'loading'});
  }

  // login() {
  //   this.auth.login();
  // }
  // logout() {
  //   this.auth.logout();
  // }

  openPrimeNg() {
    this.router.navigate(['/primeng-table']);
  }
  openFlex() {
    this.router.navigate(['/flex']);
  }

  openBootstrap() {
    this.router.navigate(['/bootstrap']);
  }

  openTableEdit() {
    this.router.navigate(['/table-edit']);
  }
  openTableFrozen() {
    this.router.navigate(['/table-frozen']);
  }
  openTable() {
    this.router.navigate(['/table']);
  }

  openCenes500() {
    // this.router.navigate(['/cenes500']);
  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    if (this.userSub)
      this.userSub.unsubscribe();
  }

}
