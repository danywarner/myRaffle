
exports.index = function(req, res){console.log('en index.js');
  res.render('index', {
    title: 'myRaffle',
    user: req.user
  });
};
