import connectMongoDB from '../../lib/mongodb';
import Setting from '../../models/Setting';

const ADMIN_PIN = process.env.ADMIN_PIN || 'silaoo22';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectMongoDB();
    
    const { pin, newLink } = req.body;
    
    // Verify PIN
    if (pin !== ADMIN_PIN) {
      return res.status(401).json({ error: 'PIN si sahihi!' });
    }
    
    // Validate URL
    if (!newLink || !newLink.startsWith('http')) {
      return res.status(400).json({ error: 'Tafadhali weka link sahihi!' });
    }
    
    // Update link
    await Setting.findOneAndUpdate(
      { setting_name: 'target_link' },
      { link_value: newLink, updated_at: new Date() },
      { upsert: true, new: true }
    );
    
    res.status(200).json({ success: true, message: 'Link imebadilishwa!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}