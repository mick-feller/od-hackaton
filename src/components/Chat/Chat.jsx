import React from 'react';
import cx from 'classnames';
import { Avatar, ChatBubble } from 'components';
import './Chat.scss';

const Chat = ({photoURL, content, align, children}) => {
    return (
        <div className={cx('chat', {'chat-right': (align === 'right')})} >
            <div><Avatar photoURL={photoURL} /></div>
            <div><ChatBubble>{children}</ChatBubble></div>
        </div>
    )
}

export default Chat;