import {prisma} from '@/libs/prisma';
import TaskCard from '@/components/TaskCard'

async function loadTasks() {
//dos opciones para obtener los datos
//directamente de la bd importando prisma 
//haciendo una petición http /api/tasks (este enfoque me comunico con mi propio backend)
  return await prisma.task.findMany();
 }
 
async function HomePage() {
  const tasks = await loadTasks();

  return (
      <section className='container mx-auto'>
        <div className='grid grid-cols-3 gap-3 mt-10'>
      {tasks.map((task) => (
      <TaskCard task={task} key={task.id} />   
      ))}  
      </div>
      </section>
  ); 
 }

 export default HomePage;