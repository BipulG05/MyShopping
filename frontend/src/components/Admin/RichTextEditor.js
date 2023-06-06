import React, { useRef } from 'react';
import Joditeditor from 'jodit-react'

const RichTextEditor = ({setEdvalue}) => {
    const editor = useRef(null);
  return (
    <>
        <Joditeditor ref={editor} onChange={(content) => setEdvalue(content)} />
    </>
  )
}

export default RichTextEditor