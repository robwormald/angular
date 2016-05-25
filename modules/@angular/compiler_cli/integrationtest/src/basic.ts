import {Component, Inject} from '@angular/core';
import {FORM_DIRECTIVES, NgIf, NgFor} from '@angular/common';
import {MyComp} from './a/multiple_components';
import {CompWithProviders, CompWithQuery, CompWithQueryChild, CompWithReferences} from './features'

@Component({
  selector: 'basic',
  templateUrl: './basic.html',
  styles: ['.red { color: red }'],
  styleUrls: ['./basic.css'],
  directives: [MyComp, FORM_DIRECTIVES, NgIf, NgFor, CompWithProviders, CompWithQuery, CompWithQueryChild, CompWithReferences]
})
export class Basic {
  ctxProp: string;
  ctxBool: boolean;
  ctxArr: any[] = [];
  constructor() { this.ctxProp = 'initialValue'; }
}
