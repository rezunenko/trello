'use strict';

(function () {
    let onError = function(e, msg) {
        console.log(msg, e);
    };

    let getCards = function (boardId, callback) {
        Trello.get('boards/' + boardId + '/cards/all', { fields: ["id", "name"] }, callback, (e) => {
            onError('Getting card error', e);
        });
    };

    let getBoards = function(callback) {
        Trello.get("members/me/boards", { fields: ["id", "name"] }, callback, (e) => {
            onError('Getting boards error', e);
        });
    };

    let autorize = function(callback) {
        window.Trello.authorize({
            type: 'popup',
            name: 'Getting Started Application',
            scope: {
                read: 'true',
                write: 'true'
            },
            expiration: 'never',
            success: callback,
            error: (e) => {
                onError('Failed authentification', e);
            },
        });
    };

    let getData = function (callback) {
        if(!callback) {
            let msg = 'Callback is undefined';
            onError(new Error(msg), msg);
            return;
        }

        autorize(() => {
            getBoards(boards => {
                Promise.all(boards.map(board => {

                    return new Promise((res) => {
                        getCards(board.id, cards => res({ ...board, cards }))
                    });
                })).then((boardList) => {
                   callback(boardList);
                })
            })
        });
    };

    window.myTrello = {
        getData: getData
    };
})();
