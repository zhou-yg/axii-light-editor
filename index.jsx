/** @jsx createElement */
import {
  createElement,
  render
} from 'axii'

import Editor from './lib/editor'

render(
  <Editor />,
  document.getElementById('editor')
)