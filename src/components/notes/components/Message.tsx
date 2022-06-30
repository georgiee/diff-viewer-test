import React, { useEffect, useRef } from 'react';

export const Message = ({editing, message, onChange}) => {
  const textareaElement = useRef<HTMLTextAreaElement>(null);

  // autofocus the textarea when editing and place the cursor at the end of any given text
  useEffect(() => {
    if (editing && textareaElement.current) {
      textareaElement.current.focus()
      textareaElement.current.setSelectionRange(message.length, message.length);
    }
  }, [editing])


  return (
    <>
      {editing && <textarea ref={textareaElement} className="form-control mb-2" value={message} onChange={onChange}
                            placeholder="Provide your comment"/>}
      {!editing && message}
    </>
  )
}
