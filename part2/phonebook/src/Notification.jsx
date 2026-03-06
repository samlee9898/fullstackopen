const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const messageContent = message.toString()
  if (messageContent.includes("Added")) {
    return (
        <div className="success">
        {message}
        </div>
    )
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

export default Notification