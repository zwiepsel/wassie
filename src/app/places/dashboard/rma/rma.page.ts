import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rma',
  templateUrl: './rma.page.html',
  styleUrls: ['./rma.page.scss'],
})
export class RmaPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  sendRMA() {
    this.router.navigateByUrl('dashboard');
  }

}
