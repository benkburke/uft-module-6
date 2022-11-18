import BookAdderTestHarness from "../TestTools/BookAdderTestHarness";
import StatsPresenter from "../Stats/StatsPresenter";

describe("stats", () => {
  it("should show last added book", async () => {
    let lastAddedViewModel = null;
    let bookAdderTestHarness = new BookAdderTestHarness();
    await bookAdderTestHarness.init(() => {});
    await bookAdderTestHarness.addBook();

    await new StatsPresenter().load((generatedLastAddedViewModel) => {
      lastAddedViewModel = generatedLastAddedViewModel;
    });

    expect(lastAddedViewModel).toBe("UFT");
  });
});
