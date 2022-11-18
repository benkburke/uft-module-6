import BookListPresenter from "../Books/BookListPresenter";
import httpGateway from "../Shared/HttpGateway";
import Observable from "../Shared/Observable";
import booksRepository from "../Books//BooksRepository";
import GetPublicBooksStub from "../TestTools/GetPublicBooksStub";
import AddBooksPresenter from "../Books/AddBooksPresenter";

export default class BookAdderTestHarness {
  async init(callback) {
    jest.clearAllMocks();
    booksRepository.booksPm = new Observable([]);
    httpGateway.get = jest.fn().mockImplementation((path) => {
      return GetPublicBooksStub();
    });

    let bookListPresenter = new BookListPresenter();
    await bookListPresenter.load(callback);
  }

  async addBook() {
    jest.clearAllMocks();

    let addBooksPresenter = new AddBooksPresenter();
    var pivotedStub = GetPublicBooksStub();
    pivotedStub.result.push(pivotedStub.result[2]);

    httpGateway.get = jest.fn().mockImplementation((path) => {
      return pivotedStub;
    });
    httpGateway.post = jest.fn();

    await addBooksPresenter.addBook("UFT", "Pete Heard");
  }
}
