import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.page.html',
  styleUrls: ['./delivery-details.page.scss'],
})
export class DeliveryDetailsPage implements OnInit {
  public id = '';
  public activeOrder = [];
  public type ='Pieces';
  public filteredItems = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private storage: Storage) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.id = params.id;
    })
    this.storage.get(this.id).then((val) => {
      this.activeOrder = val.items;
      this.filteredItems = this.activeOrder.filter((item) => {
        return item.amount > 0;
      });
      console.log(this.activeOrder)
    })
  }

  requestRMA() {
      this.router.navigateByUrl('/members/rma');
  }


}
