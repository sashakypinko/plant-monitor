import Monitor from '../models/monitor.js';

export const getMonitors = async (req, res) => {
  try {
    const monitors = await Monitor.find({});
    res.json(monitors);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateMonitor = async (req, res) => {
  try {
    if (req.params.id === 'new') {
      const newMonitor = new Monitor(req.body);
      await newMonitor.save();
    } else {
      await Monitor.findByIdAndUpdate(req.params.id, req.body);
    }
    
    return res.json("Ok");
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Internal Server Error'});
  }
};

export default {};