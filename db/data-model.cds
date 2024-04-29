namespace my.bookshop;

entity Books {
  key ID              : UUID;
      title           : String;
      stock           : Integer;
      author          : String;
      genre           : String;
      publicationYear : Integer;
      price           : Decimal;
      authorid        : Association to Author;
      address         : Association to Address;
}

entity Author {
  key ID            : UUID;
      qualification : String;
      DOB           : Date;
      age           : Integer;
}

entity Address {
  key ID      : UUID;
      city    : String;
      distric : Date;
      state   : String;
      country : String;
      pincode : Integer;
}
