import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  public savedOrders = [];
  public pickup = true;
  public today = new Date().toISOString();
  constructor( private storage: Storage ) { }

  ngOnInit() {
    this.storage.forEach(val => {
      this.savedOrders.push(val);
    });
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    event.detail.value === 'pickup' ? this.pickup = true : this.pickup = false;
  }

}
