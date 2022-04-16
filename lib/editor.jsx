/** @jsx createElement */
import {
  createComponent,
  createElement,
  useRef,
  useViewEffect
} from "axii"
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import './editor.less'

function EditorFC () {
  const tipEditorEle = useRef()

  useViewEffect(() => {
    if(tipEditorEle.current) {
      new Editor({
        element: tipEditorEle.current,
        extensions: [
          StarterKit
        ],
        content: `
          <p>hello</p>
          wo
        `
      })
    }
  })

  return (
    <dwEditorContainer block >
      dw Editor
      
      <tipEditor ref={tipEditorEle}>

      </tipEditor>
    </dwEditorContainer>
  )
}

const MyEditor = createComponent(EditorFC)

export default MyEditor