'use strict';

(function () {
    window.myTrello.getData((data) => {
        let boardContainerElement = document.createDocumentFragment().appendChild(document.createElement('ul'));

        data.forEach(board => {
            let boardElement = document.createElement('li');
            let boardTitleElement = document.createElement('p');
            boardTitleElement.textContent = board.name;
            boardTitleElement.style.fontWeight = 'bold';
            boardElement.appendChild(boardTitleElement);

            if(board.cards.length > 0) {
                let cardContainer = document.createElement('ul');
                board.cards.forEach(card => {
                    let cardElement = document.createElement('li');
                    cardElement.textContent = card.name;
                    cardContainer.appendChild(cardElement);
                });
                boardElement.appendChild(cardContainer);
            }

            boardContainerElement.appendChild(boardElement);
        });

        document.querySelector('.container').appendChild(boardContainerElement);
        console.log(data);
    });
})();
