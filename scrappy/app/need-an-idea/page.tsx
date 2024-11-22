'use server'
import { createClient } from "@/app/utils/supabase/server";

interface Project {
  ID: number;
  Name: string;
  Description: string;
  Tags: string;
  "Suggested Tech Stack": string;
  Resources: string;
}

export default async function NeedAnIdea() {
  try {
    const supabase = await createClient();
    
    const { data: projects, error } = await supabase
      .from('Project DB')
      .select("*");

    // console.log('Response details:', { debuggin stuff
    //   data: projects,
    //   dataType: projects ? typeof projects : 'null',
    //   isArray: Array.isArray(projects),
    //   length: projects?.length,
    //   isEmpty: Array.isArray(projects) && projects.length === 0,
    //   firstItem: projects?.[0],
    //   error
    // });

    // Also try a raw count query
    const { count, error: countError } = await supabase
      .from('Project DB')
      .select('*', { count: 'exact' });
    
    console.log('Count query:', {
      count,
      error: countError
    });

    if (error) {
      console.error('Supabase error:', error);
      return <div>Error loading projects: {error.message}</div>;
    }

    if (!projects || projects.length === 0) {
      return <div>
        <p>No projects found in the database.</p>
        <p>Debug info:</p>
        <pre>
          {JSON.stringify({
            dataType: typeof projects,
            isArray: Array.isArray(projects),
            length: projects?.length,
            count,
          }, null, 2)}
        </pre>
      </div>;
    }

    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Project Ideas Database</h1>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tech Stack</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resources</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects?.map((project: Project) => (
                <tr key={project.ID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{project.Name}</div>   
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{project.Description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {project.Tags?.split(',').map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 whitespace-pre-line">
                      {project["Suggested Tech Stack"]}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {project.Resources?.split('\n').map((resource, index) => (
                        <div key={index}>
                          {resource.includes('http') ? (
                            <a 
                              href={resource.split(': ')[1]} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {resource.split(': ')[0]}
                            </a>
                          ) : resource}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch (error: unknown) {
    console.error('Error:', error);
    if (error instanceof Error) {
      return <div>Error loading projects: {error.message}</div>;
    }
    return <div>Error loading projects: An unknown error occurred</div>;
  }
}
