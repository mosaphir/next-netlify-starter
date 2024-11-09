import axios from 'axios';

export default async function handler(req, res) {
    const { bin } = req.query;

    if (!bin) {
        return res.status(400).json({ error: 'BIN is required' });
    }

    try {
        const response = await axios.get(`https://binlist.io/lookup/${bin}`);
        
        // Check if the response indicates success
        if (response.data.success) {
            res.status(200).json(response.data);
        } else {
            res.status(404).json({ error: 'BIN not found' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching data' });
    }
}
