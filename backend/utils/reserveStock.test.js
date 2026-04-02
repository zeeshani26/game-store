jest.mock("../models/productModel", () => ({
  Product: {
    findOneAndUpdate: jest.fn(),
    findById: jest.fn(),
    updateOne: jest.fn(),
  },
}));

const { Product } = require("../models/productModel");
const { reserveStock, releaseStock } = require("./reserveStock");

describe("reserveStock", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls findOneAndUpdate with atomic guard for each line", async () => {
    Product.findOneAndUpdate.mockReturnValue({
      lean: () => Promise.resolve({ _id: "p1", countInStock: 5 }),
    });

    await reserveStock([{ product: "p1", qty: 2 }]);

    expect(Product.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "p1", countInStock: { $gte: 2 } },
      { $inc: { countInStock: -2 } },
      { new: true }
    );
  });

  it("rolls back prior decrements when a later line is out of stock", async () => {
    Product.findOneAndUpdate
      .mockReturnValueOnce({
        lean: () => Promise.resolve({ _id: "p1", countInStock: 5 }),
      })
      .mockReturnValueOnce({
        lean: () => Promise.resolve(null),
      });

    Product.findById.mockImplementation(() => ({
      select: jest.fn().mockResolvedValue({ name: "Gone", countInStock: 0 }),
    }));

    await expect(
      reserveStock([
        { product: "p1", qty: 2 },
        { product: "p2", qty: 1 },
      ])
    ).rejects.toMatchObject({ statusCode: 409 });

    expect(Product.updateOne).toHaveBeenCalledWith(
      { _id: "p1" },
      { $inc: { countInStock: 2 } }
    );
  });
});

describe("releaseStock", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("restores qty per line", async () => {
    Product.updateOne.mockResolvedValue({});
    await releaseStock([
      { product: "a", qty: 1 },
      { product: "b", qty: 3 },
    ]);
    expect(Product.updateOne).toHaveBeenCalledTimes(2);
    expect(Product.updateOne).toHaveBeenNthCalledWith(
      1,
      { _id: "a" },
      { $inc: { countInStock: 1 } }
    );
    expect(Product.updateOne).toHaveBeenNthCalledWith(
      2,
      { _id: "b" },
      { $inc: { countInStock: 3 } }
    );
  });
});
