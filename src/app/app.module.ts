import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { IBeacon } from '@ionic-native/ibeacon';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginModalPageModule } from '../pages/login-modal/login-modal.module';
import { ComponentsModule} from '../components/components.module';

import { AuthProvider } from '../providers/auth/auth';
import { TokenManagerProvider } from '../providers/token-manager/token-manager';
import { UserStorageProvider } from '../providers/user-storage/user-storage';
import { ApiProvider } from '../providers/api/api';
import { LayoutManagerProvider } from '../providers/layout-manager/layout-manager';
import { OnStartProvider } from '../providers/on-start/on-start';
import { ToastProvider } from '../providers/toast/toast';

import { EmailValidator } from '../validators/email';
import { CustomersManagerProvider } from '../providers/customers-manager/customers-manager';
import { PusherProvider } from '../providers/pusher/pusher';
import { PusherHandlerProvider } from '../providers/pusher-handler/pusher-handler';
import { PopToRootProvider } from '../providers/pop-to-root/pop-to-root';
import { BeaconManagerProvider } from '../providers/beacon-manager/beacon-manager';
import { AlertProvider } from '../providers/alert/alert';
import { SelectedCustomerProvider } from '../providers/selected-customer/selected-customer';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    ComponentsModule,
    BrowserModule,
    HttpClientModule,
    LoginModalPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    TokenManagerProvider,
    UserStorageProvider,
    ApiProvider,
    ScreenOrientation,
    IBeacon,
    LayoutManagerProvider,
    OnStartProvider,
    ToastProvider,
    EmailValidator,
    CustomersManagerProvider,
    PusherProvider,
    PusherHandlerProvider,
    PopToRootProvider,
    BeaconManagerProvider,
    AlertProvider,
    SelectedCustomerProvider,
  ]
})
export class AppModule {}
