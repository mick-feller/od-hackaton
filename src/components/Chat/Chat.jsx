import React from 'react';
import cx from 'classnames';
import { Avatar, ChatBubble } from 'components';
import './Chat.scss';

const Chat = ({photoURL, content, align}) => {
    return (
        <div className={cx('chat', {'chat-right': (align === 'right')})} >
            <div><Avatar photoURL={photoURL} /></div>
            <div><ChatBubble>{content}</ChatBubble></div>
        </div>
    )
}

export default Chat;