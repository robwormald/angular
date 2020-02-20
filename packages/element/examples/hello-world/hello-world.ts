import {Component, Input, ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'hello-world',
  templateUrl: './hello-world.html',
  styleUrls: ['./hello-world.css'],
})
export class HelloWorld {
  @Input() name = 'Angular!';
}
