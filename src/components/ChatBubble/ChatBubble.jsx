import React from 'react';
import './ChatBubble.scss';

const ChatBubble = ({children}) => {
    return <div className="chatBubble">{children}</div>
}

export default ChatBubble;