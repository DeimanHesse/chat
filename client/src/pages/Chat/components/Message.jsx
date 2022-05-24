const Message = ({item, currentUser}) => {
    return (
        <div className="message">
            {item.event === 'connection' || item.event === 'close'
                  ? <div style={{textAlign:'center', fontSize:'12px'}} className="message__service">{item.text} {item.date}</div>
                  : <div className={item.userName === currentUser ? 'message__inner me' : 'message__inner'}>
                      <div className="message__title">{item.userName}</div>
                      <div className="message__text">{item.text}</div>
                      <div style={{textAlign: 'right'}} className="message__time">{item.date}</div>
                    </div>

            }
        </div>
    )
}

export default Message;