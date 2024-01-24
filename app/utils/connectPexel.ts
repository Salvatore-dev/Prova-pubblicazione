import { createClient } from 'pexels';

const Key  = process.env.PEXEL_KEY as string

const client_Pexel = createClient(Key);

export default client_Pexel;