import { NextApiHandler } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'


const ProtectedRoute: NextApiHandler = async (req, res) => {
  console.log('inside protected route')
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
  console.log('data', user?.id);
  res.json({ name: user?.id});
}

export default ProtectedRoute