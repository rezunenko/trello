window.Trello.authorize({
    type: 'popup',
    name: 'Getting Started Application',
    scope: {
        read: 'true',
        write: 'true'
    },
    expiration: 'never',
    success: function(res) {
        console.log('success authentication', res);
        var boardList = [];

        Trello.get("members/me/boards", { fields: ["id", "name"] }, function(boards, err) {
            boardList = boards;
            var container = document.querySelector('.container');
            boardList.forEach(item = > {
                var elem = document.createElement('ul');
            elem.textContent = item.name;

            console.log(boards); // got them!
            console.log(err); // if something went wrong, this will be non-null

            Trello.get('boards/' + item.id + '/cards/all', { fields: ["id", "name"] }, function(cards, err) {
                cards.forEach(item = > {
                    var card = document.createElement('li');
                card.textContent = item.name;
                elem.appendChild(card);
            })
                ;
                console.log(cards); // got them!
                console.log(err); // if something went wrong, this will be non-null
                container.appendChild(elem);
            })

        })
            ;

        })
    },
    error: function() {
        console.log('Failed authentication');
    },
});
