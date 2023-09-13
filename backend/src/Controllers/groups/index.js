const { getGroups } = require('../../services/group.services');

const handleGetGroups = async (req, res) => {
  try {
    const { message, codeNum, groups } = await getGroups();
    res.status(200).json({ message, codeNum, groups });
  } catch (exection) {
    res.status(404).json({ message: exection });
  }
};

const groupCtrl = { handleGetGroups };

module.exports = groupCtrl;
