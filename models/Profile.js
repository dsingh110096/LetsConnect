const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: [true, 'Please provide status'],
  },
  skills: {
    type: [String],
    required: [true, 'Please provide skills you have'],
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: [true, 'Please provide a title'],
      },
      company: {
        type: String,
        required: [true, 'Please provide company name'],
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: [true, 'Please provide date of joining'],
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: [true, 'Please provide school info'],
      },
      degree: {
        type: String,
        required: [true, 'Please provide degree info'],
      },
      fieldofstudy: {
        type: String,
        required: [true, 'Please provide field of study'],
      },
      from: {
        type: Date,
        required: [true, 'Please provide date of admission'],
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);
