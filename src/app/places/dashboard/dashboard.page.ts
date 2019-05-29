import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import {Router, NavigationEnd, ActivatedRoute, NavigationExtras} from '@angular/router';
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
  public items = [];
  public filteredItems = [];
  public hideAmounts = false;

  constructor(
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private amountsService: AmountsService
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

  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    event.detail.value === 'pickup' ? this.pickup = true : this.pickup = false;
  }

  buttonClick() {
      this.router.navigateByUrl('deliveryDetails');
  }

  changeType() {
    this.hideAmounts = this.pickupForm.controls.type.value !== 'Pieces';
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
