export function createEvent(type: string, detail: any, options: EventInit){
  const event = new CustomEvent(type, {detail, ...options });
  return event;
}

export function dispatchEvent(target: HTMLElement, event: CustomEvent){
  return target.dispatchEvent(event);
}
