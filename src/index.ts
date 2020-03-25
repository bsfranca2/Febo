import { IFeboPlugin } from './plugins/index'

class Febo {
  private root: HTMLElement
  private editor: HTMLElement

  private plugins: IFeboPlugin[] = []

  constructor(root: HTMLElement, editor: HTMLElement) {
    this.root = root
    this.editor = editor
    this.configListeners()
  }

  public startWriting() {
    this.editor.setAttribute('contenteditable', 'true')
    return this
  }

  public stopWriting() {
    this.editor.setAttribute('contenteditable', 'false')
    return this
  }

  public registerPlugin(plugin: IFeboPlugin) {
    const p = plugin
    p.root = this.root
    p.editor = this.editor
    this.plugins.push(p)
  }

  private getEventHandlers(event: FeboEvent) {
    return this.plugins.map(plugin => plugin[event])
  }

  private configListeners() {
    this.inputHandle()
  }

  inputHandle() {
    this.editor.addEventListener('input', (event) => {
      console.log(event)

      const ev = new CustomEvent('content', {
        bubbles: true,
        detail: { content: this.editor.innerHTML }
      })
      this.root.dispatchEvent(ev)

      this.getEventHandlers(FeboEvent.INPUT).map(fn => {
        if (fn) { fn(event) }
      })
    })
  }

}

export enum FeboEvent {
  INPUT = 'onInput'
}

export default Febo
