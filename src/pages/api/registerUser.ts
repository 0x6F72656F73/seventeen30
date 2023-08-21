import type { NextApiRequest, NextApiResponse } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'


const ProtectedRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('inside protected route')
    const {formData} = req.body;
    console.log(formData);

    // Create authenticated Supabase Client
    const supabase = createPagesServerClient({ req, res })
    // Check if we have a session
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user)
        return res.status(401).json({
        error: 'not_authenticated',
        description: 'The user does not have an active session or is not authenticated',
        })

    // Run queries with RLS on the server
    const { data, error } = await supabase
        .from('profiles')
        .upsert([{ ...formData, id: user?.id }]);
    if (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
    console.log('data', data);
    res.json(data);
}

export default ProtectedRoute