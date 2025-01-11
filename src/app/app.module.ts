import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RewardCardComponent } from './components/reward-card/reward-card.component';
import { SortDropdownComponent } from './components/sort-dropdown/sort-dropdown.component';
import { ListingComponent } from './pages/listing/listing.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SearchBarComponent,
    RewardCardComponent,
    SortDropdownComponent,
    ListingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
