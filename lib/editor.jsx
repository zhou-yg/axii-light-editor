/** @jsx createElement */
import {
  createComponent,
  createElement,
  useRef,
  useViewEffect
} from "axii"
import { Editor } from '@tiptap/core'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Break from '@tiptap/extension-hard-break'

import './editor.less'
import IP from './image-paste'

export const TIP_EDITOR_ID = 'TIP_EDITOR'

export const plugins = () => [
  IP,
  Break,
  Image,
  Document,
  Paragraph,
  Text,
  Link
]

function EditorFC ({
  onUpdate,
  ref,
  defaultContent
}) {
  const tipEditorEle = useRef()
  const tipEditor = useRef()

  if (ref) {
    ref.current = {
      get editor () {
        return tipEditor.current
      },
      setContent (content) {
        tipEditor.current.commands.setContent(content)
      }
    }
  }

  useViewEffect(() => {
    if(tipEditorEle.current) {
      tipEditor.current = new Editor({
        element: tipEditorEle.current,
        onUpdate,
        extensions: plugins(),
        content: defaultContent || ''
      })
      window.tipEditor = tipEditor.current
    }
    return () => {
      if (tipEditor.current) {
        tipEditor.current.destroy()
      }
    }
  })

  function dropImage (e) {
  }

  return (
    <dwEditorContainer block block-width="100%" block-height="100%" >
      <tipEditor id={TIP_EDITOR_ID} block block-width="100%" block-height="100%" ref={tipEditorEle} onDragover={e => {
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
    boxSizing: 'border-box',
    border: '1px solid #999',
    overflowY: 'auto',
  })
}
EditorFC.forwardRef = true

const MyEditor = createComponent(EditorFC)

export default MyEditor