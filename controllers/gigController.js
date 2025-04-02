const Gig = require('../models/Gig');

exports.listGigs = async (req, res) => {
  try {
    const { username } = req.query;
    const query = {};
    if (username) query.username = username;

    const gigs = await Gig.find(query).sort({ expiryDate: 1 });
    res.json(gigs);
  } catch (error) {
    console.error('Error fetching gigs:', error);
    res.status(500).json({ msg: "Server error while fetching gigs." });
  }
};

exports.viewGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate("userId", "username _id"); // 👈 this is critical

    if (!gig) {
      return res.status(404).json({ msg: "Gig not found" });
    }

    res.json({
      title: gig.title,
      gigType: gig.gigType,
      genre: gig.genre,
      city: gig.city,
      description: gig.description,
      postingDate: gig.postingDate,
      expiryDate: gig.expiryDate,
      username: gig.userId?.username || "Unknown",
      userId: gig.userId?._id?.toString() || null // ✅ Needed for navigating to profile
    });
  } catch (error) {
    console.error("Error fetching gig:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};



exports.deleteGig = async (req, res) => {
  try {
    const deletedGig = await Gig.findByIdAndDelete(req.params.id);
    if (!deletedGig) return res.status(404).json({ msg: 'Gig not found' });

    res.json({ msg: 'Gig deleted successfully' });
  } catch (error) {
    console.error("Error deleting gig:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.searchGigs = async (req, res) => {
  const { keyword, username, genre, city } = req.query;

  try {
    const query = {};

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { gigType: { $regex: keyword, $options: 'i' } },
        { city: { $regex: keyword, $options: 'i' } },
        { genre: { $regex: keyword, $options: 'i' } },
      ];
    }
    if (username) query.username = { $regex: username, $options: 'i' };
    if (city) query.city = { $regex: city, $options: 'i' };
    if (genre) {
      query.genre = { $regex: genre, $options: 'i' }; // Or $elemMatch if array
    }

    const gigs = await Gig.find(query).sort({ postingDate: -1 });
    res.json(gigs);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ msg: 'Server error during gig search' });
  }
};
