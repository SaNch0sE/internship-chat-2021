const MessageModel = require('./model');

function create(profile) {
    return MessageModel.create(profile);
}

function getAllMessages(msg) {
    return MessageModel.aggregate([
        {
            $facet: {
                author: [
                    {
                        $match: {
                            from: msg.from,
                            to: msg.to,
                        },
                    },
                ],
                reciever: [
                    {
                        $match: {
                            from: msg.to,
                            to: msg.from,
                        },
                    },
                ],
            },
        }, {
            $project: {
                messages: {
                    $setUnion: [
                        '$author', '$reciever',
                    ],
                },
            },
        }, {
            $unwind: {
                path: '$messages',
            },
        }, {
            $replaceRoot: {
                newRoot: '$messages',
            },
        },
    ]);
}

function getNewMessages(msg) {
    return MessageModel.aggregate([
        {
            $limit: 100,
            $facet: {
                author: [
                    {
                        $match: {
                            from: msg.from,
                            to: msg.to,
                            createdAt: msg.lastDate,
                        },
                    },
                ],
                reciever: [
                    {
                        $match: {
                            from: msg.to,
                            to: msg.from,
                            createdAt: msg.lastDate,
                        },
                    },
                ],
            },
        }, {
            $project: {
                messages: {
                    $setUnion: [
                        '$author', '$reciever',
                    ],
                },
            },
        }, {
            $unwind: {
                path: '$messages',
            },
        }, {
            $replaceRoot: {
                newRoot: '$messages',
            },
        },
    ]);
}

module.exports = {
    create,
    getAllMessages,
    getNewMessages,
};
