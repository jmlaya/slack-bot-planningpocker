export default (text, response_type = 'ephemeral', attachments = []) => {
    return {
        response_type,
        text,
        attachments
    };
};
