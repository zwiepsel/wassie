import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Item } from 'src/app/models/item.model';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import { Storage } from '@ionic/storage';

declare var Keyboard:any;

@Component({
  selector: 'app-amounts',
  templateUrl: './amounts.page.html',
  styleUrls: ['./amounts.page.scss'],
})
export class AmountsPage implements OnInit {
  keyboard: any;

  public items = Array<Item>();
  public search = false;
  public searchTerm = '';
  public filteredItems = [];
  public filterActive = false;
  public activeCategorie = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private storage: Storage) {
      this.initializeItems();
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          if (this.router.getCurrentNavigation().extras.state.newItems.length > 0) {
            this.items = this.router.getCurrentNavigation().extras.state.newItems;
          }
        }
      });
      this.filteredItems = this.items;
    }

  ngOnInit() {
  }

  initializeItems() {
      this.items = [
        { product : 'Pantalon', categorie : 'Bovenkleding', amount : null },
        { product : 'Colbert', categorie : 'Bovenkleding', amount : null },
        { product : 'Broek', categorie : 'Bovenkleding', amount : null  },
        { product : 'T-shirt/polo', categorie : 'Bovenkleding', amount : null  },
        { product : 'Overhemd', categorie : 'Bovenkleding', amount : null  },
        { product : 'Blouse', categorie : 'Bovenkleding', amount : null  },
        { product : 'Trui/vest', categorie : 'Bovenkleding', amount : null  },
        { product : 'Rok/jurk', categorie : 'Bovenkleding', amount : null  },
        { product : 'Badjas/ochtendjas', categorie : 'Bovenkleding', amount : null  },
        { product : 'Korte broek', categorie : 'Bovenkleding', amount : null  },
        { product : 'Jumpsuit', categorie : 'Bovenkleding', amount : null  },
        { product : 'Jas/jack', categorie : 'Bovenkleding', amount : null  },
        { product : 'Mantel', categorie : 'Bovenkleding', amount : null  },
        { product : 'Stropdas', categorie : 'Bovenkleding', amount : null  },
        { product : 'Ceintuur/sjaal', categorie : 'Bovenkleding', amount : null  },
        { product : 'Dekbed/deken', categorie : 'Bedgoed', amount : null  },
        { product : 'Dekbed 4 seizoenen', categorie : 'Bedgoed', amount : null  },
        { product : 'Overtrek', categorie : 'Bedgoed', amount : null  },
        { product : 'Hoeslaken', categorie : 'Bedgoed', amount : null  },
        { product : 'Laken/kophoeslaken', categorie : 'Bedgoed', amount : null  },
        { product : 'Matrasbeschermer', categorie : 'Bedgoed', amount : null  },
        { product : 'Sloop', categorie : 'Bedgoed', amount : null  },
        { product : 'Kussen', categorie : 'Bedgoed', amount : null  },
        { product : 'Handdoek', categorie : 'Badgoed', amount : null  },
        { product : 'Washand', categorie : 'Badgoed', amount : null  },
        { product : 'Badmat', categorie : 'Badgoed', amount : null  },
        { product : 'WC mat', categorie : 'Badgoed', amount : null  },
        { product : 'Tafellaken', categorie : 'Keukengoed', amount : null  },
        { product : 'Servet', categorie : 'Keukengoed', amount : null  },
        { product : 'Theedoek', categorie : 'Keukengoed', amount : null  },
        { product : 'Werkdoek', categorie : 'Keukengoed', amount : null  },
        { product : 'Schort', categorie : 'Keukengoed', amount : null  },
        { product : 'Keukendoek', categorie : 'Keukengoed', amount : null  },
        { product : 'Microvezeldoek', categorie : 'Schoonmaak', amount : null  },
        { product : 'Dweil', categorie : 'Schoonmaak', amount : null  },
        { product : 'Ondergoed', categorie : 'Lijfgoed', amount : null  },
        { product : 'Pyjama/nachtjapon', categorie : 'Lijfgoed', amount : null  },
        { product : 'Sokken', categorie : 'Lijfgoed', amount : null  },
        { product : 'BH', categorie : 'Lijfgoed', amount : null  },
        { product : 'Sokkennet', categorie : 'Lijfgoed', amount : null  },
        { product : 'Waszak', categorie : 'Overig', amount : null  },
        { product : 'Zakdoek', categorie : 'Overig', amount : null  },
        { product : 'Gordijnen', categorie : 'Overig', amount : null  },
      ];
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    event.detail.value === 'search' ? this.search = true : this.search = false;
  }

  // filter the items based on the typed in searchterm in the searchbar
  filterLocations(searchTerm){
    return this.items.filter((item) => {
      return item.product.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  // Event that is triggered on every keystroke in the searchbar
  getItems(ev: any) {
    this.filteredItems = this.items;
    this.filteredItems = this.filterLocations(ev.target.value);
  }

  chooseCategorie() {
    this.filterActive = false;
  }

  filterCategorie(categorie: string){
    this.filterActive = true;
    this.activeCategorie = categorie;
    this.filteredItems = this.items.filter((item) => {
      return item.categorie.includes(categorie);
    });
  }
  saveAmount() {
    const navigationExtras: NavigationExtras = {
      state: {
        items: this.items
      }
    };

    this.router.navigate(['dashboard'], navigationExtras);
  }

}
