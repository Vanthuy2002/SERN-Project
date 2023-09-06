const renderHomePage = async (req, res) => {
  try {
    const name = 'Thuy Nguyen';
    res.render('home.ejs', { name });
  } catch (error) {
    console.log(error.toString());
  }
};

const webCtrl = { renderHomePage };
module.exports = webCtrl;
