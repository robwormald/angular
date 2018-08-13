import {ngStyle, importNgStyles} from '@angular/elements/platform'
import flexStyle from '../flex-layout/flex-layout.css'
import flexStyleClasses from '../flex-layout/flex-layout-classes.css';

export default `

  :host {
    display: flex;
    position: relative;
    z-index: 0;
  }
  #wrapper ::slotted([slot=header]) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  #wrapper.initializing ::slotted([slot=header]) {
    position: relative;
  }
  :host([has-scrolling-region]) {
    height: 100%;
  }
  :host([has-scrolling-region]) #wrapper ::slotted([slot=header]) {
    position: absolute;
  }
  :host([has-scrolling-region]) #wrapper.initializing ::slotted([slot=header]) {
    position: relative;
  }
  :host([has-scrolling-region]) #wrapper #contentContainer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  :host([has-scrolling-region]) #wrapper.initializing #contentContainer {
    position: relative;
  }
  :host([fullbleed]) {
    @apply --layout-vertical;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  :host([fullbleed]) #wrapper,
  :host([fullbleed]) #wrapper #contentContainer {
    display:flex;
    flex-direction:column;
  }
  #contentContainer {
    position: relative;
    z-index: 0;
  }
  @media print {
    :host([has-scrolling-region]) #wrapper #contentContainer {
      overflow-y: visible;
    }
  }
  `
