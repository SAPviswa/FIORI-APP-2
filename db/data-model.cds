namespace my.bookshop;

entity Books {
  key ID              : UUID;
      title           : String;
      stock           : Integer;
      author          : String;
      genre           : String;
      publicationYear : String;
      price           : Decimal;
      authorid        : Association to Author;
      addresses       : Association to Address;
      photo           : LargeString;
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
      distric : String;
      state   : String;
      country : String;
      pincode : String;
}
