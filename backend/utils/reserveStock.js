const { Product } = require("../models/productModel");

/**
 * Atomically decrements countInStock for each line item. MongoDB applies each
 * findOneAndUpdate as an atomic operation on a single document, so two concurrent
 * requests for the last unit: one succeeds, the other gets no matching document.
 * If any line fails, previous decrements in this request are rolled back.
 */
async function reserveStock(orderItems) {
  const committed = [];

  for (const item of orderItems) {
    const updated = await Product.findOneAndUpdate(
      { _id: item.product, countInStock: { $gte: item.qty } },
      { $inc: { countInStock: -item.qty } },
      { new: true }
    ).lean();

    if (!updated) {
      for (const c of committed.reverse()) {
        await Product.updateOne(
          { _id: c._id },
          { $inc: { countInStock: c.qty } }
        );
      }

      const product = await Product.findById(item.product).select(
        "name countInStock"
      );
      const name = product ? product.name : "Product";
      const available = product ? product.countInStock : 0;
      const err = new Error(
        `Insufficient stock for "${name}". Requested ${item.qty}, only ${available} available.`
      );
      err.statusCode = 409;
      throw err;
    }

    committed.push({ _id: item.product, qty: item.qty });
  }
}

/** Restores stock after a failed order persist (compensating action). */
async function releaseStock(orderItems) {
  for (const item of orderItems) {
    await Product.updateOne(
      { _id: item.product },
      { $inc: { countInStock: item.qty } }
    );
  }
}

module.exports = { reserveStock, releaseStock };
