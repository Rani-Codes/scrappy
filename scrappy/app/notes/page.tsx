import { createClient } from '@/app/utils/supabase/server';

export default async function Notes() {
  const supabase = await createClient();
  const { data: notes, error } = await supabase.from("notes").select();

  if(error){
    return <p>Error fetching notes: {error.message}</p>;
  }

  return (
    <div>
      <h1 className='text-3xl'>Notes</h1>
      {notes && notes.length > 0 ? (
        <pre>{JSON.stringify(notes, null, 2)}</pre>
      ): (
        <h3>No notes available.</h3>
      )}
    </div>
  )
}