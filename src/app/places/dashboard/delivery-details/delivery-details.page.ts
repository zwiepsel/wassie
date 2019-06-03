import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.page.html',
  styleUrls: ['./delivery-details.page.scss'],
})
export class DeliveryDetailsPage implements OnInit {
  public id = '';
  public activeOrder = [];
  public type = 'Pieces';
  public filteredItems = [];
  public form = {};

  constructor(private router: Router,
              private route: ActivatedRoute,
              private storage: Storage) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
    });
    this.storage.get(this.id).then((val) => {
      this.activeOrder = val;
      const items = val.items
      this.filteredItems = items.filter((item) => {
        return item.amount > 0;
      });
      this.form = val.form;
      console.log(val.form)
    });
  }

  requestRMA() {
      this.router.navigateByUrl('rma');
  }


}
