/** @jsx createElement */
import {
  createComponent,
  createElement,
  useRef,
  useViewEffect
} from "axii"
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import './editor.less'
import IP from './image-paste'

function EditorFC ({ ref }) {
  const tipEditorEle = useRef()

  const tipEditor = useRef()

  if (ref) {
    ref.current = {
      get editor () {
        return tipEditor.current
      }
    }
  }

  useViewEffect(() => {
    if(tipEditorEle.current) {
      tipEditor.current = new Editor({
        element: tipEditorEle.current,
        extensions: [
          IP,
          Object.assign(StarterKit, ({
            options: {
              italic: false,
              bold: false,
              code: false,
            }
          })),
          Image,
          Link
        ],
        content: `
          <p>hello</p>
          wo
          <img src="https://cdn.233.momobako.com/ygopro/pics/21844576.jpg!half" />
        `
      })
      console.log('tipEditor.current:', tipEditor.current)
      window.tipEditor = tipEditor.current
    }
  })

  function dropImage (e) {
    console.log('e: ', e);
  }

  return (
    <dwEditorContainer block >
      <tipEditor block ref={tipEditorEle} onDragover={e => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
      }} onDrop={dropImage} > 
      </tipEditor>
    </dwEditorContainer>
  )
}

EditorFC.Style = (frag) => {
  const el = frag.root.elements
  el.tipEditor.style({
    border: '1px solid #999'
  })
}
EditorFC.forwardRef = true

const MyEditor = createComponent(EditorFC)

export default MyEditor