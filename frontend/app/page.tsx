'use client';

import { useEffect, useState } from 'react';

type Task = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mostrarAcerca, setMostrarAcerca] = useState(false);

  const loadTasks = async () => {
    const res = await fetch(`${API_URL}/api/tasks`, { cache: 'no-store' });
    setTasks(await res.json());
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`${API_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });

    setTitle('');
    setDescription('');
    loadTasks();
  };

  const toggleTask = async (task: Task) => {
    await fetch(`${API_URL}/api/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed })
    });

    loadTasks();
  };

  const deleteTask = async (id: number) => {
    await fetch(`${API_URL}/api/tasks/${id}`, {
      method: 'DELETE'
    });

    loadTasks();
  };

  return (
    <main className="container">
      <section className="card">
        <div className="header">
          <h1>Lista de Tareas</h1>

          <button
            type="button"
            className="about-btn"
            onClick={() => setMostrarAcerca(true)}
          >
            Acerca de
          </button>
        </div>

        <p>Organiza y administra tus tareas fácilmente.</p>

        <form onSubmit={createTask} className="form">
          <input
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button>Agregar tarea</button>
        </form>
      </section>

      <section className="tasks">
        {tasks.map(task => (
          <article className="task" key={task.id}>
            <div>
              <h2 className={task.completed ? 'done' : ''}>
                {task.title}
              </h2>

              <p>{task.description || 'Sin descripción'}</p>
            </div>

            <div>
              <button onClick={() => toggleTask(task)}>
                {task.completed ? 'Pendiente' : 'Completar'}
              </button>

              <button
                className="danger"
                onClick={() => deleteTask(task.id)}
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </section>

      {mostrarAcerca && (
        <div className="modal">
          <div className="modal-content">
            <h2>Acerca de</h2>

            <p><strong>Tecnologías utilizadas:</strong></p>

            <ul>
              <li>Frontend: Next.js</li>
              <li>Lenguaje: TypeScript</li>
              <li>Backend: NestJS</li>
              <li>ORM: Prisma</li>
              <li>Base de datos: PostgreSQL</li>
              <li>Base de datos en la nube: Supabase</li>
              <li>Hospedaje backend: Render</li>
              <li>Hospedaje frontend: Vercel</li>
            </ul>

            <button
              type="button"
              onClick={() => setMostrarAcerca(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
