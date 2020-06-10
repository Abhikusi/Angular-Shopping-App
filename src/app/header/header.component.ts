import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;

  private userSub: Subscription;

  constructor( private dataStorageService: DataStorageService, 
               private authservice: AuthService ){}
 
  onSaveData() {
     this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnInit(){
    this.userSub = this.authservice.user.subscribe(user=>{
     this.isAuthenticated = !!user;
    });
  }

  onLogout(){
    this.authservice.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
