import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import {Router, NavigationEnd, ActivatedRoute, NavigationExtras} from '@angular/router';
import { AmountsService } from 'src/app/services/amounts.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class dashboardPage implements OnInit {
  public pickupForm: FormGroup;
  public pickup = true;
  public chosenAmounts = [];
  public items = [];
  public filteredItems = [];
  public type = 'Pieces'
  public savedOrders = [];
  public itemsSet = {};

  constructor(
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private amountsService: AmountsService,
    private storage: Storage
  ) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.items = this.router.getCurrentNavigation().extras.state.items;
        this.filteredItems = this.items.filter((item) => {
          return item.amount > 0;
        });
      }
    });
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
       this.chosenAmounts = this.amountsService.amounts;
      }

    });
    this.pickupForm = formBuilder.group({
      pickupDate: [new Date().toISOString()],
      type: 'string'
    });
  }

  ngOnInit() {

    this.storage.forEach(val => {
      this.savedOrders.push(val);
    })
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    event.detail.value === 'pickup' ? this.pickup = true : this.pickup = false;
  }

  openOrder(id) {
      this.router.navigate( ['/deliveryDetails'], { queryParams: { id } });
  }

  sendDelivery(){
    const orderNumber = Math.floor((Math.random() * 10000) + 1).toString();
    this.itemsSet = { id: orderNumber, items: this.items }
    this.savedOrders.push(this.itemsSet)
    this.storage.set(orderNumber, this.itemsSet)
    this.pickupForm.controls.type.setValue('Pieces');
    this.filteredItems = [];
    this.items = [];
  }

  changeType() {
    this.type = this.pickupForm.controls.type.value;
  }

  chooseAmounts() {
    const navigationExtras: NavigationExtras = {
      state: {
        newItems: this.items
      }
    };
    this.router.navigate(['amounts'], navigationExtras);
  }
}
