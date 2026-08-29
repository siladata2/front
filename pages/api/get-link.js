import connectMongoDB from '../../lib/mongodb';
import Setting from '../../models/Setting';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectMongoDB();
    
    let setting = await Setting.findOne({ setting_name: 'target_link' });
    
    if (!setting) {
      // Create default if not exists
      setting = await Setting.create({
        setting_name: 'target_link',
        link_value: process.env.TARGET_URL || 'https://aaaasilamin-0ac06c45a8b6.herokuapp.com/'
      });
    }
    
    res.status(200).json({ link: setting.link_value });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}