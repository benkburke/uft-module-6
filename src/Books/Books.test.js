import httpGateway from "../Shared/HttpGateway";
import BookAdderTestHarness from "../TestTools/BookAdderTestHarness";

describe("add book", () => {
  it("should call api", async () => {
    let bookAdderTestHarness = new BookAdderTestHarness();
    await bookAdderTestHarness.init(() => {});
    await bookAdderTestHarness.addBook();

    expect(httpGateway.post).toHaveBeenCalledWith(
      "https://api.logicroom.co/api/pete@logicroom.co/books",
      { name: "UFT", author: "Pete Heard", ownerId: "pete@logicroom.co" }
    );
  });

  it("should load and reload books", async () => {
    // setup
    let viewModel = null;
    let bookAdderTestHarness = new BookAdderTestHarness();
    await bookAdderTestHarness.init((generatedViewModel) => {
      viewModel = generatedViewModel;
    });

    // anchor
    expect(httpGateway.get).toHaveBeenCalledWith(
      "https://api.logicroom.co/api/pete@logicroom.co/books"
    );
    expect(viewModel.length).toBe(5);
    expect(viewModel[0].name).toBe("Moby Dick");
    expect(viewModel[4].name).toBe("The Hobbit");

    // reload (pivot)
    await bookAdderTestHarness.addBook();

    expect(httpGateway.get).toHaveBeenCalledWith(
      "https://api.logicroom.co/api/pete@logicroom.co/books"
    );
    expect(viewModel.length).toBe(6);
    expect(viewModel[0].name).toBe("Moby Dick");
    expect(viewModel[4].name).toBe("The Hobbit");
    expect(viewModel[5].name).toBe("Wind in the willows");
  });
});
