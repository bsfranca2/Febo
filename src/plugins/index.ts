export interface IFeboPlugin {
  root: HTMLElement
  editor: HTMLElement

  onInput?: (event: Event) => void
}

export class FeboPlugin implements IFeboPlugin {
  root: HTMLElement
  editor: HTMLElement

  constructor() {
    this.root = document.createElement('div')
    this.editor = document.createElement('div')
  }
}
