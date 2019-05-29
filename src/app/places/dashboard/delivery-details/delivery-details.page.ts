import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.page.html',
  styleUrls: ['./delivery-details.page.scss'],
})
export class DeliveryDetailsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  requestRMA() {
      this.router.navigateByUrl('/members/rma');
  }


}
