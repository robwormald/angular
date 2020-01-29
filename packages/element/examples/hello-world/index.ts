import {HelloWorld} from './hello-world'
import {fromComponent} from '@angular/element'
import {ɵrenderComponent} from '@angular/core'

const HelloWorldElement = fromComponent(HelloWorld);

customElements.define('hello-world', HelloWorldElement);

