import {ngStyle, importNgStyles} from '@angular/elements/platform'
import flexStyle from '../flex-layout/flex-layout.css'
import flexStyleClasses from '../flex-layout/flex-layout-classes.css';

export default ngStyle`
  app-header {
    background-color: #00897B;
    color: #fff;
  }
  paper-icon-button {
    --paper-icon-button-ink-color: white;
  }
  app-drawer-layout:not([narrow]) [drawer-toggle] {
    display: none;
  }
`
