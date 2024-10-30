import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";

// Deposit money
export const deposit = async (req, res) => {
  console.log(`account Controller : deposit`);
  const { userId, amount } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.balance += amount;

    const transaction = new Transaction({
      userId: user._id,
      type: "deposit",
      amount,
      description: "Deposit",
      balanceAfterTransaction: user.balance,
    });

    await user.save();
    await transaction.save();

    res
      .status(200)
      .json({ message: "Deposit successful", balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: "Error during deposit", error });
  }
};

// Withdraw money
export const withdraw = async (req, res) => {
  console.log(`account Controller : withdraw`);
  const { userId, amount } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.balance < amount)
      return res.status(400).json({ message: "Insufficient balance" });

    user.balance -= amount;

    const transaction = new Transaction({
      userId: user._id,
      type: "withdraw",
      amount,
      description: "Withdraw",
      balanceAfterTransaction: user.balance,
    });

    await user.save();
    await transaction.save();

    res
      .status(200)
      .json({ message: "Withdrawal successful", balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: "Error during withdrawal", error });
  }
};

// Transfer money
export const transfer = async (req, res) => {
  console.log(`account Controller : transfer`);
  const { fromUserId, toUserId, amount } = req.body;
  try {
    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findById(toUserId);

    if (!fromUser || !toUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (fromUser.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    fromUser.balance -= amount;
    toUser.balance += amount;

    const fromTransaction = new Transaction({
      userId: fromUser._id,
      type: "transfer",
      amount,
      description: `Transfer to ${toUser.accountNumber}`,
      balanceAfterTransaction: fromUser.balance,
    });

    const toTransaction = new Transaction({
      userId: toUser._id,
      type: "transfer",
      amount,
      description: `Transfer from ${fromUser.accountNumber}`,
      balanceAfterTransaction: toUser.balance,
    });

    await fromUser.save();
    await toUser.save();
    await fromTransaction.save();
    await toTransaction.save();

    res.status(200).json({ message: "Transfer successful" });
  } catch (error) {
    res.status(500).json({ message: "Error during transfer", error });
  }
};

// View balance
export const viewBalance = async (req, res) => {
  console.log(`account Controller : view balance`);
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const response = res.status(404).json({ message: "User not found" });
      return response;
    }
    res.status(200).json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: "Error fetching balance", error });
  }
};

// Mini statement (last 10 transactions)
export const miniStatement = async (req, res) => {
  console.log(`account Controller : mini statements`);
  const { userId } = req.params;
  try {
    const transactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mini statement", error });
  }
};
