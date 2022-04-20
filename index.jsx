/** @jsx createElement */
import {
  useViewEffect,
  createElement,
  render,
  useRef,
  atom
} from 'axii'

import { Editor, generateHTML } from './lib/'

function Index () {
  const editorRef = useRef()
  const output = atom('')

  const rightRef = useRef('')

  function onUpdate () {
    output.value = JSON.stringify(editorRef.current.editor.getJSON(), null, 2);
    rightRef.current.innerHTML = generateHTML(editorRef.current.editor.getJSON())
  }

  return (
    <index block block-width="1200px" flex-display style={{ gap: '20px' }} >
      <leftBox block block-width="250px" block-height="160px" >
        left
        <Editor ref={editorRef} onUpdate={() => {
          onUpdate();
        }} />
      </leftBox>
      <output block block-max-width="600px" flex-grow="1" style={{ border: '1px solid #333', overflow: 'auto'}}>
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
          editorRef.current.setContent('')
        }}>clear content</button>
        <pre>
          <code >
            {() => output.value}
          </code>
        </pre>
      </output>
      <rightBox block-padding="10px" ref={rightRef} block block-width="300px" block-min-height-300 style={{ border: '1px solid #333'}}>
        right
      </rightBox>
    </index>
  )
}

render(
  <Index />,
  document.getElementById('editor')
)