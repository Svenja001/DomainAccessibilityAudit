import DomainModel from '../models/domain.model';
import PageModel from '../models/page.model';

exports.get_domain = (req, res) => {
  const { domainId } = req.params;
  if (!domainId) {
    res.json({ success: false, error: 'No domain id provided' });
    return;
  }
  DomainModel.findById(domainId).populate({
      path: 'pages',
      select: '-violations',
      options: { sort: { nbViolations: -1, url: 1 } },
    }).exec((err, domain) => {
    if (err)
      res.json({ success: false, error: err.message });
    else
      res.json({ success: true, data: domain });
  });
};

/*
exports.get_domain_pages = (req, res) => {
  const { domainId } = req.params;
  if (!domainId) {
    res.json({ success: false, error: 'No domain id provided' });
    return;
  }
  PageModel.find({domainId}).exec((err, pages) => {
    if (err)
      res.json({ success: false, error: err.message });
    else
      res.json({ success: true, data: pages });
  });
};
*/
