import {ngHtml} from '@angular/elements/platform';

export default ngHtml`
<style>

@import '/elements/flex-layout/flex-layout.css';
@import '/elements/flex-layout/flex-layout-classes.css';

:host {
  position: relative;
  display: block;
  transition-timing-function: linear;
  transition-property: -webkit-transform;
  transition-property: transform;
}
:host::before {
  position: absolute;
  right: 0px;
  bottom: -5px;
  left: 0px;
  width: 100%;
  height: 5px;
  content: "";
  transition: opacity 0.4s;
  pointer-events: none;
  opacity: 0;
  box-shadow: inset 0px 5px 6px -3px rgba(0, 0, 0, 0.4);
  will-change: opacity;
  @apply --app-header-shadow;
}
:host([shadow])::before {
  opacity: 1;
}
#background {
  @apply --layout-fit;
  overflow: hidden;
}
#backgroundFrontLayer,
#backgroundRearLayer {
  @apply --layout-fit;
  height: 100%;
  pointer-events: none;
  background-size: cover;
}
#backgroundFrontLayer {
  @apply --app-header-background-front-layer;
}
#backgroundRearLayer {
  opacity: 0;
  @apply --app-header-background-rear-layer;
}
#contentContainer {
  position: relative;
  width: 100%;
  height: 100%;
}
:host([disabled]),
:host([disabled])::after,
:host([disabled]) #backgroundFrontLayer,
:host([disabled]) #backgroundRearLayer,
/* Silent scrolling should not run CSS transitions */
:host([silent-scroll]),
:host([silent-scroll])::after,
:host([silent-scroll]) #backgroundFrontLayer,
:host([silent-scroll]) #backgroundRearLayer {
  transition: none !important;
}
:host([disabled]) ::slotted(app-toolbar:first-of-type),
:host([disabled]) ::slotted([sticky]),
/* Silent scrolling should not run CSS transitions */
:host([silent-scroll]) ::slotted(app-toolbar:first-of-type),
:host([silent-scroll]) ::slotted([sticky]) {
  transition: none !important;
}
</style>
`
