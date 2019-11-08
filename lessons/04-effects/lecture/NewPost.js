import React, { useState, useRef, useEffect } from "react"
import { FaDumbbell } from "react-icons/fa"

import { useAppState } from "app/app-state"
import Avatar from "app/Avatar"
import Minutes from "app/Minutes"
import RecentPostsDropdown from "app/RecentPostsDropdown"

const errorClass = "NewPost_error"
const MAX_MESSAGE_LENGTH = 200

export default function NewPost({
  someFunc,
  takeFocus,
  date,
  onSuccess,
  showAvatar
}) {
  const [{ auth }] = useAppState()
  const [message, setMessage] = useState("Ran around the lake.")
  const messageTooLong = message.length > MAX_MESSAGE_LENGTH
  const [other, setOther] = useState()

  function handleMessageChange(event) {
    const message = event.target.value
    setMessage(message)
  }

  // Runs when we first mount, and
  // runs when the dep array changes
  useEffect(() => {
    setOther(message)
  }, [message])

  return (
    <div className={"NewPost" + (messageTooLong ? ` ${errorClass}` : "")}>
      <button onClick={() => setCount(count + 1)}>Count {count}</button>
      {showAvatar && <Avatar uid={auth.uid} size={70} />}
      <form className="NewPost_form">
        <textarea
          className="NewPost_input"
          placeholder="Tell us about your workout!"
          value={message}
          onChange={handleMessageChange}
        />
        <div className="NewPost_char_count">
          <span>{message.length}</span>/{MAX_MESSAGE_LENGTH}
        </div>
        <RecentPostsDropdown
          uid={auth.uid}
          onSelect={message => {
            setMessage(message)
          }}
        />
        <div className="NewPost_buttons">
          <Minutes date={date} />
          <div>
            <button type="submit" className="icon_button cta">
              <FaDumbbell /> <span>Post</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
