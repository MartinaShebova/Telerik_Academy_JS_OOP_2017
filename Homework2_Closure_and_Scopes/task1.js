function solve() {
    var library = (function () {
        var books = [];
        var categories = [];

        function listBooks(itemToSort) {

            if (itemToSort) {
                if (itemToSort.author) {
                    let booksAuthor = [];

                    for (let i = 0; i < books.length; i += 1) {
                        if (books[i].author === itemToSort.author) {
                            let currentBook = {
                                ID: books[i].ID,
                                author: books[i].author,
                                category: books[i].category,
                                isbn: books[i].isbn,
                                title: books[i].title
                            };

                            booksAuthor.push(currentBook);
                        }
                    }

                    booksAuthor.sort(function (a, b) {
                        return a.ID - b.ID;
                    });

                    return booksAuthor;
                }
                else if (itemToSort.category) {
                    if (categories.indexOf(itemToSort.category) === -1) {
                        return [];
                    }

                    let booksAuthor = [];

                    for (let i = 0; i < books.length; i += 1) {

                        if (books[i].category === itemToSort.category) {
                            let currentBook = {
                                ID: books[i].ID,
                                author: books[i].author,
                                category: books[i].category,
                                isbn: books[i].isbn,
                                title: books[i].title
                            };

                            booksAuthor.push(currentBook);
                        }
                    }

                    booksAuthor.sort(function (a, b) {
                        return a.ID - b.ID;
                    });

                    return booksAuthor;
                }
            }
            else {
                books.sort(function (a, b) {
                    return a.ID - b.ID;
                });

                return books;
            }
        }

        function addBook(book) {
            //Each book has unique title, author and ISBN
            for (let i = 0; i < books.length; i += 1) {
                if (books[i].title === book.title || books[i].isbn === book.isbn) {
                    throw Error();
                }
            }

            if (book.title.length < 2 || book.title.length > 100) {
                throw Error();
            }

            if (book.isbn.length !== 10 && book.isbn.length !== 13) {
                throw Error();
            }

            if (!book.author) {
                throw Error();
            }

            book.ID = books.length + 1;

            //If the category is missing, it must be automatically created
            let isCategoryContainsBook = false;

            for (let i = 0; i <= categories.length; i += 1) {
                if (categories[i] === book.category) {
                    isCategoryContainsBook = true;
                    break;
                }
            }

            if (!isCategoryContainsBook) {
                categories.push(book.category);
            }

            books.push(book);
            return book;
        }

        function listCategories() {
            return categories;
        }

        return {
            books:
            {
                list: listBooks,
                add: addBook
            },
            categories:
            {
                list: listCategories
            }
        };
    }());

    return library;
}