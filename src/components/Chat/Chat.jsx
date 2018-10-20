import React from 'react';
import cx from 'classnames';
import { Avatar, ChatBubble } from 'components';
import './Chat.scss';

const Chat = ({src, content, type}) => {
    return (
        <div className={cx('chat', {
            'chat-user': type === 'user', 
            'chat-bot': type === 'bot'
        })}>
            <Avatar src={src} />
            <ChatBubble content={content}/>
        </div>
    )
}

export default Chat;