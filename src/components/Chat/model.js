const { Schema } = require('mongoose');
const connections = require('../../config/connection');

/**
 * @schema TokenSchema
 * @param {String} userId
 * @param {String} token
 */
const MessageSchema = new Schema(
    {
        from: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            trim: true,
            required: true,
        },
    },
    {
        collection: 'messages',
        versionKey: false,
        timestamps: true,
    },
);

module.exports = connections.model('MessageModel', MessageSchema);
