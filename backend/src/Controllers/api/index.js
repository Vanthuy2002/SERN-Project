const testApi = async (req, res) => {
  try {
    res.status(200).json({ message: 'ok', data: [] });
  } catch (error) {
    console.log(error);
  }
};

const apiCtrl = { testApi };

module.exports = apiCtrl;
