import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
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
    private storage: Storage,
    public toastController: ToastController
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
      deliverDate: [new Date().toISOString()],
      type: 'Pieces',
      remarks: '',
      location: '',
      amount: 0
    });
  }

  async deleteOrder(id) {
    const toast = await this.toastController.create({
      message: `Order ${id} verwijderd`,
      duration: 2000
    });
    toast.present();
  }

  async saveOrder() {
    const toast = await this.toastController.create({
      message: `Uw order is succesvol geplaatst`,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.storage.forEach(val => {
      this.savedOrders.push(val);
    });
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    event.detail.value === 'pickup' ? this.pickup = true : this.pickup = false;
  }

  openOrder(id, event) {
    if(event.target.nodeName !== 'ION-BUTTON'){
      this.router.navigate( ['/deliveryDetails'], { queryParams: { id } });
    }

  }

  removeDelivery(id, event) {
    if (event.target.nodeName === 'ION-BUTTON') {
      this.storage.remove(id);
      const index = this.savedOrders.findIndex(function(item){
        return item.id === id;
      });
      if (index !== -1) {
        this.savedOrders.splice(index, 1);
      }
      this.deleteOrder(id);
    }
  }

  sendDelivery() {
    // this.storage.clear();
    const activeDate = new Date().toISOString();
    const orderNumber = Math.floor((Math.random() * 10000) + 1).toString();
    this.itemsSet = { id: orderNumber, items: this.items, date: activeDate,  form: this.pickupForm.value };
    this.savedOrders.push(this.itemsSet);
    this.storage.set(orderNumber, this.itemsSet);
    this.pickupForm.controls.type.setValue('Pieces');
    this.pickupForm.controls.deliverDate.setValue(new Date().toISOString());
    this.pickupForm.controls.pickupDate.setValue(new Date().toISOString());
    this.pickupForm.controls.remarks.setValue('');
    this.pickupForm.controls.location.setValue('');
    this.filteredItems = [];
    this.items = [];
    this.saveOrder();
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
