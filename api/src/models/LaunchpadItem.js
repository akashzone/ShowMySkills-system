import mongoose from 'mongoose';

const launchpadItemSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    oneLiner: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: '',
    },
    stipend: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: '6 Months',
    },
    clicks: {
      type: String,
      default: '1.2k clicks',
    },
    clickCount: {
      type: Number,
      default: 1200,
    },
    logoType: {
      type: String,
      default: 'generic',
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    applyUrl: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    allSkills: {
      type: [String],
      default: [],
    },
    about: {
      type: String,
      default: '',
    },
    perks: {
      type: String,
      default: '',
    },
    batchYear: {
      type: String,
      default: '2025/2026',
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

launchpadItemSchema.index({ company: 'text', position: 'text', skills: 'text' });

export const LaunchpadItem = mongoose.models.LaunchpadItem || mongoose.model('LaunchpadItem', launchpadItemSchema);
export default LaunchpadItem;
