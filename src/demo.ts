import Febo from './index'
import Mention from './plugins/mention'

window.onload = () => {
  const root = document.getElementById('editor')
  const editor = document.getElementById('editor-content')
  if (!root || !editor) return
  const febo = new Febo(root, editor)
  febo.startWriting()
  febo.registerPlugin(new Mention())
  // root.addEventListener('content', event => {
  //   console.log('editor evento', event)
  // })
}
