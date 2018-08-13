import {ngHtml as html, importNgStyles} from '@angular/elements/platform'
import flexStyle from '../flex-layout/flex-layout.css'
import flexStyleClasses from '../flex-layout/flex-layout-classes.css';

export default html`
<style>
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    height: 64px;
    padding: 0 16px;
    pointer-events: none;
    font-size: var(--app-toolbar-font-size, 20px);
  }
  :host ::slotted(*) {
    pointer-events: auto;
  }
  :host ::slotted(paper-icon-button) {
    /* paper-icon-button/issues/33 */
    font-size: 0;
  }
  :host ::slotted([main-title]),
  :host ::slotted([condensed-title]) {
    pointer-events: none;
    display: flex;
  }
  :host ::slotted([bottom-item]) {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
  }
  :host ::slotted([top-item]) {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  :host ::slotted([spacer]) {
    margin-left: 64px;
  }
</style>

<slot></slot>
`
