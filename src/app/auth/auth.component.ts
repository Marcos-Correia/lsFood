import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PLaceholderDirective } from '../shared/placeholder/placeholder.drective';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PLaceholderDirective) alertHost: PLaceholderDirective

  private closeSubscription: Subscription

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResover: ComponentFactoryResolver
  ) {}
  ngOnDestroy(): void {
      if(this.closeSubscription) this.closeSubscription.unsubscribe()
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const { email, password } = form.value;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }
    authObservable.subscribe(
      (responseData) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.isLoading = false;
        this.showErrorAlert(errorMessage);
        this.error = errorMessage;
      }
    );
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }
  private showErrorAlert(errorMessage: string) {
    const alertComponentFactory =
      this.componentFactoryResover.resolveComponentFactory(AlertComponent);
      const hostViewContainerRef = this.alertHost.viewContainerRef
      hostViewContainerRef.clear()
      const componentRef = hostViewContainerRef.createComponent(alertComponentFactory)
      componentRef.instance.message=errorMessage
      this.closeSubscription = componentRef.instance.close.subscribe(()=>{
          this.closeSubscription.unsubscribe()
          hostViewContainerRef.clear()
      })
  }
}
