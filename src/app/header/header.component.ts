import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated=false
  private userSubscription:Subscription

  constructor(private dataStorageService:DataStorageService, private authService:AuthService) { }
  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user=>{
      this.isAuthenticated=!!user
    })
  }
  onSaveData(){
    this.dataStorageService.storeRecipes()
  }
  fetchData(){
    this.dataStorageService.fetchRecipes().subscribe()
  }
  onLogout(){
    this.authService.logout()
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }
}
