import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';

import { PlacesService } from '../places.service';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { AmountsService } from 'src/app/services/amounts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class dashboardPage implements OnInit {
  
  public pickupForm: FormGroup;
  public pickup = true;
  public chosenAmounts = [];

  constructor(
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private router: Router,
    private amountsService: AmountsService
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
       this.chosenAmounts = this.amountsService.amounts;
       console.log(this.chosenAmounts)
      }

    });
  
    this.pickupForm = formBuilder.group({
      pickupDate: [new Date().toISOString()]
    });
  }

  ngOnInit(){

  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    event.detail.value === 'pickup' ? this.pickup = true : this.pickup = false;
  }

  buttonClick() {
      this.router.navigateByUrl('deliveryDetails');
  }

  chooseAmounts(){
    this.router.navigateByUrl('amounts');
  }
}
