/** @jsx createElement */
import {
  createElement,
  render,
  useRef,
  atom
} from 'axii'

import Editor from './lib/editor'

function Index () {
  const editorRef = useRef()
  const output = atom('')

  return (
    <index block block-width="1000px" flex-display style={{ gap: '20px' }} >
      <Editor ref={editorRef} />
      <output block block-width="600px" style={{ border: '1px solid #333'}}>
        <button type="button" onClick={() => {
          output.value = JSON.stringify(editorRef.current.editor.getJSON(), null, 2);
        }}>json</button>
        <button type="button" onClick={() => {
          output.value = editorRef.current.editor.getHTML()
        }}>html</button>
        <button type="button" onClick={() => {
          output.value = editorRef.current.editor.getText()
        }}>text</button>
        <button type="button" onClick={() => {
          output.value = JSON.stringify(editorRef.current.editor.getAttributes(), null, 2);
        }}>attributes</button>
        <pre>
          <code >
            {() => output.value}
          </code>
        </pre>
      </output>
    </index>
  )
}

render(
  <Index />,
  document.getElementById('editor')
)