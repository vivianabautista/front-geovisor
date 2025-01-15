import { Component } from '@angular/core';

@Component({
  selector: 'app-maps',
  imports: [],
  template: `
  @defer  (on viewport) {
 je maps
}@placeholder {
  <p>Future comments</p>
}@loading (minimum 2s){
  <p>Loading comments...</p>
}
  `,
  // templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})
export class MapsComponent {

}
