import React from 'react';
import cx from 'classnames';
import { Avatar, ChatBubble } from 'components';
import './Chat.scss';

const Chat = ({src, content, align}) => {
    return (
        <div className={cx('chat', {'chat-right': (align === 'right')})} >
            <div><Avatar src={src} /></div>
            <div><ChatBubble>{content}</ChatBubble></div>
        </div>
    )
}

export default Chat;