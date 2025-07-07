import jwt from 'jsonwebtoken'
export function generateToken(id: string): string {
    const payload = {
        id: id 
      };
    
    try {
        const accessToken = jwt.sign(payload, process.env.AUTHTOKEN_KEY!, { expiresIn: '1h' });
        return accessToken;
    } catch (error) {
        console.error('Error generating JWT token:', error);
        throw new Error('Error generating JWT token');
    }
}