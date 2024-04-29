using my.bookshop as my from '../db/data-model';
// @path: '/BooksSRV'
service CatalogService {
    entity Books as projection on my.Books;
    entity Author as projection on my.Author;
    entity Address as projection on my.Address;
}
