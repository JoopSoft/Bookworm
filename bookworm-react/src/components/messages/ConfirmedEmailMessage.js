import React from 'react';
import { Message } from 'semantic-ui-react';

const ConfirmedEmailMessage = () => (
    <Message info>
        <Message.Header>Please, verify your email to unlock awesomeness</Message.Header>
    </Message>    
);

export default ConfirmedEmailMessage;