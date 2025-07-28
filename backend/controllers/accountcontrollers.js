const accounts = require('../models/accounts');
const users = require('../models/users');

const accountDetails = async (req, res) => {
  try {
    const email = req.params.email;

    const user = await users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const response = await accounts.findAll({
      where: {
        userUserid: user.userid, 
      },
    });

    if (response.length === 0) {
      return res.status(404).json({ message: 'No account details found for this user.' });
    }

    const balances = response.map((acc) => ({
      type: acc.account_name,
      balance: acc.balance,
      account_no: acc.account_no,
      branch: acc.branch,
      account_name: acc.account_name,
      IFSC: acc.IFSC,
    }));

    console.log("Account details fetched successfully.");
    return res.status(200).json({
      userid: user.userid,
      email: user.email,
      balances,
    });

  } catch (err) {
    console.error("Error fetching account details:", err);
    return res.status(500).send("Internal server error.");
  }
};

module.exports = accountDetails;
