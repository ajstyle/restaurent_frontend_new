import { Component, OnInit } from '@angular/core';
import { PosService} from '../../services/pos.service' ;
import { FirebaseService} from '../../services/firebase.service' ;

import {KDS} from '../../item';
@Component({
  selector: 'app-kds',
  templateUrl: './kds.component.html',
  styleUrls: ['./kds.component.scss']
})
export class KdsComponent implements OnInit {

  constructor(private pos: PosService , public firebase: FirebaseService ) { }
  kdsArray: KDS[] = [] ;

  ngOnInit() {

      // this.pos.currentKds.subscribe(res => {
      //   this.kdsArray = res ;
      //   console.log('kds====' , this.kdsArray) ;
      // });

      this.firebase.getKDSOrder().subscribe(data => {
        console.log(data);
        this.kdsArray = data.map(e => {
          const id = e.payload.doc.id;

          return {
            ...e.payload.doc.data(),
            id
          } as any;
        });
      });
      setTimeout(x => {
        console.log(this.kdsArray);
      }, 4000);
  }

  completeKds(kds) {
    console.log(kds.id);
    this.firebase.deleteKds(kds.id).then( x => {
      console.log('Data deleted', x);
      
    })
  }

}
