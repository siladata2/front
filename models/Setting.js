import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
  setting_name: {
    type: String,
    required: true,
    unique: true,
  },
  link_value: {
    type: String,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

export default mongoose.models.Setting || mongoose.model('Setting', SettingSchema);