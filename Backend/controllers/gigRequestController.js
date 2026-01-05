const GigRequest = require('../models/GigRequest');
const Service = require('../models/Service');
const User = require('../models/User');

exports.createRequest = async (req, res) => {
  try {
    const { serviceId, message } = req.body;
    const requesterId = req.user.id;

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    if (service.user.toString() === requesterId) {
      return res.status(400).json({ msg: 'You cannot request your own service' });
    }

    // Check if request already exists
    const existingRequest = await GigRequest.findOne({
      service: serviceId,
      requester: requesterId
    });

    if (existingRequest) {
      return res.status(400).json({ msg: 'You have already requested this service' });
    }

    const newRequest = new GigRequest({
      service: serviceId,
      requester: requesterId,
      provider: service.user,
      message
    });

    await newRequest.save();
    res.status(201).json(newRequest);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getProviderRequests = async (req, res) => {
  try {
    const requests = await GigRequest.find({ provider: req.user.id })
      .populate('requester', 'name email mobile profileImage')
      .populate('service', 'title')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getRequesterRequests = async (req, res) => {
  try {
    const requests = await GigRequest.find({ requester: req.user.id })
      .populate('provider', 'name email mobile profileImage')
      .populate('service', 'title')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'accepted' or 'rejected'
    const requestId = req.params.id;

    let request = await GigRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }

    // Ensure only the provider can update the status
    if (request.provider.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    request.status = status;
    await request.save();

    res.json(request);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
